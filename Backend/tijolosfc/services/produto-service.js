//Deveria ser o cara que faz as validações relacionadas à regras de negócios, se for o tipo
const ProdutoRepoArray = require("../repositories/produto-repo-array");
const ProdutoRepoMongo = require("../repositories/produtos-repo-mongo");
const Produto = require("../domain/produto-domain"); //representa o nosso modelo

class ProdutoService{

    constructor(){
        this.produtoRepository = new ProdutoRepoMongo(); //criei um array - vou substituir pelo produtoRepoArray()
    }

    //vou criar os métodos do CRUD

    adicionar(produto){
/*         let ativoProduto = true;
        console.log(req.body);
        console.log(ativoProduto);
        if ( typeof req.body.ativoProduto === "undefined" ) {
            ativoProduto = false;
        }
        let produto = new Produto(req.body.categoriaProduto, req.body.nomeProduto, req.body.descricaoProduto, req.body.precoProduto, ativoProduto, req.body.imagemProduto, req.requestTime); //para que o nodejs entenda o body do json preciso inicializar antes com o comando app.use(express.json())
 */
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