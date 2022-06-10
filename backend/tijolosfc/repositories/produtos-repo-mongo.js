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

    excluir(idProduto){
        return this.model.findOneAndRemove({_id:idProduto}).exec(); //this.model.deleteOne({nomeProduto}) é uma query e vai retornar uma promise que vai executar. ({nomeProduto}) é o mesmo que ({nomeProduto: nomeProduto}) se eu quiser deletar um registro com chave composta é só incluir as outras chaves com "," exemplo, ({nomeProduto, precoProduto}) ou ({nomeProduto: nomeProduto, precoProduto: precoProduto: precoProduto}) Eu posso ou não retornar um o promise.
    
    }

    alterar(idProduto, produto){
/*         produto.precoProduto = Math.max(1, produto.precoProduto); // <- transforma em número
        const query = {nomeProduto: produto.nomeProduto};
        this.model.findOneAndUpdate(query, produto).exec(); */

/*         req.body.precoProduto = Math.max(1, req.body.precoProduto);
        produto.findOneAndUpdate({_id: req.query.id}, req.body, (erro, dado) => {
          res.send('Produto alterado com sucesso'); */

          produto.precoProduto =Math.max(1, produto.precoProduto);
          return this.model.findOneAndUpdate({_id: idProduto}, produto);
          
    }

    buscarTodos(){
        return this.model.find({}).lean().exec();
    }

    buscarTodosPaginado(p, l){
    return this.model.find({})
    .limit(l *1)
    .skip((p -1) *l)
    .sort({"_id":-1})
    .lean()
    .exec();

    }

    buscarProduto(idProduto){
         return this.model.findById(idProduto).lean().exec();
     }

}

module.exports = ProdutoRepositoryMongo;
