import ProdutoEntity from '../persistence/ProdutoEntity.js'
import ProdutoDto from '../dto/ProdutoDto.js'
import {ehNumero, emBranco, formatarMoeda, urlValida} from '../util.js'
import Log from '../util/Log.js'

/**
 * Classe de Serviço para Produtos. Ela lida com buscas e cadastros dos Produtos, fazendo validações e conversões entre
 * tipos e objetos que vêm da tela e vão para o banco e vice-versa.
 */
class ProdutoService {
    #log

    constructor(log = new Log('ProdutoService')) {
        this.#log = log
    }

    // Valida e aceita apenas os campos da entidade como válidos para ordenação. Por padrão usa '-createdAt'
    static #ordenacao(ord) {
        if (typeof ord === 'string' &&
            /^[-+](categoriaProduto|nomeProduto|descricaoProduto|precoProduto|ativoProduto|imagemProduto|dataCriacao|dataUltimaAtualizacao)?$/.test(
                ord)) {
            return ord
        }
        else {
            return '-dataCriacao'
        }
    }

    /**
     * Retorna quantos produtos existem no banco de dados.
     * @returns {Promise<Number>} Promessa com a quantidade de produtos
     */
    contarProdutos(ativo = undefined) {
        return new Promise((resolve, reject) => {
            const callback = (err, count) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(count)
                }
            }

            if (typeof ativo === 'boolean') {
                return ProdutoEntity.where({ativoProduto: ativo})
                                    .countDocuments(callback)
            }
            else {
                return ProdutoEntity.estimatedDocumentCount()
                                    .exec(callback)
            }
        })
    }

    /**
     * Busca todos os Produtos, sem filtro. Suporta paginação.
     * @param pagina Página sendo visualizada. Começa em zero. Padrão: 0.
     * @param tamanhoPagina Tamanho de cada página. Padrão: 25.
     * @param ordenacao Ordenação e campo para ordenar. Padrão: '-createdAt' (campo 'createdAt' em ordem decrescente).
     * @returns {Promise<ProdutoDto[]>} Promessa com a lista de produtos
     */
    buscarTodos(pagina = 0, tamanhoPagina = 25, ordenacao = '-createdAt') {
        return new Promise((resolve, reject) => {
            ProdutoEntity.find({})
                         .limit(tamanhoPagina)
                         .skip(pagina * tamanhoPagina)
                         .sort(ProdutoService.#ordenacao(ordenacao))
                         .lean()
                         .exec((err, produtos) => {
                             if (err) {
                                 reject(err)
                             }
                             else {
                                 resolve(produtos.map(prod => new ProdutoDto(prod, true)))
                             }
                         })
        })
    }

    /**
     * Busca um Produto pelo ID.
     * @param id ID do Produto sendo buscado
     * @returns {Promise<ProdutoDto>} Promessa com o Produto
     */
    buscarPorId(id) {
        return new Promise((resolve, reject) => {
            ProdutoEntity.findById(id)
                         .lean()
                         .exec((err, produto) => {
                             if (err || !produto) {
                                 reject(err)
                             }
                             else {
                                 resolve(new ProdutoDto(produto, true))
                             }
                         })
        })
    }

    /**
     * Valida um Produto e retorna os erros de validação encontrados. Se nenhum erro foi encontrado, um array vazio é retornado.
     * @param produto Produto a ser validado.
     * @returns {*[]} Array com os erros. Cada erro é composto de um "campo" e um "erro".
     */
    validar(produto) {
        let errosValidacao = []

        if (produto === undefined || produto == null || typeof produto !== 'object') {
            errosValidacao.push({campo: 'produto', erro: 'Produto inválido'})
        }

        if (emBranco(produto.categoria)) {
            errosValidacao.push({campo: 'categoria', erro: 'Categoria não pode ficar em branco'})
        }

        if (emBranco(produto.nome)) {
            errosValidacao.push({campo: 'nome', erro: 'Nome não pode ficar em branco'})
        }

        if (emBranco(produto.descricao)) {
            errosValidacao.push({campo: 'descricao', erro: 'Descrição não pode ficar em branco'})
        }

        if (ehNumero(produto.preco)) {
            const preco = produto.preco
            if (preco <= 0) {
                errosValidacao.push({campo: 'preco', erro: `Preço não pode ser menor ou igual a ${formatarMoeda(0)}`})
            }
            else if (preco >= 100000) {
                errosValidacao.push(
                    {campo: 'preco', erro: `Preço não pode ser maior ou igual a ${formatarMoeda(100000)}`})
            }
        }
        else {
            errosValidacao.push({campo: 'preco', erro: 'Preço deve ser um número'})
        }

        if (emBranco(produto.imagem)) {
            errosValidacao.push({campo: 'imagem', erro: 'Imagem não pode ficar em branco'})
        }
        else if (!urlValida(produto.imagem)) {
            errosValidacao.push({campo: 'imagem', erro: 'Imagem deve ser um endereço de uma imagem'})
        }

        return errosValidacao
    }

    /**
     * Salva um novo Produto no banco de dados.
     *
     * @param novoProduto Novo Produto (ProdutoDto)
     * @returns {Promise<ProdutoDto>} Promessa com o novo produto cadastrado no banco, ou os erros de validação
     */
    novoProduto(novoProduto) {
        return new Promise((resolve, reject) => {
            try {
                const errosValidacao = this.validar(novoProduto)

                if (errosValidacao.length === 0) {
                    const produto = ProdutoDto.toEntity(novoProduto)

                    produto.save(err => {
                        if (err) {
                            this.#log.error('Erro ao cadastrar novo produto:', err)
                            reject({erros: {banco: err}})
                        }
                        else {
                            this.#log.info('Novo produto cadastrado com sucesso: id =', produto._id.toString(),
                                           '- nomeProduto =', produto.nomeProduto)
                            resolve(new ProdutoDto(produto, true))
                        }
                    })
                }
                else {
                    this.#log.error('Erros de validação!', errosValidacao)
                    reject({erros: {validacao: errosValidacao}})
                }
            } catch (e) {
                this.#log.error('Exceção ao criar novo produto', e)
                reject({erros: {ex: e}})
            }
        })
    }

    apagarPorId(id) {
        this.#log.info('Apagar produto:', id)

        return new Promise((resolve, reject) => {
            try {
                ProdutoEntity.updateOne(
                    {_id: id},
                    {ativoProduto: false, dataUltimaAtualizacao: new Date()},
                    {},
                    (error, result) => {
                        if (error) {
                            reject(error)
                        }
                        else {
                            resolve(result)
                        }
                    })
            } catch (e) {
                this.#log.error('Exceção ao apagar produto por ID', e)
                reject({erros: {ex: e}})
            }
        })
    }
}

export default ProdutoService
