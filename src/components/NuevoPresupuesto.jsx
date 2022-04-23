import React from 'react'
import { useState } from 'react'
import MensajeValidacion from './MensajeValidacion'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setPresupuestoValido}) => {

  const [mensajeValidacion, setMensajeValidacion] = useState("")

  // Validando el presupuesto

  const handlePresupuesto = (event) => {

    event.preventDefault()

    if( presupuesto <= 0 ){
      setMensajeValidacion("No es un presupuesto válido")
      return
    } 

    setMensajeValidacion("")

    setPresupuestoValido(true)

  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>

        <form className="formulario" onSubmit={handlePresupuesto}>

            <div className="campo">

                <label>Nuevo presupuesto</label>

                <input type="number" 
                       className='nuevo-presupuesto'
                       placeholder='Añade tu presupuesto'
                       value={presupuesto}
                       onChange={event => setPresupuesto(Number(event.target.value))}/>
                       {/* Conversión a números, los inputs son strings ☝🏻 */}
                       
                <input type="submit" 
                       value={"Añadir"}/>

            </div>

            {
              mensajeValidacion && 
              <MensajeValidacion tipo={"error"}>
                {mensajeValidacion}
              </MensajeValidacion>
            }

        </form>

    </div>
  )
}

export default NuevoPresupuesto