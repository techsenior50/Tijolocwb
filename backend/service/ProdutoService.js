import ProdutoEntity from '../persistence/ProdutoEntity.js'
import ProdutoDto from '../dto/ProdutoDto.js'
import {ehNumero, emBranco, formatarMoeda, urlValida} from '../util.js'

/**
 * Classe de Serviço para Produtos. Ela lida com buscas e cadastros dos Produtos, fazendo validações e conversões entre
 * tipos e objetos que vêm da tela e vão para o banco e vice-versa.
 */
class ProdutoService {
    #log = (...m) => console.log('[ProdutoService]', ...m)

    buscarTodos(pagina = 0, tamanhoPagina = 25, ordenacao = '-createdAt') {
        return new Promise((resolve, reject) => {
            ProdutoEntity.find({})
                         .limit(tamanhoPagina)
                         .skip(pagina * tamanhoPagina)
                         .sort(ordenacao)
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

    buscarPorId(id) {
        return new Promise((resolve, reject) => {
            ProdutoEntity.findById(id)
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
            errosValidacao.push({campo: 'imagem', erro: 'Imagem deve ser um número'})
        }
        else if (!urlValida(produto.imagem)) {
            errosValidacao.push({campo: 'imagem', erro: 'Imagem deve ser um endereço de uma imagem'})
        }

        if (errosValidacao.length > 0) {
            this.#log('Produto inválido! Produto:', produto, '- Erros de Validação:', errosValidacao)
        }

        return errosValidacao
    }

    salvar(novoProduto) {
        return new Promise((resolve, reject) => {
            const errosValidacao = this.validar(novoProduto)

            if (errosValidacao.length === 0) {
                const produto = novoProduto.toEntity()

                produto.save((err) => {
                    if (err) {
                        reject({erros: {banco: err}})
                    }
                    else {
                        resolve(new ProdutoDto(produto, true))
                    }
                })
                resolve(new ProdutoDto(produto, true))
            }
            else {
                reject({erros: {validacao: errosValidacao}})
            }
        })
    }
}

export default ProdutoService
