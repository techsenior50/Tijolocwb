import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Spinner from 'react-bootstrap/Spinner'
import {useParams} from 'react-router-dom'
import TijoloApi from '../components/TijoloApi.js'

const ProdutosDetalhe = () => {
    const {id} = useParams()

    const [carregando, setCarregando] = useState(true)
    const [mensagemErro, setMensagemErro] = useState(false)

    const [produto, setProduto] = useState({})

    const carregarProduto = () => {
        setCarregando(true)

        TijoloApi.produtos.carregar(id)
                 .then(res => {
                     if (res.status === 200) {
                         setProduto(res.data)
                         setCarregando(false)
                     }
                     else {
                         setMensagemErro(true)
                     }
                 })
                 .catch(() => setMensagemErro(true))
    }

    useEffect(() => carregarProduto(), [])

    return <Container>
        <Alert show={mensagemErro} className="mt-3" variant="danger" onClose={() => setMensagemErro(false)} dismissible>
            <Alert.Heading>Erro!</Alert.Heading>
            <p className="mb-0">Erro ao carregar Produto do Servidor. Por favor, aguarde alguns instantes e tente
                novamente.</p>
        </Alert>

        <Navbar bg="light" className="rounded-top mt-3">
            <Container>
                <Navbar.Brand>Detalhe do Produto{carregando ? ': Carregando...' : ''}</Navbar.Brand>
                <Navbar.Text>Produtos</Navbar.Text>
            </Container>
        </Navbar>

        {carregando ?
            <Row>
                <Col className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </Spinner>
                </Col>
            </Row>
            :
            <>
                <Row>
                    <Col sm={2}>Nome:</Col>
                    <Col sm={10}>{produto.nome}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Categoria:</Col>
                    <Col sm={10}>{produto.categoria}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Categoria:</Col>
                    <Col sm={10}>{produto.categoria}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Descrição:</Col>
                    <Col sm={10}>{produto.descricao}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Preço:</Col>
                    <Col sm={10}>{produto.preco}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Ativo?</Col>
                    <Col sm={10}>{produto.ativo ? 'Sim' : 'Não'}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Imagem:</Col>
                    <Col sm={10}>
                        <div>Endereço: {produto.imagem}</div>
                        <div>Imagem: <img src={produto.imagem} width={200} alt="Imagem do Produto"/> </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={2}>Produto Cadastrado Em:</Col>
                    <Col sm={10}>{produto.dataCriacao}</Col>
                </Row>
                <Row>
                    <Col sm={2}>Última Alteração:</Col>
                    <Col sm={10}>{produto.dataUltimaAtualizacao}</Col>
                </Row>
            </>}
    </Container>
}

export default ProdutosDetalhe
