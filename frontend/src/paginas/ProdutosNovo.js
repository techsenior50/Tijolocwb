import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import CurrencyInput from 'react-currency-input-field'
import {criarOnChange, criarOnChangeCheck} from '../util.js'
import TijoloApi from '../components/TijoloApi.js'
import {Collapse} from 'react-bootstrap'

const ProdutosNovo = () => {
    const [carregando, setCarregando] = useState(false)
    const [mensagemErro, setMensagemErro] = useState(false)
    // const [erros, setErros] = useState([])
    const [validated, setValidated] = useState(false)
    const [cadastrarOutroProduto, setCadastrarOutroProduto] = useState(true)

    const [produtoNome, setProdutoNome] = useState('')
    const [produtoCategoria, setProdutoCategoria] = useState('')
    const [produtoDescricao, setProdutoDescricao] = useState('')
    const [produtoPreco, setProdutoPreco] = useState('0')
    const [produtoAtivo, setProdutoAtivo] = useState(true)
    const [produtoImagem, setProdutoImagem] = useState('')

    const [produtosCadastrados, setProdutosCadastrados] = useState([])

    const produto = () => {
        return {
            nome: produtoNome,
            categoria: produtoCategoria,
            descricao: produtoDescricao,
            preco: Number.parseFloat(produtoPreco.replace(/,/g, '.')),
            ativo: produtoAtivo,
            imagem: produtoImagem,
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()

        const form = evt.currentTarget

        if (form.checkValidity() === false) {
            evt.stopPropagation()
            setValidated(true)
        }
        else {
            setCarregando(true)

            TijoloApi.produtos.cadastrar(produto())
                     .then(res => {
                         if (res.status === 200) {
                             if (cadastrarOutroProduto) {
                                 setProdutosCadastrados(produtosCadastrados.concat(res.data))
                                 setProdutoNome('')
                                 setProdutoCategoria('')
                                 setProdutoDescricao('')
                                 setProdutoPreco('0')
                                 setProdutoAtivo(true)
                                 setProdutoImagem('')
                                 setValidated(false)
                             }
                             else {
                                 // Vai para tela de detalhes
                             }
                         }
                         else {
                             console.log('Produto cadastrado', res)
                         }
                     })
                     .catch(ex => {
                         console.error('Erro ao cadastrar produto', ex)
                         setMensagemErro(true)
                     })
                     .finally(() => {
                         setCarregando(false)
                     })
        }
    }

    return <Container>
        <Alert show={mensagemErro} className="mt-3" variant="danger" onClose={() => setMensagemErro(false)} dismissible>
            <Alert.Heading>Erro!</Alert.Heading>
            <p className="mb-0">Erro ao se comunicar com o Servidor. Por favor, aguarde alguns instantes e tente
                novamente.</p>
        </Alert>

        <Navbar bg="light" className="rounded-top mt-3">
            <Container>
                <Navbar.Brand>Novo Produto</Navbar.Brand>
                <Navbar.Text>Produtos</Navbar.Text>
            </Container>
        </Navbar>

        <Form className="my-4" noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="produtoNome">
                <Form.Label column sm="2">
                    Nome: *
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" required autoFocus aria-required={true} autoCapitalize="true"
                                  placeholder="Nome do Produto"
                                  value={produtoNome} disabled={carregando}
                                  onChange={criarOnChange(setProdutoNome)}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor, preencha este campo.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="produtoCategoria">
                <Form.Label column sm="2">
                    Categoria: *
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" required aria-required={true} autoCapitalize="true"
                                  placeholder="Categoria"
                                  value={produtoCategoria} disabled={carregando}
                                  onChange={criarOnChange(setProdutoCategoria)}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor, preencha este campo.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="produtoDescricao">
                <Form.Label column sm="2">
                    Descrição: *
                </Form.Label>
                <Col sm="10">
                    <Form.Control as="textarea" required aria-required={true} autoCapitalize="true"
                                  placeholder="Descrição do Produto"
                                  value={produtoDescricao} disabled={carregando}
                                  onChange={criarOnChange(setProdutoDescricao)}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor, preencha este campo.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="produtoPreco">
                <Form.Label column sm="2">
                    Preço: *
                </Form.Label>
                <Col sm="10">
                    <CurrencyInput id="produtoPreco" className="form-control" required aria-required
                                   placeholder="Preço do Produto"
                                   intlConfig={{locale: 'pt-BR', currency: 'BRL'}}
                                   value={produtoPreco}
                                   allowNegativeValue={false} disabled={carregando}
                                   onValueChange={value => setProdutoPreco(value)}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor, preencha este campo.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="produtoAtivo">
                <Form.Label column sm="2">
                    Ativo?
                </Form.Label>
                <Col sm="10">
                    <Form.Check type="checkbox" id="produtoAtivo" className="mt-2"
                                label="Exibir produto nas listagens e permitir venda do mesmo"
                                checked={produtoAtivo} disabled={carregando}
                                onChange={criarOnChangeCheck(setProdutoAtivo)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="produtoImagem">
                <Form.Label column sm="2">
                    Link da Imagem: *
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" required aria-required={true} autoCapitalize="true"
                                  placeholder="Link da Imagem"
                                  value={produtoImagem} disabled={carregando}
                                  onChange={criarOnChange(setProdutoImagem)}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor, preencha este campo.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>


            <Form.Group as={Row}>
                <Col sm={{span: 10, offset: 2}}>
                    <Button type="submit" disabled={carregando}>
                        {carregando ? <><Spinner animation="border" size="sm"/> Cadastrando...</> : <>Cadastrar
                            Produto</>}
                    </Button>
                    <Button type="button" variant="secondary" size="sm" className="ms-2"
                            disabled={carregando}>Cancelar</Button>
                    <Form.Check type="checkbox" id="cadastrarOutroProduto" className="mt-2"
                                label="Cadastrar outro produto em seguida"
                                checked={cadastrarOutroProduto} disabled={carregando}
                                onChange={criarOnChangeCheck(setCadastrarOutroProduto)}/>
                </Col>
            </Form.Group>
        </Form>

        <Collapse in={produtosCadastrados.length > 0}>
            <Row>
                <Col sm={{span: 10, offset: 2}} className="mt-2">
                    <hr/>
                    <h5>Produtos Cadastrados:</h5>

                    <ListGroup>
                        {produtosCadastrados.map(prod => {
                            return <ListGroup.Item className="d-flex justify-content-between align-items-start"
                                                   key={prod.id}>
                                <div className="ms-2 me-auto">
                                    <div className="fs-5"><a href={`/produto/${prod.id}`}
                                                             className="fw-bold">{prod.nome}</a> {prod.ativo ? '(Ativo)'
                                        : '(Inativo)'}</div>
                                    <span className="fs-6">{prod.categoria}</span>
                                </div>
                                <Badge variant="primary" pill>
                                    {prod.preco}
                                </Badge>
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </Collapse>
    </Container>
}

export default ProdutosNovo
