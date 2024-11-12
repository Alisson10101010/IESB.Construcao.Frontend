'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FuncionarioPage() {

  const [funcionarios, setFuncionarios] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const funcionariosLocalStorage = JSON.parse(localStorage.getItem("funcionarios")) || []
    // guarda a lista no estado funcionarios
    setFuncionarios(funcionariosLocalStorage)
    console.log(funcionariosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(funcionario) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o funcionário ${funcionario.nome}?`)) {
      // filtra a lista antiga removendo o funcionário recebido
      const novaLista = funcionarios.filter(item => item.id !== funcionario.id)
      // grava no localStorage a nova lista
      localStorage.setItem('funcionarios', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setFuncionarios(novaLista)
      alert("Funcionário excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Cadastro de Funcionários"}>
      <div className='text-end mb-2'>
        <Button href='/funcionarios/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Funcionários */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Cargo</th>
            <th>Faixa Etária</th>
            <th>Tipo de Contrato</th>
            <th>Salário</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => {
            return (
              <tr key={funcionario.id}>
                <td>{funcionario.nome}</td>
                <td>{funcionario.descricao}</td>
                <td>{funcionario.cargo}</td>
                <td>{funcionario.faixaEtaria}</td>
                <td>{funcionario.tipoContrato}</td>
                <td>{funcionario.salario}</td>
                <td>{funcionario.status}</td>

                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/funcionarios/form?id=${funcionario.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(funcionario)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
