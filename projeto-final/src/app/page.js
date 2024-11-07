'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {


  const tamanho = JSON.parse(localStorage.getItem("Tamanho")) || []
  const categorias = JSON.parse(localStorage.getItem("categorias")) || []
  const TipodeRoupasPreferidas = JSON.parse(localStorage.getItem("Tipo de Roupas Preferidas")) || []
  const moda = JSON.parse(localStorage.getItem("moda")) || []
  const orcamento = JSON.parse(localStorage.getItem("orcamento")) || []

  const lista = [
    {
      nome: "Cadastre seu tamanho.",
      imagem: "https://i.pinimg.com/736x/a6/93/72/a693723992ecf8e1921a1414a1458508.jpg", quantidade: tamanho.length,
      link: "/tamanho"
    },
    {
      nome: "Qual seu estilo?",
      imagem: "https://i.pinimg.com/564x/58/13/1e/58131e617f2433a97d39342295899680.jpg", quantidade: categorias.length,
      link: "/Categorias"
    },
    {
      nome: "Novidades!⭐",
      imagem: "https://i.pinimg.com/736x/67/55/ae/6755ae151df69ba919341f6a1279a826.jpg", quantidade: TipodeRoupasPreferidas.length,
      link: "/Tipo de Roupas Preferidas"
    },
    {
      nome: "Estilo de Moda",
      imagem: "https://i.pinimg.com/564x/fb/d4/64/fbd4645a18cdaa247e94713fdb1c93e3.jpg", quantidade: moda.length,
      link: "/Estilo de Moda"
    },
    {
      nome: "Preferências de Preço / Orçamento",
      imagem: "https://i.pinimg.com/564x/f1/22/4b/f1224b81d7b7793c09b11b69fcdd5473.jpg", quantidade: orcamento.length,
      link: "/Preferências de Preço / Orçamento"
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
