'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FornecedorPage() {

  const [fornecedores, setFornecedores] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const fornecedoresLocalStorage = JSON.parse(localStorage.getItem("fornecedores")) || []
    // guarda a lista no estado fornecedores
    setFornecedores(fornecedoresLocalStorage)
    console.log(fornecedoresLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(fornecedor) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o fornecedor ${fornecedor.nome}?`)) {
      // filtra a lista antiga removendo o fornecedor recebido
      const novaLista = fornecedores.filter(item => item.id !== fornecedor.id)
      // grava no localStorage a nova lista
      localStorage.setItem('fornecedores', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setFornecedores(novaLista)
      alert("Fornecedor excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Cadastro de Fornecedores"}>
      <div className='text-end mb-2'>
        <Button href='/fornecedor/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Fornecedores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Produtos Fornecidos</th>
            <th>Condições de Pagamento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(fornecedor => {
            return (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.endereco}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.produtosFornecidos}</td>
                <td>{fornecedor.condicoesPagamento}</td>
                <td>{fornecedor.status}</td>

                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/fornecedores/form?id=${fornecedor.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(fornecedor)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
