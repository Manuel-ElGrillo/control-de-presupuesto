import React from 'react'
import Gasto from './Gasto'

const ListaGastos = ({gastos, setEditarGasto, eliminarGasto, gastosFiltrados, filtro}) => {
  return (
    <div className='listado-gastos contenedor'>

        {
          filtro ?  (
            <>
            <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoría"}</h2>

            {gastosFiltrados.map ( gasto => (
              <Gasto key={gasto.id}
                     gasto={gasto}
                     setEditarGasto={setEditarGasto}
                     eliminarGasto={eliminarGasto}/>
            ))}
            </>
          ) : (
            <>
            <h2>{gastos.length ? "Gastos" : "No hay gastos aún"}</h2>

            {gastos.map( gasto => (
              <Gasto key={gasto.id}
                     gasto={gasto}
                     setEditarGasto={setEditarGasto}
                     eliminarGasto={eliminarGasto}/>
          ))}
            </>
          )
        }

       
    </div>
  )
}

export default ListaGastos