const Produto = require("../domain/produto-domain"); //representa o nosso modelo

const ProdutoService = require('../services/produto-service'); //representa o nosso service, regra de negócio

class ProdutoController{
    
    constructor(){
        this.produtoService = new ProdutoService(); //coloquei aqui como propriedade. Ao instanciar o ProdutoController eu defino uma propriedade produtoService e passo a instancia dele: new ProdutoService()

    }


    adicionar(req, res) {
        let produto = new Produto(req.body.categoriaProduto, req.body.nomeProduto, req.body.descricaoProduto, req.body.precoProduto, req.body.ativoProduto, req.body.imagemProduto, req.requestTime); //para que o nodejs entenda o body do json preciso inicializar antes com o comando app.use(express.json())
        this.produtoService.adicionar(produto);
        
        //res.send('chamou pelo meu método Post' + produto);
        //se eu quiser mostrar a mensagem como json:
        res.json(produto);
            
    }
    
    async excluir(req, res) {
        await this.produtoService.excluir(req.body.nomeProduto);
        res.send('Excluído com sucesso');
        
    }
    

    async alterar(req, res) {
        const id = res.body.idProduto;

        const produtoExistente = await this.produtoService.buscarId(id);

        if (produtoExistente != null) {
            await this.produtoService.alterar(req.body);
            res.send("Alterado com sucesso");
        }
        else {
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
}

module.exports = ProdutoController;