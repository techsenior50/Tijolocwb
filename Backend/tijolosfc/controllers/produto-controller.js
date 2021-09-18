const Produto = require("../domain/produto-domain"); //representa o nosso modelo
const { param } = require("../routes/produto-routes");

const ProdutoService = require('../services/produto-service'); //representa o nosso service, regra de negócio

class ProdutoController{
    
    constructor(){
        this.produtoService = new ProdutoService(); //coloquei aqui como propriedade. Ao instanciar o ProdutoController eu defino uma propriedade produtoService e passo a instancia dele: new ProdutoService()

    }


    adicionar(req, res) {
        console.log("INCLUIR");
        console.log(req.body);
        let ativoProduto = true;
        if ( typeof req.body.ativoProduto === "undefined" ) {
            ativoProduto = false;
        }
        let produto = new Produto(req.body.categoriaProduto, req.body.nomeProduto, req.body.descricaoProduto, req.body.precoProduto, ativoProduto, req.body.imagemProduto, req.requestTime); //para que o nodejs entenda o body do json preciso inicializar antes com o comando app.use(express.json())

    //    let produto = new Produto(req.body.categoriaProduto, req.body.nomeProduto, req.body.descricaoProduto, req.body.precoProduto, req.body.ativoProduto, req.body.imagemProduto, req.requestTime); //para que o nodejs entenda o body do json preciso inicializar antes com o comando app.use(express.json())
    //    this.produtoService.adicionar(produto);
        this.produtoService.adicionar(produto)
        //res.send('chamou pelo meu método Post' + produto);
        //se eu quiser mostrar a mensagem como json:
        //res.json(produto);
        res.render('produtoAlteradoSucesso', {produto: produto});
        //res.render('cadastroProdutoSucesso', { u: produto });
            
    }
    
    async excluir(req, res) {
        console.log("Entrou em deletar");
        console.log(req.body.idProduto);
        console.log(req.query.id);
        await this.produtoService.excluir(req.body.idProduto);
        res.send('Excluído com sucesso');
        
    }
    

    async alterar(req, res) {
        console.log("Entrou em alterar");
        
        const id = req.body.idProduto;
        const produtoExistente = await this.produtoService.buscarProduto(id);

        if (produtoExistente != null) { 
            await this.produtoService.alterar(id, req.body);
            //await this.produtoService.alterar(req.body);
            const produtos = await this.produtoService.buscarProduto(req.id);
            res.render('produtoAlteradoSucesso', {produto: produtos}); 
        }
        else {
            console.log("entrou no else");
            res.send("Produto não encontrado");
        }
    }

    async buscarTodos(req, res) {
        const produtos = await this.produtoService.buscarTodos(); //preciso colocar this.produtoService porque é uma propriedade, mas esse this pode dar conflito, pois ele varia de acordo com o escopo. Quando um método get chama essa função ele pode entender que esse this é de quem chamou e não é do produtoController. Para que não ocorra essa confusão e dê erro "Cannot read property 'produtoService' of undefined, quando chamo a função, preciso passar de que this se trata especificamente que no caso é do produtoController"
        //Se eu não utilizar o this e eu criar uma instancia com new produtoService.buscarTodos(), eu não preciso na chamada da função colocar o bind(this), pois não haverá confusão com a referência.
        
        // console.log(produtos);
        // res.json(produtos);
        res.render('listarTodos', { produtos });
    }

            
    async buscarTodosPaginado(req, res){
        // destructure page and limit and set default values
        console.log("BuscarTodospaginado : pagina =" + req.query.page);
        const { page = 1, limit = 5 } = req.query;

        try {
          const produtos = await this.produtoService.buscarTodosPaginado(page, limit); //preciso colocar this.produtoService porque é uma propriedade, mas esse this pode dar conflito, pois ele varia de acordo com o escopo. Quando um método get chama essa função ele pode entender que esse this é de quem chamou e não é do produtoController. Para que não ocorra essa confusão e dê erro "Cannot read property 'produtoService' of undefined, quando chamo a função, preciso passar de que this se trata especificamente que no caso é do produtoController"
          const totalItens =  Object.keys(produtos).length;
          res.render('listarTodosPaginado', { produtos, totalPages: Math.ceil(totalItens / limit),
            currentPage: page})
        } catch (err) {
          console.error(err.message);
        }
      }


    async buscarProduto(req, res) {
        const produtos = await this.produtoService.buscarProduto(req.id);
        res.render('editarProduto', {produto: produtos});
    }

    async verProduto(req, res) {
        console.log("passei ver Produto" + req.id);
        const produtos = await this.produtoService.buscarProduto(req.id);
        console.log(produtos);
        res.render('verProduto', {produto: produtos}); 
    }
}

module.exports = ProdutoController;