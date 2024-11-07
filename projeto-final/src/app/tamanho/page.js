'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function TamanhoPage() {

  const [tamanhos, setTamanhos] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const tamanhosLocalStorage = JSON.parse(localStorage.getItem("tamanhos")) || []
    // guarda a lista no estado tamanhos
    setTamanhos(tamanhosLocalStorage)
    console.log(tamanhosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(tamanho) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o tamanho ${tamanho.nome}?`)) {
      // filtra a lista antiga removendo o tamanho recebido
      const novaLista = tamanhos.filter(item => item.id !== tamanho.id)
      // grava no localStorage a nova lista
      localStorage.setItem('tamanhos', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setTamanhos(novaLista)
      alert("Tamanho excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Tamanhos"}>
      <div className='text-end mb-2'>
        <Button href='/tamanho/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Tamanhos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categorias</th>
            <th>Faixa Etária</th>
            <th>Tipo de Tecido</th>
            <th>Cor</th>
            <th>Estoque</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tamanhos.map(tamanho => {
            return (
              <tr key={tamanho.id}>
                <td>{tamanho.nome}</td>
                <td>{tamanho.descricao}</td>
                <td>{tamanho.area}</td>
                <td>{tamanho.faixaEtaria}</td>
                <td>{tamanho.tipoTecido}</td>
                <td>{tamanho.cor}</td>
                <td>{tamanho.estoque}</td>
                <td>{tamanho.status}</td>

                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/tamanho/form?id=${tamanho.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(tamanho)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
