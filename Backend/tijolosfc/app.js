    
    //Este arquivo App.js é como se fosse o meu main (é onde eu começo o meu aplicativo)

    //Eu posso também colocar o app.js como uma classe.

    //esse padrão de importação é CommonJs const Server = require();
    //Mas eu também posso fazer de outra forma  usando o EcmaScript pode ser usado o Babel ou o ESM (EcmaScript Modules)
    //quando vou usar com ESM a extensão é .mjs
    const Server = require("./server");
    const ManageDB = require("./db/ManageDB");

    //Conexão com o Banco, como é um método estático, posso chamar diretamente,não preciso instaciá-lo
    ManageDB.connect();
    //ManageDB.close(); coloquei apenas para testar.

    new Server ().start();
    