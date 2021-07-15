const mongoose = require('mongoose');

class ManageDB{

    static async connect() { //inclui o async e vou usar o await porque é um promise

        //CONEXÃO MONGODB LOCALHOST
        
        /*mongoose.connect('mongodb://localhost:27017/tijolosfc', {userNewUrlParser: true, useUnifieldTopology: true, useFindAndModify: false}).catch((err)=>{
            console.log(`Erro na Conexão + ${err}`);
        });
        console.log("Conectado no MongoDB"); */ 
        //esta tarefa só vai acontecer quando a tarefa de cima concluir com sucesso. 

      
        //CONEXÃO MONGODB Atlas Cloud
        await mongoose.connect('mongodb+srv://user_app:fkQnzC0Pr5rsTpxV@cluster0.hs07u.mongodb.net/tijolosfc?retryWrites=true&w=majority',
        {userNewUrlParser: true, useUnifieldTopology: true, useFindAndModify: false}).catch((err)=>{
            console.log(`Erro na Conexão + ${err}`);
        });
        console.log("Conectado no MongoDB"); //esta tarefa só vai acontecer quando a tarefa de cima concluir com sucesso. */

        /*
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            //we´re connected
            console.log("Conectado");
        })
            }   --retirei todo esse código, pois com o await e o catch(err) eu já estou substituindo esse códgo, se passou é porque conectou com sucesso*/
    
    }

    static async close() {
        await mongoose.connection.close().catch(err=>{
            console.log(`erro no fechamento da conexão ${err}`);
        });
        console.log("conexão fechado com sucesso");
    }
}

module.exports = ManageDB;