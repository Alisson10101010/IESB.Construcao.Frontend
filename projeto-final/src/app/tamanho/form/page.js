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

  // Lista de categorias (Área)
  const listaAreas = [
    "Manga Longa",
    "Manga Curta",
    "Calça",
    "Jaqueta",
    "Vestido",
    "Saia",
    "Bermuda",
    "Blusa"
  ]

  // Lista de faixas etárias
  const listaFaixaEtaria = [
    "Infantil",
    "Adulto",
    "Sênior"
  ]

  // Campos do form e valores iniciais (default)
  const initialValues = {
    nome: '',
    descricao: '',
    area: '',
    faixaEtaria: '',
    tipoTecido: '',
    cor: '',
    estoque: '',
    status: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    area: Yup.string().required("Campo obrigatório"),
    faixaEtaria: Yup.string().required("Campo obrigatório"),
    tipoTecido: Yup.string().required("Campo obrigatório"),
    cor: Yup.string().required("Campo obrigatório"),
    estoque: Yup.number().min(1, "Estoque deve ser maior que 0").required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório")
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
                  <Form.Label>Área (Categoria):</Form.Label>
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
                  <Form.Label>Faixa Etária:</Form.Label>
                  <Form.Select
                    name='faixaEtaria'
                    value={values.faixaEtaria}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.faixaEtaria && !errors.faixaEtaria}
                    isInvalid={touched.faixaEtaria && errors.faixaEtaria}
                  >
                    <option value=''>Selecione</option>
                    {listaFaixaEtaria.map(faixa => <option key={faixa} value={faixa}>{faixa}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.faixaEtaria}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Tipo de Tecido:</Form.Label>
                  <Form.Control
                    name='tipoTecido'
                    type='text'
                    value={values.tipoTecido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tipoTecido && !errors.tipoTecido}
                    isInvalid={touched.tipoTecido && errors.tipoTecido}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.tipoTecido}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Cor:</Form.Label>
                  <Form.Control
                    name='cor'
                    type='text'
                    value={values.cor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cor && !errors.cor}
                    isInvalid={touched.cor && errors.cor}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.cor}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Estoque:</Form.Label>
                  <Form.Control
                    name='estoque'
                    type='number'
                    min={1}
                    value={values.estoque}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.estoque && !errors.estoque}
                    isInvalid={touched.estoque && errors.estoque}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.estoque}</Form.Control.Feedback>
                </Form.Group>

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
              </Row>

              {/* Botões */}
              <Form.Group className='text-end'>
                <Button className='me-2' href='/tamanhos'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>

    </Pagina>
  )
}
