import Server from '../server-config.js'
import ProdutoService from '../service/ProdutoService.js'

class ProdutoApi {
    #endpoint = '/produto'

    #listParams(req) {
        return {
            pagina: Math.max(req.query.p || 0, 0),
            tamanhoPagina: Math.max(0, Math.min(req.query.ps || 25, 100)),
            ordenacao: req.query.ord,
        }
    }

    constructor(
        app = Server.app,
        service = new ProdutoService(),
        endpoint = this.#endpoint,
    ) {
        app.get(`${endpoint}/`, (req, res) => {
            const params = this.#listParams(req)
            Promise.all([
                            service.contarProdutos(),
                            service.buscarTodos(params.pagina, params.tamanhoPagina, params.ordenacao),
                        ])
                   .then(data => res.send({...params, total: data[0], tamanhoLista: data[1].length, produtos: data[1]}))
                   .catch(() => res.status(404).send(''))
        })

        app.get(`${endpoint}/:id`, (req, res) => {
            service.buscarPorId(req.params.id)
                   .then(produto => res.send(produto))
                   .catch(() => res.status(404).send(''))
        })

        app.post(`${endpoint}/`, (req, res) => {
            const novoProduto = req.body
            service.novoProduto(novoProduto)
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
}

export default ProdutoApi
