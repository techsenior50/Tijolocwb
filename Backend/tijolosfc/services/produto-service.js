//Deveria ser o cara que faz as validações relacionadas à regras de negócios, se for o tipo
const ProdutoRepoArray = require("../repositories/produto-repo-array");
const ProdutoRepoMongo = require("../repositories/produtos-repo-mongo");

class ProdutoService{

    constructor(){
        this.produtoRepository = new ProdutoRepoMongo(); //criei um array - vou substituir pelo produtoRepoArray()
    }

    //vou criar os métodos do CRUD

    adicionar(produto){
    /*    if (typeof produto.ativoProduto !== 'boolean') {
            produto.ativoProduto = false
        } */
        this.produtoRepository.adicionar(produto)
    }

    excluir(nomeProduto){
        //preciso primeiro localizar dentro do array
        // posso fazer de várias formas, posso usar o splice -> array.splice();
        this.produtoRepository.excluir(nomeProduto);
    }

    alterar(idProduto, produto){
        if (typeof produto.ativoProduto !== 'boolean') {
            produto.ativoProduto = false
        }

        this.produtoRepository.alterar(idProduto, produto);

    }
    buscarProduto(idProduto){
        return this.produtoRepository.buscarProduto(idProduto);
    }

    buscarTodos(){
        return this.produtoRepository.buscarTodos();
    }
}

module.exports = ProdutoService;