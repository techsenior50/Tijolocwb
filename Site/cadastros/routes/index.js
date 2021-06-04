var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var produtoEsquema = mongoose.Schema(
  {
    categoriaProduto: String,
    nomeProduto: String,
    descricaoProduto: String,
    precoProduto: Number,
    statusProduto: Boolean,
    imagemProduto: String
  }, {timestamps: true}
);


/* definicao de como os registros serao gravados conforme o produtoEsquema definido no Banco */
var produto = mongoose.model('produto', produtoEsquema);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Página Cadastro */
router.get('/cadastroProduto', (req, res, next) => {
  res.render('cadastroProduto');
})

router.post('/cadastroProduto', (req, res, next) => {
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

router.get('/cadastroProduto', function(req,res,next) {
  /* a linha de baixo do comando é igual ao de cima mais compactado
    router.get('/cadastro', (req, res, next) => { } */
    res.write('cadastroProduto');
    res.end();
  });

  router.get('/listarTodos', (req, res, next) => {
    produto.find({}, (erro, dados) => {
      res.render('listarTodos', {produtos: dados});
    });
  });

  router.get('/detalhesProduto', (req, res, next) => {
    produto.findOne({_id: req.query.id}, (erro, dado) => {
      res.render('detalhesProduto', {produto: dado});
    });
  });

  router.get('/editarProduto', (req, res, next) => {
    produto.findOne({_id: req.query.id}, (erro, dado) => {
      res.render('editarProduto', {produto: dado});
    });
  });
  
  router.post('/editarProduto', (req, res, next) => {
    produto.findOneAndUpdate({_id: req.query.id}, req.body, (erro, dado) => {
      res.send('Produto alterado com sucesso');
    });
  });

  
  router.get('/excluirProduto', (req, res, next) => {
    produto.findOneAndRemove({_id: req.query.id}, (erro, dado) => {
      res.send('Produto excluído com sucesso');
    });
  });

module.exports = router;

/* GET retorna um JSON contendo todos os produtos cadastrados */
 router.get('/produtos', function(req, res, next){
  produto.find({}, '_id categoriaProduto nomeProduto precoProduto statusProduto', (erro, dados) => {
    var retornoString = JSON.stringify(dados);
    res.write(retornoString);
    res.end();
   });
 });