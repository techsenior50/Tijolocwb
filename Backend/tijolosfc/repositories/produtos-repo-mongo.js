//repositorio MONGODB

const Produto = require('../domain/produto-domain');
const ProdutoModel = require('../models/produto-model');


class ProdutoRepositoryMongo{

    constructor(){
        this.model = ProdutoModel; //posso colocar this.model ou this.collection - produtoModel é uma classe que o próprio mongoose
        //criou e já tem vários metodos

        //eu poderia nem colocar ele aqui e poderia utilizar direto o ProdutoModel
    }

    //vou criar os métodos do CRUD

    adicionar(produto){
        this.model.create(produto, function (err, suc) {
            if (err) return handleError(err);
            console.log("Produto Salvo com Sucesso");
        }); //isso nada mais é que ProdutoModel.create

    }

    excluir(nomeProduto){
        return this.model.deleteOne({nomeProduto}).exec(); //this.model.deleteOne({nomeProduto}) é uma query e vai retornar uma promise que vai executar. ({nomeProduto}) é o mesmo que ({nomeProduto: nomeProduto}) se eu quiser deletar um registro com chave composta é só incluir as outras chaves com "," exemplo, ({nomeProduto, precoProduto}) ou ({nomeProduto: nomeProduto, precoProduto: precoProduto: precoProduto}) Eu posso ou não retornar um o promise.
    
    }

    alterar(produto){
        const query = {nomeProduto: produto.nomeProduto};
        this.model.findOneAndUpdate(query, produto).exec();
    }

    buscar(nomeProduto){

    }

    buscarTodos(){
       /* return this.model.find({}); não posso retornar diretamente o this.model.find(0 porque é uma query)*/
       const query = this.model.find({}); //primeiro eu guardo a query em uma constante
       const promise = query.lean().exec(); // executo a query e guardo em uma promise - eu posso usar com o sem o lean, sem o lean além dos campos, vai trazer mais um monte de propriedades que pode não me interessar.
       return promise; //retorno a promise que é uma json
    }
}

module.exports = ProdutoRepositoryMongo;
