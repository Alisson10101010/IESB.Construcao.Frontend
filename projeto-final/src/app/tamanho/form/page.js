'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function TamanhoFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  // Busca a lista de faculdades para usar no select
  const faculdades = JSON.parse(localStorage.getItem('faculdades')) || []

  // Buscar a lista de tamanhos no localStorage, se não existir, inicializa uma lista vazia
  const tamanhos = JSON.parse(localStorage.getItem('tamanhos')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  // Buscar na lista o tamanho com o ID recebido no parametro
  const tamanhoEditado = tamanhos.find(item => item.id == id)
  console.log(tamanhoEditado)

  // função para salvar os dados do form
  function salvar(dados) {
    // Se tamanhoEditado existe, mudar os dados e gravar no localStorage
    if (tamanhoEditado) {
      Object.assign(tamanhoEditado, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('tamanhos', JSON.stringify(tamanhos))
    } else {
      // se tamanhoEditado não existe, é criação de um novo
      // gerar um ID (Identificador unico)
      dados.id = v4()
      // Adiciona o novo tamanho na lista de tamanhos
      tamanhos.push(dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('tamanhos', JSON.stringify(tamanhos))
    }

    alert("Tamanho salvo com sucesso!")
    router.push("/tamanhos")
  }

  // Lista de Áreas
  const listaAreas = [
    "Pequeno",
    "Médio",
    "Grande",
    "Extra Grande"
  ]

  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: '',
    descricao: '',
    area: '',
    duracao: '',
    status: '',
    faculdade: '',
    numModulos: '' // Novo campo
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    area: Yup.string().required("Campo obrigatório"),
    duracao: Yup.number().min(1, "Duração inválida").required("Campo obrigatório"),  // Validação para duração
    status: Yup.string().required("Campo obrigatório"),
    faculdade: Yup.string().required("Campo obrigatório"),
    numModulos: Yup.number().min(1, "Número de módulos inválido").required("Campo obrigatório")  // Validação para número de módulos
  })

  return (
    <Pagina titulo={"Cadastro de Tamanho"}>

      {/* Formulário */}

      <Formik
        initialValues={tamanhoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              {/* Campos do form */}
              <Row className='mb-2'>
                <Form.Group as={Col}>
                <Form.Label>Nome:</Form.Label>
                  <Form.Control
                    name='nome'
                    type='text'
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nome && !errors.nome}
                    isInvalid={touched.nome && errors.nome}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Descrição:</Form.Label>
                  <Form.Control
                    name='descricao'
                    type='text'
                    value={values.descricao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.descricao && !errors.descricao}
                    isInvalid={touched.descricao && errors.descricao}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.descricao}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Área:</Form.Label>
                  <Form.Select
                    name='area'
                    value={values.area}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.area && !errors.area}
                    isInvalid={touched.area && errors.area}
                  >
                    <option value=''>Selecione</option>
                    {listaAreas.map(area => <option key={area} value={area}>{area}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.area}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Duração (em meses):</Form.Label>
                  <Form.Control
                    name='duracao'
                    type='number'
                    min={1}
                    value={values.duracao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.duracao && !errors.duracao}
                    isInvalid={touched.duracao && errors.duracao}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.duracao}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Status:</Form.Label>
                  <Form.Select
                    name='status'
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.status && !errors.status}
                    isInvalid={touched.status && errors.status}
                  >
                    <option value=''>Selecione</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Faculdade:</Form.Label>
                  <Form.Select
                    name='faculdade'
                    value={values.faculdade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.faculdade && !errors.faculdade}
                    isInvalid={touched.faculdade && errors.faculdade}
                  >
                    {faculdades.map(faculdade => <option key={faculdade.id} value={faculdade.nome}>{faculdade.nome}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.faculdade}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Novo campo para número de módulos */}
              

              {/* Botões */}

              
                  
              <Form.Group className='text-end'>
                <Button className='me-2' href='/faculdades'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>

    </Pagina>
  )
}
