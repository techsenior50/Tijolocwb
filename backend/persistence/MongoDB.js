import mongoose from 'mongoose'
import Log from '../util/Log.js'

class MongoDB {
// const CONN_STRING = 'mongodb+srv://user_app:fkQnzC0Pr5rsTpxV@cluster0.hs07u.mongodb.net/tijolosfc?retryWrites=true&w=majority'
    #log
    #user
    #pass
    #authSource
    #connectionString

    constructor(
        user = process.env.TIJOLO_DB_USER || 'tijolo',
        pass = process.env.TIJOLO_DB_PASS || 'Tijol0',
        authSource = process.env.TIJOLO_DB_AUTHSOURCE || 'admin',
        host = process.env.TIJOLO_DB_HOST || 'localhost',
        port = process.env.TIJOLO_DB_PORT || '27017',
        schema = process.env.TIJOLO_DB_SCHEMA || 'tijolo',
        log = new Log('Banco de Dados'),
    ) {
        this.#log = log
        this.#connectionString = `mongodb://${host}:${port}/${schema}?appName=tijoloApi`
        this.#user = user
        this.#pass = pass
        this.#authSource = authSource
    }

    connect() {
        this.#log.info('Conectando ao MongoDB:', this.#connectionString)

        const options = {
            keepAlive: true,
            keepAliveInitialDelay: 300000,
            user: this.#user,
            pass: this.#pass,
            authSource: this.#authSource,
        }

        return mongoose.connect(this.#connectionString, options)
                       .then(
                           () => {
                               mongoose.connection.on('error', err => {
                                   this.#log.error('Erro de comunicação com MongoDB:', err)
                               })

                               this.#log.info('Conectado ao MongoDB!')
                           }, err => {
                               this.#log.error('Falha ao conectar ao MongoDB. Finalizando servidor com código 10.', err)
                               process.exit(10)
                           })
    }

    disconnect() {
        return mongoose.disconnect()
    }
}

export default MongoDB
