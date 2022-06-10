import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import {NavLink} from 'react-router-dom'
import tijolo from '../imagens/tijolo.svg'

const Navegacao = () =>
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">
                <img src={tijolo} width={22} height={22} alt="Ícone do Tijolo" className="me-1"/>
                Tijolo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to="/" className="nav-link" activeClassName="active" exact>Início</NavLink>
                    <NavLink to="/produtos" className="nav-link" activeClassName="active">Produtos</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>

export default Navegacao
