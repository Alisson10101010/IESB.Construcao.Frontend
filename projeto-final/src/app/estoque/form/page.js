'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function EstoqueFormPage(props) {

  const router = useRouter()

  // Buscar a lista de itens no estoque no localStorage, se não existir, inicializa uma lista vazia
  const estoque = JSON.parse(localStorage.getItem('estoque')) || []

  // Recuperando id para edição
  const id = props.searchParams.id

  // Buscar na lista o item com o ID recebido no parametro
  const itemEditado = estoque.find(item => item.id == id)

  // Função para salvar os dados do form
  function salvar(dados) {
    if (itemEditado) {
      Object.assign(itemEditado, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('estoque', JSON.stringify(estoque))
    } else {
      dados.id = v4()
      estoque.push(dados)
      localStorage.setItem('estoque', JSON.stringify(estoque))
    }

    alert("Item do estoque salvo com sucesso!")
    router.push("/estoque")
  }

  // Lista de tipos de roupas
  const listaTipos = [
    "Camisa", "Blusa", "Saia", "Vestido", "Calça", "Jaqueta", "Sapato", "Bermuda", "Jaqueta"
  ]

  // Lista de faixas etárias
  const listaFaixaEtaria = [
    "Infantil", "Adulto", "Sênior"
  ]

  // Campos do form e valores iniciais (default)
  const initialValues = {
    nome: '',
    descricao: '',
    tipo: '',
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
    tipo: Yup.string().required("Campo obrigatório"),
    faixaEtaria: Yup.string().required("Campo obrigatório"),
    tipoTecido: Yup.string().required("Campo obrigatório"),
    cor: Yup.string().required("Campo obrigatório"),
    estoque: Yup.number().min(1, "Estoque deve ser maior que 0").required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Item no Estoque"}>

      {/* Formulário */}
      <Formik
        initialValues={itemEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              {/* Campos do form */}
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Nome do Produto:</Form.Label>
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
                  <Form.Label>Descrição do Produto:</Form.Label>
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
                  <Form.Label>Tipo de Produto:</Form.Label>
                  <Form.Select
                    name='tipo'
                    value={values.tipo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tipo && !errors.tipo}
                    isInvalid={touched.tipo && errors.tipo}
                  >
                    <option value=''>Selecione</option>
                    {listaTipos.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.tipo}</Form.Control.Feedback>
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
                  <Form.Label>Estoque Disponível:</Form.Label>
                  <Form.Control
                    name='estoque'
                    type='number'
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
                    <option value="Disponível">Disponível</option>
                    <option value="Indisponível">Indisponível</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Botões */}
              <Form.Group className='text-end'>
                <Button className='me-2' href='/estoque'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>

    </Pagina>
  )
}
