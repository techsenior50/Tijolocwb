import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
import Alert from 'react-bootstrap/Alert'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import classNames from 'classnames'
import {NavLink} from 'react-router-dom'
import TijoloApi from '../components/TijoloApi.js'

const Carregando = ({cor = 'primary'}) => <tr>
    <td colSpan={5} className="text-center p-5">
        <Spinner variant={cor} animation="grow" className="ms-2"/>
        <p className="m-0 p-0">Carregando...</p>
    </td>
</tr>

const DadosListagem = ({dados = []}) =>
    dados.length === 0 ?
        <tr>
            <td colSpan={5}>Nenhum produto cadastrado!</td>
        </tr>
        : dados.map(item =>
                        <tr className={classNames({'opacity-50': !item.ativo})}>
                            <td><NavLink to={`/produtos/${item.id}`}>{item.nome}</NavLink></td>
                            <td>{item.categoria}</td>
                            <td>{item.preco}</td>
                            <td>{item.dataCriacao}</td>
                            <td>
                                <ButtonGroup size="sm" aria-label={`Ações do Produto: ${item.nome}`}>
                                    <Button variant={item.ativo ? 'primary' : 'secondary'}>Editar</Button>
                                    <Button variant={item.ativo ? 'primary' : 'secondary'}>{item.ativo ? 'Apagar'
                                        : 'Restaurar'}</Button>
                                </ButtonGroup>
                            </td>
                        </tr>)

const ProdutosListagem = () => {
    const [carregando, setCarregando] = useState(true)
    const [mensagemErro, setMensagemErro] = useState(false)
    const [dados, setDados] = useState({
                                           pagina: 0,
                                           tamanhoPagina: 25,
                                           total: 0,
                                           tamanhoLista: 0,
                                           produtos: [],
                                       })

    const atualizarLista = () => {
        setCarregando(true)
        TijoloApi.produtos.getLista()
                 .then(res => {
                     setMensagemErro(false)
                     setCarregando(false)
                     setDados(res.data)
                 })
                 .catch(() => setMensagemErro(true))
    }

    useEffect(() => {
        atualizarLista()
    }, [])

    return <Container>
        <Alert show={mensagemErro} className="mt-3" variant="danger" onClose={() => setMensagemErro(false)} dismissible>
            <Alert.Heading>Erro!</Alert.Heading>
            <p className="mb-0">Erro ao carregar lista de Produtos. Por favor, aguarde alguns instantes e tente
                novamente.</p>
        </Alert>

        <Navbar bg="light" className="rounded-top mt-3">
            <Container>
                <Navbar.Brand>Lista de Produtos</Navbar.Brand>
                <Nav className="me-auto">
                    <Button size="sm" onClick={atualizarLista} className="me-2" disabled={carregando}>Atualizar</Button>
                    <NavLink to="/produtos/novo" className="btn btn-primary btn-sm">Novo Produto</NavLink>
                </Nav>
                <Navbar.Text>Produtos</Navbar.Text>
            </Container>
        </Navbar>

        <Table striped bordered hover className="border-light mb-0">
            <thead>
            <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Data Cadastro</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            {carregando ?
                <Carregando/>
                : <DadosListagem dados={dados.produtos}/>}
            </tbody>
            <tfoot>
            <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Data Cadastro</th>
                <th>Ações</th>
            </tr>
            </tfoot>
        </Table>

        <Navbar bg="light" className="rounded-bottom mb-3">
            <Container>
                <Pagination size="sm" className="m-0">
                    <Pagination.First disabled={carregando || dados.pagina === 0}/>
                    <Pagination.Prev disabled={carregando || dados.pagina === 0}/>
                    {Array.from({length: Math.ceil(dados.total / dados.tamanhoLista)})
                          .map((_, index) =>
                                   <Pagination.Item key={index} active={dados.pagina === index}>
                                       {index + 1}
                                   </Pagination.Item>)
                    }
                    <Pagination.Next disabled={carregando}/>
                    <Pagination.Last disabled={carregando}/>
                </Pagination>
            </Container>
        </Navbar>
    </Container>
}

export default ProdutosListagem
