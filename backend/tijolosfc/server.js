//Aqui deixamos apenas configurações mais genéricas do servidor em si.
// aqui será a melhor opção para colocar a nossa conexão com a base de dados e para isso preciso importar o mongoose
const express = require('express'); //importo
const path = require("path");
const ProdutoRoutes = require("./routes/produto-routes");

class Server {
    constructor(){
        this.app = express(); //instancio - coloquei como propriedade porque hoje é express, mas posso utilizar outra ferramenta
 
    }
    
    start(){
        //express middleware
        // ao invés de incluir arquivo por arquivo como o feito acima, eu posso apenas indicar o dire´torio utilizando o use do express
        this.app.use(express.json()); //essa e a anterior são functions que estão funcionando como uma Middleware  - estão fazenod isso internamente, ou seja, tem o next para continuar

        this.app.use(express.urlencoded({ extended: false }));
        
        this.app.use(express.static(path.join(__dirname, 'public'))) // vai trazer abrir todos os arquivos que estão dentro da pasta

        // view engine setup --> para utilização dos arquivos .ejs 
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs'); 

        this.app.use('/', ProdutoRoutes);
        // anteriormente estava sem a barra this.app.use(ProdutoRoutes);
        //Config
        const port= process.env.PORT || 3000; //coloco a porta tento envontrar uma porta padrão e se não encontrar coloco 3000
        this.app.listen(port, function() {
            console.log(`Server Running at http://localhost:${port}/`);
        });

    }
}

module.exports = Server;