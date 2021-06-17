//è o mesmo que o Controller - é a paerte que conversa com o HTTP com o front
//CRUD - Create, Retrieve, Update, Delete

const express = require('express');
var router = express.Router(); //estou extraindo de dentro do express o Router
const ProdutoController = require('../controllers/produto-controller');
const produto = require('../models/produto-model');

//criando uma classe, transformando a rota em um objeto:
class ProdutoRoutes{
    constructor() { //o que eu devo colocar como propriedades do meu objeto, o que os chamadores poderão alterar.
        this.produtoController = new ProdutoController(); //transformei a minha constante em uma propriedade.
        this.router = express.Router();
        this.loadRoutes();
    }


    //aqui eu coloco o método carregador de rotas, apenas para ficar mais organizado, dividido as responsabilidades, então no constructor eu inicializo as propriedades
    loadRoutes() {


        /* GET home page. */
        this.router.get('/', function (req, res, next) {
            res.render('index', { title: 'Express' });
        });

        this.router.get('/listarTodos', (req, res, next) => {
          produto.find({}, (erro, dados) => {
            res.render('listarTodos', {produtos: dados});
          });
        });
        
        /* GET Página Cadastro */
        this.router.get('/cadastroProduto', (req, res, next) => {
          res.render('cadastroProduto');
        })

        this.router.post('/cadastroProduto', (req, res, next) => {
          produto.create(req.body, (erro, produto) => {
            if (erro) {
              res.send('Houve um erro: ' + erro);
            }
            else {
              res.render('cadastroProdutoSucesso', { u: produto });
              //res.send(produto.titulo + ' Cadastrado com id ' + produto._id)
            }
          })
        })

        this.router.get('/cadastroProduto', function(req,res,next) {
          /* a linha de baixo do comando é igual ao de cima mais compactado
          router.get('/cadastro', (req, res, next) => { } */
          res.write('cadastroProduto');
          res.end();
        });

        this.router.get('/detalhesProduto', (req, res, next) => {
          produto.findOne({_id: req.query.id}, (erro, dado) => {
            res.render('detalhesProduto', {produto: dado});
          });
        });

        this.router.get('/editarProduto', (req, res, next) => {
          produto.findOne({_id: req.query.id}, (erro, dado) => {
            res.render('editarProduto', {produto: dado});
          });
        });
        
        this.router.post('/editarProduto', (req, res, next) => {
          produto.findOneAndUpdate({_id: req.query.id}, req.body, (erro, dado) => {
            res.send('Produto alterado com sucesso');
          });
        });
  
        this.router.get('/excluirProduto', (req, res, next) => {
          produto.findOneAndRemove({_id: req.query.id}, (erro, dado) => {
            res.send('Produto excluído com sucesso');
          });
        });


        this.router.get("/produto", this.produtoController.buscarTodos.bind(this.produtoController)); //aqui eu estou informando qual o this que deve ser utilizado para não pegar qualquer this.
     
        
        this.router.get("/listarTodos", this.produtoController.buscarTodos.bind(this.produtoController));

        this.router.post("/produto", this.produtoController.adicionar.bind(this.produtoController)); 

        this.router.put("/produto", this.produtoController.alterar.bind(this.produtoController));

        this.router.get('/detalhesProduto', (req, res, next) => {
          this.ProdutoController.findOne({_id: req.query.id}, (erro, dado) => {
            res.render('detalhesProduto', {produto: dado});
          });
        });

        this.router.delete("/produto", this.produtoController.excluir.bind(this.produtoController)); //eu tive que colocar o this porque virou propriedade agora.
    }
}

module.exports = new ProdutoRoutes().router; //porque eu estou fazendo isso, é apeans uma sugestão. Já estou entregando instanciado e estou mandando a propriedade que ele vai precisar la na outra ponta.