'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

// Função para verificar se o nome está no plural
function isPlural(nome) {
  return nome.trim().endsWith('s');
}

export default function ClienteFormPage(props) {
  const router = useRouter();
  const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  const id = props.searchParams.id;
  const clienteEditado = clientes.find(item => item.id == id);
  
  // Produto pode ser passado como uma propriedade, por exemplo
  const produto = "Clientes"; // Exemplo de produto no plural

  // Lógica para definir rótulos no plural ou singular
  const pluralOuSingular = isPlural(produto) ? 'clientes' : 'cliente';
  const pluralOuSingularCaps = pluralOuSingular.charAt(0).toUpperCase() + pluralOuSingular.slice(1);

  function salvar(dados) {
    if (clienteEditado) {
      Object.assign(clienteEditado, dados);
      localStorage.setItem('clientes', JSON.stringify(clientes));
    } else {
      dados.id = v4();
      clientes.push(dados);
      localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    alert("Cliente salvo com sucesso!");
    router.push("/clientes");
  }

  const initialValues = {
    nome: '',
    cpf: '',
    cargo: '',
    endereco: '',
    telefone: '',
    email: '',
    status: '',
    dataAdmissao: '',
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    cargo: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    dataAdmissao: Yup.date().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={`Cadastro de ${pluralOuSingularCaps}`}>
      <Formik
        initialValues={clienteEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {/* Campos do Formulário */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>{`Nome do ${pluralOuSingularCaps}:`}</Form.Label>
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
                <Form.Label>{`CPF do ${pluralOuSingularCaps}:`}</Form.Label>
                <Form.Control
                  name='cpf'
                  type='text'
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.cpf && !errors.cpf}
                  isInvalid={touched.cpf && errors.cpf}
                />
                <Form.Control.Feedback type='invalid'>{errors.cpf}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>{`Cargo do ${pluralOuSingularCaps}:`}</Form.Label>
                <Form.Control
                  name='cargo'
                  type='text'
                  value={values.cargo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.cargo && !errors.cargo}
                  isInvalid={touched.cargo && errors.cargo}
                />
                <Form.Control.Feedback type='invalid'>{errors.cargo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>{`Endereço do ${pluralOuSingularCaps}:`}</Form.Label>
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
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>{`Telefone do ${pluralOuSingularCaps}:`}</Form.Label>
                <Form.Control
                  name='telefone'
                  type='text'
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && errors.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>{`Email do ${pluralOuSingularCaps}:`}</Form.Label>
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
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>{`Status do ${pluralOuSingularCaps}:`}</Form.Label>
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
                <Form.Label>{`Data de Admissão do ${pluralOuSingularCaps}:`}</Form.Label>
                <Form.Control
                  name='dataAdmissao'
                  type='date'
                  value={values.dataAdmissao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dataAdmissao && !errors.dataAdmissao}
                  isInvalid={touched.dataAdmissao && errors.dataAdmissao}
                />
                <Form.Control.Feedback type='invalid'>{errors.dataAdmissao}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className='text-end'>
              <Button className='me-2' href='/clientes'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
