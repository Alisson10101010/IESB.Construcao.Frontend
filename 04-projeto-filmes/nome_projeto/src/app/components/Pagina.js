import React from 'react'
import BarraNavegacao from './BarraNavegacao'

export default function pagina (titulo, children) {

  return (

    <>

    <BarraNavegacao />


    <div className="bg-sec">

      <h1>{titulo}</h1> 

    </div>

    </>
  )
}
