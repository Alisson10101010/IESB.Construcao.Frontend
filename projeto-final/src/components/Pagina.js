'use client'

import { Container, Nav, Navbar } from "react-bootstrap"

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
        <Container>
          <Navbar.Brand href="/" className="fw-bold text-light">
            Loja de Roupas
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/clientes" className="nav-link-custom">Clientes</Nav.Link>
              <Nav.Link href="/funcionarios" className="nav-link-custom">Funcionários</Nav.Link>
              <Nav.Link href="/estoque" className="nav-link-custom">Estoque</Nav.Link>
              <Nav.Link href="/vendas" className="nav-link-custom">Vendas</Nav.Link>
              <Nav.Link href="/fornecedor" className="nav-link-custom">Fornecedores</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Barra de Título - Cor de fundo vermelha clara */}
      <div className="text-center text-white py-3" style={{ backgroundColor: '#f8a1c4' }}>
        <h1>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className="mt-4">
        {children}
      </Container>

      <style jsx>{`
        .nav-link-custom {
          color: #ddd !important;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .nav-link-custom:hover {
          color: #fff !important;
          text-decoration: underline;
        }

        .navbar-toggler-icon {
          background-color: #fff;
        }

        .navbar-brand {
          font-size: 1.5rem;
          letter-spacing: 1px;
        }
      `}</style>
    </>
  )
}
