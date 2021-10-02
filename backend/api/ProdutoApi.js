import Server from '../server-config.js'
import ProdutoEntity from '../persistence/ProdutoEntity.js'

const endpoint = '/produto'

const listParams = (req) => {
    return {
        page: Math.max(req.get('p'), 0) || 0,
        pageSize: Math.max(0, Math.min(req.get('ps') || 25, 100)),
    }
}

const ProdutoApi = () => {
    Server.app.get(`${endpoint}/`, (req, res) => {
        const params = listParams(req)
        ProdutoEntity.find({})
                     .limit(params.pageSize)
                     .skip(params.page * params.pageSize)
                     .sort('-createdAt')
                     .exec((err, produtos) => {
                         if (err) {
                             res.status(404).send('')
                         }
                         else {
                             res.send({
                                 ...params,
                                 data: produtos
                             })
                         }
                     })
    })

    Server.app.get(`${endpoint}/:id`, (req, res) => {
        ProdutoEntity.findById(req.params.id)
                     .exec((err, produto) => {
                         if (err || !produto) {
                             res.status(404).send('')
                         }
                         else {
                             res.send(produto)
                         }
                     })
    })
}

export default ProdutoApi
