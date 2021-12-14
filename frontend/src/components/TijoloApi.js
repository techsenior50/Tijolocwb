import axios from 'axios'

export const API_URL = {
    prod: 'https://api.tijolo.com.br',
    local: 'http://localhost:5000',
}

const isLocalhost = () => (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

const api = (baseUrl, basePath = '/v1') => {
    const endpoints = {
        produtosListar: '/produto',
        produtosCadastrar: '/produto',
        produtosGet: '/produto',
    }

    const conf = (extraConfs) => {
        const token = ''
        const headers = token != null && token.length > 0 ? {
            headers: {'Authorization': `Bearer ${token}`},
            withCredentials: true,
        } : {}

        return {
            timeout: 10000,
            baseURL: baseUrl,
            ...headers,
            ...extraConfs,
        }
    }

    return {
        produtos: {
            getLista: (pagina = 0, tamanhoPagina = 25, ordem = '-dataCriacao') =>
                axios.get(`${basePath}${endpoints.produtosListar}`,
                          conf({
                                   params: {
                                       p: pagina,
                                       ps: tamanhoPagina,
                                       ord: ordem,
                                   },
                               }),
                ),
            cadastrar: (novoProduto) =>
                axios.post(`${basePath}${endpoints.produtosCadastrar}`, novoProduto, conf()),
            carregar: (id) =>
                axios.get(`${basePath}${endpoints.produtosGet}/${id}`, conf()),
        },
    }
}

const TijoloApi = api(isLocalhost() ? API_URL.local : API_URL.prod)

export default TijoloApi
