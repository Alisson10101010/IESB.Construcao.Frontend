'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { ReactInputMask } from 'react-input-mask'
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function FornecedorFormPage(props) {

  // para navegação de telas
  const router = useRouter()

  const fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || []
  const id = props.searchParams.id
  console.log(props.searchParams.id)

  const fornecedorEditado = fornecedores.find(item => item.id == id)
  console.log(fornecedorEditado)

  function salvar(dados) {

    if (fornecedorEditado) {
      Object.assign(fornecedorEditado, dados)

      localStorage.setItem('fornecedores', JSON.stringify(fornecedores))
    } else {

      dados.id = v4()
      fornecedores.push(dados)
      localStorage.setItem('fornecedores', JSON.stringify(fornecedores))
    }

    alert("Fornecedor salvo com sucesso!")
    router.push("/fornecedor")
  }

  const initialValues = {
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    produtosFornecidos: '',
    condicoesPagamento: '',
    status: '',
  }

  // preenchidos corretamente com dados válidos
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cnpj: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    produtosFornecidos: Yup.string().required("Campo obrigatório"),
    condicoesPagamento: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Fornecedor"}>

      {/* Formulário */}

      <Formik
        initialValues={fornecedorEditado || initialValues}
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
                  <Form.Label>CNPJ:</Form.Label>
                  <Form.Control as={ReactInputMask}
                    name='cnpj'
                    type='text'
                    mask={'99.999.999/9999-99'}
                    placeholder='99.999.999/9999-99'
                    maxLength={14}
                    value={values.cnpj}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cnpj && !errors.cnpj}
                    isInvalid={touched.cnpj && errors.cnpj}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.cnpj}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Endereço:</Form.Label>
                  <Form.Control
                    name='endereco'
                    type='text'
                    value={values.endereco}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.endereco && !errors.endereco}
                    isInvalid={touched.endereco && errors.endereco}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.endereco}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Telefone:</Form.Label>
                  <Form.Control as={ReactInputMask}
                    name='telefone'
                    type='text'
                    mask={'(99)99999-9999'}
                    placeholder='(99)99999-9999'
                    value={values.telefone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.telefone && !errors.telefone}
                    isInvalid={touched.telefone && errors.telefone}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>E-mail:</Form.Label>
                  <Form.Control
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Produtos Fornecidos:</Form.Label>
                  <Form.Control
                    name='produtosFornecidos'
                    type='text'
                    value={values.produtosFornecidos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.produtosFornecidos && !errors.produtosFornecidos}
                    isInvalid={touched.produtosFornecidos && errors.produtosFornecidos}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.produtosFornecidos}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Condições de Pagamento:</Form.Label>
                  <Form.Control
                    name='condicoesPagamento'
                    type='text'
                    value={values.condicoesPagamento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.condicoesPagamento && !errors.condicoesPagamento}
                    isInvalid={touched.condicoesPagamento && errors.condicoesPagamento}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.condicoesPagamento}</Form.Control.Feedback>
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

              <Form.Group className='text-end'>
                <Button className='me-2' href='/fornecedor'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>

    </Pagina>
  )
}
