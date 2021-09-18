//no domain defino o nosso objeto
class Produto{

    constructor(categoriaProduto, nomeProduto, descricaoProduto, precoProduto, ativoProduto, imagemProduto) {
        this.categoriaProduto = categoriaProduto;
        this.nomeProduto = nomeProduto;
        this.descricaoProduto = descricaoProduto;
        this.precoProduto = precoProduto;
        this.ativoProduto = ativoProduto;
        this.imagemProduto = imagemProduto;
    }
    
}
module.exports = Produto; //para permitir a importação da classe produto
