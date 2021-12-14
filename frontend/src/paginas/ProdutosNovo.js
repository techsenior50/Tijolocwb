import React, {useEffect, useState} from 'react'
import TijoloApi from '../components/TijoloApi.js'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {NavLink} from 'react-router-dom'
import classNames from 'classnames'
import Collapse from 'react-bootstrap/Collapse'
import {criarOnChange} from '../util.js'
import CurrencyInput from 'react-currency-input-field'

const ProdutosNovo = () => {
    const [carregando, setCarregando] = useState(true)
    const [mensagemErro, setMensagemErro] = useState(false)
    const [erros, setErros] = useState([])
    const [validated, setValidated] = useState(false)

    /*
    {
        "categoria": "Frutos do Mar",
        "nome": "Ceviche de Salmão",
        "descricao": "Ceviche de Salmão com o tradicional Leite de Tigre",
        "preco": 123.45,
        "ativo": true,
        "imagem": "https://amora.love/fotos/foto-0001.jpg"
    }
     */
    const [produtoNome, setProdutoNome] = useState("")
    const [produtoCategoria, setProdutoCategoria] = useState("")
    const [produtoDescricao, setProdutoDescricao] = useState("")
    const [produtoPreco, setProdutoPreco] = useState("0.00")
    const [produtoAtivo, setProdutoAtivo] = useState(true)
    const [produtoImagem, setProdutoImagem] = useState("")

    const produto = () => {
        return {
            nome: produtoNome,
            categoria: produtoCategoria,
            descricao: produtoDescricao,
            preco: Number.parseFloat(produtoPreco),
            ativo: produtoAtivo,
            imagem: produtoImagem
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const form = evt.currentTarget;

        if (form.checkValidity() === false) {
            evt.stopPropagation();
        }

        setValidated(true);
    }

    return <Container>
        <Alert show={mensagemErro} className="mt-3" variant="danger" onClose={() => setMensagemErro(false)} dismissible>
            <Alert.Heading>Erro!</Alert.Heading>
            <p className="mb-0">Erro ao carregar lista de Produtos. Por favor, aguarde alguns instantes e tente
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
                    <Form.Control type="text" required autofocus aria-required={true} autoCapitalize={true}
                                  placeholder="Nome do Produto"
                                  value={produtoNome}
                                  onChange={criarOnChange(setProdutoNome)} />
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
                    <Form.Control type="text" required aria-required={true} autoCapitalize={true}
                                  placeholder="Categoria"
                                  value={produtoCategoria}
                                  onChange={criarOnChange(setProdutoCategoria)} />
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
                    <Form.Control as="textarea" required aria-required={true} autoCapitalize={true}
                                  placeholder="Descrição do Produto"
                                  value={produtoDescricao}
                                  onChange={criarOnChange(setProdutoDescricao)} />
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
                                   intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                                   allowNegativeValue={false}
                                   onValueChange={(value) => setProdutoPreco(value.replace(/,/g, "."))}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor, preencha este campo.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>



            <Form.Group as={Row}>
                <Col sm={{span: 10, offset: 2}}>
                    <Button type="submit">Criar Produto</Button>
                    <Button type="button" variant="secondary" size="sm" className="ms-2">Cancelar</Button>
                </Col>
            </Form.Group>

            <Row>
                <Col sm={{span: 10, offset: 2}} className="mt-2">
                    <hr/>
                    Produtos Cadastrados: abc
                </Col>
            </Row>
            {/*
            if (emBranco(produto.categoria)) {
            errosValidacao.push({campo: 'categoria', erro: 'Categoria não pode ficar em branco'})
        }

        if (emBranco(produto.nome)) {
            errosValidacao.push({campo: 'nome', erro: 'Nome não pode ficar em branco'})
        }

        if (emBranco(produto.descricao)) {
            errosValidacao.push({campo: 'descricao', erro: 'Descrição não pode ficar em branco'})
        }

        if (ehNumero(produto.preco)) {
            const preco = produto.preco
            if (preco <= 0) {
                errosValidacao.push({campo: 'preco', erro: `Preço não pode ser menor ou igual a ${formatarMoeda(0)}`})
            }
            else if (preco >= 100000) {
                errosValidacao.push(
                    {campo: 'preco', erro: `Preço não pode ser maior ou igual a ${formatarMoeda(100000)}`})
            }
        }
        else {
            errosValidacao.push({campo: 'preco', erro: 'Preço deve ser um número'})
        }

        if (emBranco(produto.imagem)) {
            errosValidacao.push({campo: 'imagem', erro: 'Imagem não pode ficar em branco'})
        }
        else if (!urlValida(produto.imagem)) {
            errosValidacao.push({campo: 'imagem', erro: 'Imagem deve ser um endereço de uma imagem'})
        }
            */}
        </Form>

        Produto = {JSON.stringify(produto())}
    </Container>
}

export default ProdutosNovo
