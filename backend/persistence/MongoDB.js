import mongoose from 'mongoose'
import Log from '../util/Log.js'

class MongoDB {
// const CONN_STRING = 'mongodb+srv://user_app:fkQnzC0Pr5rsTpxV@cluster0.hs07u.mongodb.net/tijolosfc?retryWrites=true&w=majority'
    #CONN_STRING = 'mongodb://tijolo:Tijol0@localhost:27017/tijolo?retryWrites=true&w=majority'
    #maxDisconnectCount = 10
    #disconnectCount = 0
    #log

    constructor(connectionString = this.#CONN_STRING, log = new Log('Database')) {
        this.#log = log
        this.#CONN_STRING = connectionString
    }

    connect() {
        this.#log.info('Tentando conexão com o MongoDB...')

        mongoose.connect(this.#CONN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        }).then(() => {
            this.#disconnectCount = 0
            this.#log.info('Conectado ao MongoDB.')
        }).catch(err => {
            if (this.#disconnectCount >= this.#maxDisconnectCount) {
                this.#log.error('Falha ao conectar ao MongoDB. Finalizando servidor com código 10.', err)
                process.exit(10)
            }
        })

        mongoose.connection.on('error', err => {
            this.#log.error('Erro de comunicação com MongoDB:', err)
        })

        mongoose.connection.on('disconnected', (err) => {
            this.#disconnectCount++

            if (this.#disconnectCount <= this.#maxDisconnectCount) {
                this.#log.error(
                    `Desconectado. Tentando reconectar: ${this.#disconnectCount}/${this.#maxDisconnectCount}. Erro:`,
                    err)
                this.connect()
            }
            else {
                this.#log.error('Falha ao conectar ao MongoDB. Finalizando servidor com código 15. Erro: ', err)
                process.exit(15)
            }
        })
    }

    disconnect() {
        mongoose.disconnect()
    }
}

export default MongoDB
