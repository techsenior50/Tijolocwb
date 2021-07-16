//É o mesmo que o Controller - é a parrte que conversa com o HTTP com o front
//CRUD - Create, Retrieve, Update, Delete

const express = require('express');
var router = express.Router(); //estou extraindo de dentro do express o Router
const ProdutoController = require('../controllers/produto-controller');
const produto = require('../models/produto-model');
const ProdutoRepositoryMongo = require('../repositories/produtos-repo-mongo');

//criando uma classe, transformando a rota em um objeto:
class ProdutoRoutes{
    constructor() { //o que eu devo colocar como propriedades do meu objeto, o que os chamadores poderão alterar.
        this.produtoController = new ProdutoController(); //transformei a minha constante em uma propriedade.
        this.router = express.Router();
        this.repo = new ProdutoRepositoryMongo();
        this.loadRoutes();
    }


    //aqui eu coloco o método carregador de rotas, apenas para ficar mais organizado, dividido as responsabilidades, então no constructor eu inicializo as propriedades
    loadRoutes() {

        /* ******************************************** */
        /* ***************MISSÃO DADA PELO RAFAEL****** */
        /* ******************************************** */

        // Missão do Back-end: Fazer esses endpoints funcionarem!
         this.router.param('id', (req, res, next, id) => {
          // faça a validação do 'name' aqui
          // validação blah blah
          // logar alguma coisa pra sabermos se funciona
          console.log('validando o id: ' + id)
        
          // quando a validação acabar, salve o novo nome na requisição
          req.id = id
          //res.id = id
          // vá para a próxima coisa a fazer
          next()
        }) 
        // GET /produto
        // Lista com todos os produtos
        this.router.get("/produto", this.produtoController.buscarTodos.bind(this.produtoController)); //aqui eu estou informando qual o this que deve ser utilizado para não pegar qualquer this.

        // GET /produto/novo
        // Tela para criar um novo produto (faz POST para /produto)
        this.router.get("/produto/novo", (req, res, next) => {
          res.render('cadastroProduto');
        })

        // POST /produto
        // Cadastrar novo produto (NÃO pode receber um id!)
        this.router.post("/produto", this.produtoController.adicionar.bind(this.produtoController));

        // GET /produto/{id} <- Desafio!
        // Tela de edição de um produto
        // Por exemplo: GET /produto/60cb4d1042f21a4584ed3a42
        // (Path Parameters)

        
        //*********   MÉTODO GET DO EDITARPRODUTO - CHAMADA QUANDO DO LISTARTODOS CLICAMOS NO BOTÃO EDITAR ********
        this.router.get("/produto/:id", this.produtoController.buscarProduto.bind(this.produtoController));
        
        //this.router.get("/produto/{id}", this.produtoController.buscarTodos.bind(this.produtoController));
        //this.router.get("/produto/editarProduto", this.produtoController.buscarProduto.bind(this.produtoController));
        // Se não conseguir, pode ser /produto/ver?id=60cb4d1042f21a4584ed3a42
        // this.router.get("/produto/ver", this.produtoController.buscarTodos.bind(this.produtoController)); //aqui eu estou informando qual o this que deve ser utilizado para não pegar qualquer this.

        //*********   MÉTODO PUT DO EDITARPRODUTO - CHAMADA PARA ALTERAR ********
        // POST /produto/:id 
        // Alterar produto existente (DEVE receber um id!)
       
        // POST /produto/deletar
        // Apagar um produto do banco (DEVE receber um id!)
        this.router.post("/produto/deletar", this.produtoController.excluir.bind(this.produtoController)); //eu tive que colocar o this porque virou propriedade agora.

        this.router.post("/produto/:id", this.produtoController.alterar.bind(this.produtoController));

        // Ver detalhes do produto
        this.router.get("/verProduto/:id", this.produtoController.verProduto.bind(this.produtoController));



        /* ********************* */

        // Missão do Front-end: Fazer as telas de cima!
        // Desafio:
        // 1. Fazer uma tela de erro
        // 2. Fazer uma tela de "Cadastro feito com sucesso"
        // 3. Colocar ações na tela de listagem de produtos
        //    -> Botões: [ Novo ] [ Recarregar ]
    }
}

module.exports = new ProdutoRoutes().router; //porque eu estou fazendo isso, é apeans uma sugestão. Já estou entregando instanciado e estou mandando a propriedade que ele vai precisar la na outra ponta.