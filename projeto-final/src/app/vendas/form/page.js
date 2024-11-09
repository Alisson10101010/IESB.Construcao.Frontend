'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function VendasFormPage(props) {

  const router = useRouter()

  // Buscar a lista de vendas no localStorage, se não existir, inicializa uma lista vazia
  const vendas = JSON.parse(localStorage.getItem('vendas')) || []

  // Recuperando id para edição
  const id = props.searchParams.id

  // Buscar na lista a venda com o ID recebido no parametro
  const vendaEditada = vendas.find(venda => venda.id == id)

  // Função para salvar os dados do form
  function salvar(dados) {
    if (vendaEditada) {
      Object.assign(vendaEditada, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('vendas', JSON.stringify(vendas))
    } else {
      dados.id = v4()
      vendas.push(dados)
      localStorage.setItem('vendas', JSON.stringify(vendas))
    }

    alert("Venda registrada com sucesso!")
    router.push("/vendas")
  }

  // Lista de clientes (para fins de exemplo, você pode carregar de um localStorage ou API)
  const listaClientes = [
    "João Silva", "Maria Oliveira", "Carlos Souza", "Ana Costa"
  ]

  // Lista de formas de pagamento
  const listaPagamentos = [
    "Dinheiro", "Cartão de Crédito", "Cartão de Débito", "Transferência Bancária"
  ]

  // Campos do form e valores iniciais (default)
  const initialValues = {
    dataVenda: '',
    numeroPedido: '',
    cliente: '',
    produto: '',
    valorTotal: '',
    formaPagamento: '',
    desconto: '',
    status: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    dataVenda: Yup.string().required("Campo obrigatório"),
    numeroPedido: Yup.string().required("Campo obrigatório"),
    cliente: Yup.string().required("Campo obrigatório"),
    produto: Yup.string().required("Campo obrigatório"),
    valorTotal: Yup.number().min(0, "Valor total não pode ser negativo").required("Campo obrigatório"),
    formaPagamento: Yup.string().required("Campo obrigatório"),
    desconto: Yup.number().min(0, "Desconto não pode ser negativo").max(100, "Desconto não pode ser maior que 100%"),
    status: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Venda"}>

      {/* Formulário */}
      <Formik
        initialValues={vendaEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              {/* Campos do form */}
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Data da Venda:</Form.Label>
                  <Form.Control
                    name='dataVenda'
                    type='date'
                    value={values.dataVenda}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataVenda && !errors.dataVenda}
                    isInvalid={touched.dataVenda && errors.dataVenda}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.dataVenda}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Número do Pedido:</Form.Label>
                  <Form.Control
                    name='numeroPedido'
                    type='text'
                    value={values.numeroPedido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.numeroPedido && !errors.numeroPedido}
                    isInvalid={touched.numeroPedido && errors.numeroPedido}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.numeroPedido}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Select
                    name='cliente'
                    value={values.cliente}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cliente && !errors.cliente}
                    isInvalid={touched.cliente && errors.cliente}
                  >
                    <option value=''>Selecione</option>
                    {listaClientes.map(cliente => <option key={cliente} value={cliente}>{cliente}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.cliente}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Produto(s):</Form.Label>
                  <Form.Control
                    name='produto'
                    type='text'
                    value={values.produto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.produto && !errors.produto}
                    isInvalid={touched.produto && errors.produto}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.produto}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Valor Total:</Form.Label>
                  <Form.Control
                    name='valorTotal'
                    type='number'
                    value={values.valorTotal}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.valorTotal && !errors.valorTotal}
                    isInvalid={touched.valorTotal && errors.valorTotal}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.valorTotal}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Forma de Pagamento:</Form.Label>
                  <Form.Select
                    name='formaPagamento'
                    value={values.formaPagamento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.formaPagamento && !errors.formaPagamento}
                    isInvalid={touched.formaPagamento && errors.formaPagamento}
                  >
                    <option value=''>Selecione</option>
                    {listaPagamentos.map(pagamento => <option key={pagamento} value={pagamento}>{pagamento}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.formaPagamento}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Desconto:</Form.Label>
                  <Form.Control
                    name='desconto'
                    type='number'
                    value={values.desconto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.desconto && !errors.desconto}
                    isInvalid={touched.desconto && errors.desconto}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.desconto}</Form.Control.Feedback>
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
                    <option value="Em Processamento">Em Processamento</option>
                    <option value="Pago">Pago</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Cancelado">Cancelado</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Botões */}
              <Form.Group className='text-end'>
                <Button className='me-2' href='/vendas'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>

    </Pagina>
  )
}
