import {formatarData, formatarMoeda} from '../util.js'
import ProdutoEntity from '../persistence/ProdutoEntity.js'

class ProdutoDto {
    constructor(produtoEntity, format = false) {
        this.id = produtoEntity._id
        this.categoria = produtoEntity.categoriaProduto
        this.nome = produtoEntity.nomeProduto
        this.descricao = produtoEntity.descricaoProduto
        this.preco = format ? formatarMoeda(produtoEntity.precoProduto) : produtoEntity.precoProduto
        this.ativo = produtoEntity.ativoProduto
        this.imagem = produtoEntity.imagemProduto
        this.dataCriacao = format ? formatarData(produtoEntity.createdAt) : produtoEntity.createdAt
        this.dataUltimaAtualizacao = format ? formatarData(produtoEntity.updatedAt) : produtoEntity.updatedAt
    }

    static toEntity(prod) {
        return new ProdutoEntity({
                                     categoriaProduto: prod.categoria,
                                     nomeProduto: prod.nome,
                                     descricaoProduto: prod.descricao,
                                     precoProduto: prod.preco,
                                     ativoProduto: typeof prod.ativo === 'boolean' ? prod.ativo : false,
                                     imagemProduto: prod.imagem,
                                 })
    }
}

export default ProdutoDto
