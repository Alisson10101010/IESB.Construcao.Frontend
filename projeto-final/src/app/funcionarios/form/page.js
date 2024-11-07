'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function FuncionarioFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  // Buscar a lista de funcionários no localStorage, se não existir, inicializa uma lista vazia
  const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  // Buscar na lista o funcionário com o ID recebido no parametro
  const funcionarioEditado = funcionarios.find(item => item.id == id)
  console.log(funcionarioEditado)

  // Função para salvar os dados do form
  function salvar(dados) {
    // Se funcionarioEditado existe, mudar os dados e gravar no localStorage
    if (funcionarioEditado) {
      Object.assign(funcionarioEditado, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    } else {
      // Se funcionarioEditado não existe, é criação de um novo
      // Gerar um ID (Identificador único)
      dados.id = v4()
      // Adiciona o novo funcionário na lista de funcionários
      funcionarios.push(dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    }

    alert("Funcionário salvo com sucesso!")
    router.push("/funcionarios")
  }

  // Lista de cargos
  const listaCargos = [
    "Gerente",
    "Assistente",
    "Vendedor",
    "Estagiário",
    "Supervisor",
    "Coordenador",
    "Atendente"
  ]

  // Lista de faixas etárias
  const listaFaixaEtaria = [
    "Jovem",
    "Adulto",
    "Sênior"
  ]

  // Campos do form e valores iniciais (default)
  const initialValues = {
    nome: '',
    descricao: '',
    cargo: '',
    faixaEtaria: '',
    tipoContrato: '',
    salario: '',
    status: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    cargo: Yup.string().required("Campo obrigatório"),
    faixaEtaria: Yup.string().required("Campo obrigatório"),
    tipoContrato: Yup.string().required("Campo obrigatório"),
    salario: Yup.number().min(1, "Salário deve ser maior que 0").required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Funcionário"}>

      {/* Formulário */}

      <Formik
        initialValues={funcionarioEditado || initialValues}
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
                  <Form.Label>Cargo:</Form.Label>
                  <Form.Select
                    name='cargo'
                    value={values.cargo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cargo && !errors.cargo}
                    isInvalid={touched.cargo && errors.cargo}
                  >
                    <option value=''>Selecione</option>
                    {listaCargos.map(cargo => <option key={cargo} value={cargo}>{cargo}</option>)}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.cargo}</Form.Control.Feedback>
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
                  <Form.Label>Tipo de Contrato:</Form.Label>
                  <Form.Control
                    name='tipoContrato'
                    type='text'
                    value={values.tipoContrato}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tipoContrato && !errors.tipoContrato}
                    isInvalid={touched.tipoContrato && errors.tipoContrato}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.tipoContrato}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Salário:</Form.Label>
                  <Form.Control
                    name='salario'
                    type='number'
                    min={1}
                    value={values.salario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.salario && !errors.salario}
                    isInvalid={touched.salario && errors.salario}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.salario}</Form.Control.Feedback>
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
              </Row>

              {/* Botões */}
              <Form.Group className='text-end'>
                <Button className='me-2' href='/funcionarios'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>

    </Pagina>
  )
}
