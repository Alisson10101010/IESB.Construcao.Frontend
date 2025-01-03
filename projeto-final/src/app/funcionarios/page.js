'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FuncionarioPage() {

  const [funcionarios, setFuncionarios] = useState([])

  useEffect(() => {

    const funcionariosLocalStorage = JSON.parse(localStorage.getItem("funcionarios")) || []

    setFuncionarios(funcionariosLocalStorage)
    console.log(funcionariosLocalStorage)
  }, [])


  function excluir(funcionario) {
    if (window.confirm(`Deseja realmente excluir o funcionário ${funcionario.nome}?`)) {
      const novaLista = funcionarios.filter(item => item.id !== funcionario.id)
      localStorage.setItem('funcionarios', JSON.stringify(novaLista))
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
                <td>R$ {funcionario.salario}</td>
                <td>{funcionario.status}</td>

                <td className='text-center'>

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
