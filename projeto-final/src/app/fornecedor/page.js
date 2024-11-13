'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FornecedorPage() {

  const [fornecedores, setFornecedores] = useState([])

  // usada no componente, renderizar uma tabela ou lista de fornecedores.
  useEffect(() => {

    const fornecedoresLocalStorage = JSON.parse(localStorage.getItem("fornecedores")) || []

    setFornecedores(fornecedoresLocalStorage)
    console.log(fornecedoresLocalStorage)
  }, [])

  // exclusão 
  function excluir(fornecedor) {

    if (window.confirm(`Deseja realmente excluir o fornecedor ${fornecedor.nome}?`)) {

      const novaLista = fornecedores.filter(item => item.id !== fornecedor.id)

      localStorage.setItem('fornecedores', JSON.stringify(novaLista))
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
                  <Button className='me-2' href={`/fornecedor/form?id=${fornecedor.id}`}><FaPen /></Button>
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
