'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ClientePage() {

  const [clientes, setClientes] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || []
    // guarda a lista no estado clientes
    setClientes(clientesLocalStorage)
    console.log(clientesLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(cliente) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`)) {
      // filtra a lista antiga removendo o cliente recebido
      const novaLista = clientes.filter(item => item.id !== cliente.id)
      // grava no localStorage a nova lista
      localStorage.setItem('clientes', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setClientes(novaLista)
      alert("Cliente excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Cadastro de clientes"}>
      <div className='text-end mb-2'>
        <Button href='/clientes/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Clientes */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Sexo</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Data de Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => {
            return (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.sexo}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.status}</td>
                <td>{cliente.datadenascimento}</td>

                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/clientes/form?id=${cliente.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(cliente)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
