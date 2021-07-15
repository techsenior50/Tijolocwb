//no model é a estrutura da tabela - como esse objeto vai ser salvo no banco
//Estrutura de uma collection, quais vão ser nossos atributos, nossas propriedades
const mongoose = require('mongoose');
const Produto = require('../domain/produto-domain');
//Definindo o modelo  (estrutura da collection)
const ProdutoSchema = mongoose.Schema(
    
    { 
        categoriaProduto: String,
        nomeProduto: String,
        descricaoProduto: String,
        precoProduto: Number,
        ativoProduto: Boolean,
        imagemProduto: String
    }, { timestamps: true }
);

mongoose.model( 'Produto', ProdutoSchema); //quem importar o produto-model irá ganhar essa classe. 
// o mongoose.model é que consegue fazer o insert, delete, etc.o CRUD e também consegue manipular a estrutura do schema que criamos


// este é o obejto que contém os dados
ProdutoSchema.loadClass( Produto)    //permite carregar uma classe para dentro do mongoose
module.exports = mongoose.model('Produto', ProdutoSchema);
 