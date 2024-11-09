'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function EstoquePage() {

  const [estoque, setEstoque] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const estoqueLocalStorage = JSON.parse(localStorage.getItem("estoque")) || []
    // guarda a lista no estado estoque
    setEstoque(estoqueLocalStorage)
    console.log(estoqueLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(item) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o item ${item.nome}?`)) {
      // filtra a lista antiga removendo o item recebido
      const novaLista = estoque.filter(it => it.id !== item.id)
      // grava no localStorage a nova lista
      localStorage.setItem('estoque', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setEstoque(novaLista)
      alert("Item do estoque excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Cadastro de Itens no Estoque"}>
      <div className='text-end mb-2'>
        <Button href='/estoque/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Itens do Estoque */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Faixa Etária</th>
            <th>Tipo de Tecido</th>
            <th>Cor</th>
            <th>Estoque</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.descricao}</td>
                <td>{item.tipo}</td>
                <td>{item.faixaEtaria}</td>
                <td>{item.tipoTecido}</td>
                <td>{item.cor}</td>
                <td>{item.estoque}</td>
                <td>{item.status}</td>

                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/estoque/form?id=${item.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(item)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
