import React from 'react'
import { useState, useEffect } from 'react'
import MensajeValidacion from './MensajeValidacion'
import iconoCerrar from "./../img/cerrar.svg"

const Modal = ({setModal, animacionModal, setAnimacionModal, guardarGasto, editarGasto, setEditarGasto}) => {

    // State de los gastos

    const [nombreGasto, setNombreGasto] = useState("")
    const [cantidadGasto, setCantidadGasto] = useState(0)
    const [categoriaGasto, setCategoriaGasto] = useState("")

    const [mensajeValidacion, setMensajeValidacion] = useState("")

    const [id, setId] = useState("")
    const [fecha, setFecha] = useState("")

    // Pasando los datos de los gastos a editar

    useEffect( () => {
      if ( Object.keys(editarGasto).length > 0 ) {
        setNombreGasto(editarGasto.nombreGasto)
        setCantidadGasto(editarGasto.cantidadGasto)
        setCategoriaGasto(editarGasto.categoriaGasto)
        setId(editarGasto.id)
        setFecha(editarGasto.fecha)
      }
    }, [])

    const ocultarModal = () => {

      setAnimacionModal(false)

      setEditarGasto({})
      
      setTimeout( () => {
          setModal(false)
      }, 300)

    }

    // Validando el formulario del Modal

    const handleGastos = (event) => {

      event.preventDefault()

      if( [nombreGasto, cantidadGasto, categoriaGasto].includes("") ) {
        setMensajeValidacion("Todos los campos son requeridos")

        setTimeout( () => {
          setMensajeValidacion("")
        }, 2000)

        return
      }

      // Guardando el gasto registrado en objeto 

      guardarGasto({nombreGasto, cantidadGasto, categoriaGasto, id, fecha})

    }

  return (
    <div className="modal">

        <div className="cerrar-modal">
            <img src={iconoCerrar} alt="Icono cerrar" onClick={ocultarModal}/>
        </div>

        <form className={`formulario ${animacionModal ? "animar" : "cerrar"}` } onSubmit={handleGastos}>

          <legend>{editarGasto.nombreGasto ? "Editar gasto" : "Nuevo Gasto"}</legend>

          {mensajeValidacion && 
            <MensajeValidacion tipo={"error"}>
              {mensajeValidacion}
            </MensajeValidacion>
          }

          <div className="campo">

            <label htmlFor="nombre">{"Nombre del gasto"}</label>
            <input type="text" 
                   placeholder='Añade el nombre del gasto' 
                   id='nombre' 
                   value={nombreGasto}
                   onChange={ event => setNombreGasto( event.target.value )}/>

          </div>

          <div className="campo">

            <label htmlFor="cantidad">Cantidad</label>
            <input type="number" 
                   placeholder='Añade la cantidad' 
                   id='cantidad' 
                   value={cantidadGasto}
                   onChange={ event => setCantidadGasto( Number(event.target.value)) }/>

          </div>
          <div className="campo">

            <label htmlFor="categoria">Categoría</label>
            
            <select id="categoria"
                    value={categoriaGasto}
                    onChange={ event => setCategoriaGasto( event.target.value )}>
              <option value="">-- Seleccione --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos Varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>
            </select>

          </div>

          <input type="submit"  value={editarGasto.nombreGasto ? "Guardar cambios" : "Añadir Gasto"} />

        </form>

    </div>
  )
}

export default Modal