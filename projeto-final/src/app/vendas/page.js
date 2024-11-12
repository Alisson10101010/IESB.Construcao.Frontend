'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function VendasPage() {

  const [vendas, setVendas] = useState([])

  // Interação quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage
    const vendasLocalStorage = JSON.parse(localStorage.getItem("vendas")) || []
    
    setVendas(vendasLocalStorage)
    console.log(vendasLocalStorage)
  }, [])

  
  function excluir(venda) {
    
    if (window.confirm(`Deseja realmente excluir a venda do pedido ${venda.numeroPedido}?`)) {
      
      const novaLista = vendas.filter(v => v.id !== venda.id)
      
      localStorage.setItem('vendas', JSON.stringify(novaLista))
    
      setVendas(novaLista)
      alert("Venda excluída com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Cadastro de Vendas"}>
      <div className='text-end mb-2'>
        <Button href='/vendas/form'><FaPlusCircle /> Nova Venda</Button>
      </div>

      {/* Tabela com as Vendas */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Data da Venda</th>
            <th>Número do Pedido</th>
            <th>Cliente</th>
            <th>Produto(s)</th>
            <th>Valor Total</th>
            <th>Forma de Pagamento</th>
            <th>Desconto</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map(venda => {
            return (
              <tr key={venda.id}>
                <td>{venda.dataVenda}</td>
                <td>{venda.numeroPedido}</td>
                <td>{venda.cliente}</td>
                <td>{venda.produto}</td>
                <td>{venda.valorTotal}</td>
                <td>{venda.formaPagamento}</td>
                <td>{venda.desconto}%</td>
                <td>{venda.status}</td>

                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/vendas/form?id=${venda.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(venda)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
