import {formatarData, formatarMoeda} from '../util.js'
import ProdutoEntity from '../persistence/ProdutoEntity.js'
import Log from '../util/Log.js'

class ProdutoDto {
    constructor(produtoEntity, format = false) {
        this.id = produtoEntity._id
        this.categoria = produtoEntity.categoriaProduto
        this.nome = produtoEntity.nomeProduto
        this.descricao = produtoEntity.descricaoProduto
        this.preco = format ? formatarMoeda(produtoEntity.precoProduto) : produtoEntity.precoProduto
        this.ativo = produtoEntity.ativoProduto
        this.imagem = produtoEntity.imagemProduto
        this.dataCriacao = format ? formatarData(produtoEntity.dataCriacao) : produtoEntity.dataCriacao
        this.dataUltimaAtualizacao = format ? formatarData(produtoEntity.dataUltimaAtualizacao)
            : produtoEntity.dataUltimaAtualizacao
    }

    static toEntity(prod) {
        return new ProdutoEntity({
                                     categoriaProduto: prod.categoria,
                                     nomeProduto: prod.nome,
                                     descricaoProduto: prod.descricao,
                                     precoProduto: prod.preco,
                                     ativoProduto: typeof prod.ativo === 'boolean' ? prod.ativo : false,
                                     imagemProduto: prod.imagem,
                                     dataCriacao: prod.dataCriacao || new Date(),
                                     dataUltimaAtualizacao: prod.dataUltimaAtualizacao || new Date(),
                                 })
    }
}

export default ProdutoDto
