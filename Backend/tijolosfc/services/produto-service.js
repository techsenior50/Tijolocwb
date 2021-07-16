//Deveria ser o cara que faz as validações relacionadas à regras de negócios, se for o tipo
const ProdutoRepoArray = require("../repositories/produto-repo-array");
const ProdutoRepoMongo = require("../repositories/produtos-repo-mongo");

class ProdutoService{

    constructor(){
        this.produtoRepository = new ProdutoRepoMongo(); //criei um array - vou substituir pelo produtoRepoArray()
    }

    //vou criar os métodos do CRUD

    adicionar(produto){
        console.log(produto.ativoProduto);
    /*    if produto.ativoProduto "true") {
            produto.ativoProduto = false
        } */
        this.produtoRepository.adicionar(produto)
    }

    excluir(idProduto){
        console.log(idProduto);
        //preciso primeiro localizar dentro do array
        // posso fazer de várias formas, posso usar o splice -> array.splice();
        return this.produtoRepository.excluir(idProduto);
    }

    alterar(idProduto, produto){
        console.log(produto);
        console.log(produto.ativoProduto);
         if ( typeof produto.ativoProduto === "undefined" ) {
            produto.ativoProduto = false
        }
        console.log(produto.ativoProduto);

        return this.produtoRepository.alterar(idProduto, produto);

    }
    buscarProduto(idProduto){
        return this.produtoRepository.buscarProduto(idProduto);
    }


    buscarTodos(){
        return this.produtoRepository.buscarTodos();
    }
}

module.exports = ProdutoService;