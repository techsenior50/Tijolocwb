import Server from './server-config.js'
import ProdutoApi from './api/ProdutoApi.js'
import Log from './util/Log.js'

const log = new Log('Servidor')
const port = process.env.PORT || 5000

if (process.env.NODE_ENV !== 'test') {
    log.info('Iniciando Banco de Dados...')
    Server.db.connect().then(() => {
        const apis = [new ProdutoApi(Server.app)]

        Server.app.listen(port, () => {
            log.info('Servidor iniciado na porta', port, 'expondo', apis.length, 'controllers.')
        })
    })
}
