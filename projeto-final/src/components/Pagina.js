'use client'

import { Container, Nav, Navbar } from "react-bootstrap"

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/tamanho">Tamanho</Nav.Link>
            <Nav.Link href="/Categorias">Categorias</Nav.Link>
            <Nav.Link href="/tipo de corte">Tipo de Corte</Nav.Link>
            <Nav.Link href="/Material">Material</Nav.Link>
            <Nav.Link href="/estilo">Estilo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Título - Cor de fundo vermelha clara */}
      <div className="text-center text-white py-2" style={{ backgroundColor: '#f8a1c4' }}>
        <h1>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}
