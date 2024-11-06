'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {


  const faculdades = JSON.parse(localStorage.getItem("Tamanho")) || []
  const cursos = JSON.parse(localStorage.getItem("Cor")) || []
  const professores = JSON.parse(localStorage.getItem("Tipo de Corte")) || []
  const disciplinas = JSON.parse(localStorage.getItem("Material")) || []
  const alunos = JSON.parse(localStorage.getItem("Estilo")) || []

  const lista = [
    {
      nome: "DOIDINHA",
      imagem: "https://i.pinimg.com/736x/f9/5a/f8/f95af8037722f02b8eb1f4547d760c62.jpg", quantidade: faculdades.length,
      link: "/faculdades"
    },
    {
      nome: "GATOES",
      imagem: "https://thegraphicsfairy.com/wp-content/uploads/2023/08/Halloween-Cat-Candle-NV-GraphicsFairy.jpg", quantidade: cursos.length,
      link: "/cursos"
    },
    {
      nome: "CORTESS",
      imagem: "https://i.pinimg.com/736x/39/09/fb/3909fb65bbab271bb5a9ddbf85c80d00.jpg", quantidade: professores.length,
      link: "/professores"
    },
    {
      nome: "Disciplinas",
      imagem: "https://i.pinimg.com/236x/79/0f/fc/790ffceeb183a1059b77c5558342ffc0.jpg", quantidade: disciplinas.length,
      link: "/disciplinas"
    },
    {
      nome: "Alunos",
      imagem: "https://i.pinimg.com/564x/b7/5f/18/b75f18a5c6949c9ae45a09f2e12755f3.jpg", quantidade: alunos.length,
      link: "/alunos"
    },
  ]



  return (
    <Pagina titulo={"Cores & Formas"}>   
      <Row md={4}>
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
