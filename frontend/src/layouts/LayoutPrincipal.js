import React, {useEffect} from 'react'
import {Route, Switch, useLocation} from 'react-router-dom'
import Navegacao from '../components/Navegacao.js'
import Rodape from '../components/Rodape.js'
import ProdutosListagem from '../paginas/ProdutosListagem.js'

const LayoutPrincipal = () => {
    const location = useLocation()

    // Sempre que trocar de tela, volta para o topo
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return <>
        <Navegacao/>

        <Switch>
            <Route path="/produtos" exact>
                <ProdutosListagem/>
            </Route>
            <Route path="/produtos/novo" exact>
                {/*<AdminDashboard/>*/}Novo produto
            </Route>

            {/* Any other route goes to home */}
            <Route>
                {/*<Home/>*/}Home!
            </Route>
        </Switch>

        <Rodape/>
    </>
}

export default LayoutPrincipal
