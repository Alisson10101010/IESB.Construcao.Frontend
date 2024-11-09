'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {


  const clientes = JSON.parse(localStorage.getItem("clientes")) || []
  const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || []
  const estoque = JSON.parse(localStorage.getItem("estoque")) || []
  const vendas = JSON.parse(localStorage.getItem("vendas")) || []
  const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || []

  const lista = [
    {
      nome: "Meus Clientes.",
      imagem: "https://i.pinimg.com/736x/a6/93/72/a693723992ecf8e1921a1414a1458508.jpg", quantidade: clientes.length,
      link: "/clientes"
    },
    {
      nome: "Meus Funcionarios.",
      imagem: "https://i.pinimg.com/564x/58/13/1e/58131e617f2433a97d39342295899680.jpg", quantidade: funcionarios.length,
      link: "/funcionarios"
    },
    {
      nome: "Novidades!⭐",
      imagem: "https://i.pinimg.com/736x/67/55/ae/6755ae151df69ba919341f6a1279a826.jpg", quantidade: estoque.length,
      link: "/estoque"
    },
    {
      nome: "Estilo de Moda",
      imagem: "https://i.pinimg.com/736x/93/da/d6/93dad681ac78a9f0062fb35c6d9a4b90.jpg", quantidade: vendas.length,
      link: "/vendas"
    },
    {
      nome: "Fornecedores",
      imagem: "https://i.pinimg.com/564x/f1/22/4b/f1224b81d7b7793c09b11b69fcdd5473.jpg", quantidade: fornecedores.length,
      link: "/fornecedor"
    },
  ]



  return (
    <Pagina titulo={"Morena Rosa"}>   
      <Row md={5}>
        {lista.map(item => (
          <Col className='py-2'>
            <Card style={{height: '100%'}}>
              <Card.Img src={item.imagem} style={{ height: '100%' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}

      </Row>
    </Pagina>
  )
}
