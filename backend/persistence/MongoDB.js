import mongoose from 'mongoose'

const log = (...m) => console.log('[Database]', ...m)
const error = (...m) => console.error('[Database]', ...m)

const CONN_STRING = 'mongodb+srv://user_app:fkQnzC0Pr5rsTpxV@cluster0.hs07u.mongodb.net/tijolosfc?retryWrites=true&w=majority'

const MongoDB = () => {
    const maxDisconnectCount = 10
    let disconnectCount = 0

    const connect = () =>
        mongoose.connect(CONN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        }).then(() => {
            log('Conectado ao MongoDB.')
        }).catch(err => {
            error('Falha ao conectar ao MongoDB. Finalizando servidor com código 10.', err)
            process.exit(10)
        })

    mongoose.connection.on('error', err => {
        error('Erro de comunicação com MongoDB:', err)
    })

    mongoose.connection.on('disconnected', err => {
        disconnectCount++

        if (disconnectCount < maxDisconnectCount) {
            error('Desconectado. Tentando reconectar. Erro:', err)
            connect()
        }
        else {
            error('Falha ao conectar ao MongoDB. Finalizando servidor com código 15.', err)
            process.exit(15)
        }
    })

    return {
        connect,
        disconnect: () => mongoose.disconnect(),
    }
}

export default MongoDB
