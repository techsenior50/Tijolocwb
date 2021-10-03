import {formatarData, formatarMoeda} from '../util.js'
import ProdutoEntity from '../persistence/ProdutoEntity.js'

class ProdutoDto {
    #format = false

    constructor(produtoEntity, format = false) {
        this.#format = format

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

    toEntity() {
        return new ProdutoEntity({
                                     categoriaProduto: this.categoria,
                                     nomeProduto: this.nome,
                                     descricaoProduto: this.descricao,
                                     precoProduto: this.preco,
                                     ativoProduto: this.ativo,
                                     imagemProduto: this.imagem,
                                 })
    }
}

export default ProdutoDto
