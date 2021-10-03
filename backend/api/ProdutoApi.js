import Server from '../server-config.js'
import ProdutoService from '../service/ProdutoService.js'

const endpoint = '/produto'

const listParams = (req) => {
    return {
        page: Math.max(req.params.p || 0, 0),
        pageSize: Math.max(0, Math.min(req.params.ps || 25, 100)),
        ord: req.params.ord || '-createdAt',
    }
}

const ProdutoApi = () => {
    const service = new ProdutoService()

    Server.app.get(`${endpoint}/`, (req, res) => {
        const params = listParams(req)
        service.buscarTodos(params.page, params.pageSize, params.ord)
               .then(data => res.send({...params, data}))
               .catch(() => res.status(404).send(''))
    })

    Server.app.get(`${endpoint}/:id`, (req, res) => {
        service.buscarPorId(req.params.id)
               .then(produto => res.send(produto))
               .catch(() => res.status(404).send(''))
    })

    Server.app.post(`${endpoint}/`, (req, res) => {
        const novoProduto = req.body
        service.salvar(novoProduto)
               .then(produto => res.send(produto))
               .catch(erro => {
                   if (erro.erros) {
                       res.status(400)
                          .send(erro.erros)
                   }
                   else {
                       res.status(500)
                          .send(erro)
                   }
               })
    })
}

export default ProdutoApi
