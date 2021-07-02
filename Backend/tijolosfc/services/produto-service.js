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
        if (typeof produto.ativoProduto !== 'undefined') {
            produto.ativoProduto = produto.ativoProduto === "true"
        }
        else {
            produto.ativoProduto = false
        }

        const errosDeValidacao = [];

        if (typeof produto.nomeProduto !== 'string' || produto.nomeProduto.length === 0) {
            // produto inválido! tá faltando o nome!
            // Ação: Retornar um erro para a tela indicando que o nome está em branco
            errosDeValidacao.push("Nome deve ser preenchido");
        }

        if (errosDeValidacao.length === 0) {
            this.produtoRepository.alterar(idProduto, produto);
        }
        else {
            // Manda para a tela a lista de erros de validação
        }

    }
    buscarProduto(idProduto){
        return this.produtoRepository.buscarProduto(idProduto);
    }

    buscarTodos(){
        return this.produtoRepository.buscarTodos();
    }
}

module.exports = ProdutoService;