import React from 'react'
import { formatearFecha } from '../helpers'
import IconoAhorro from "../img/icono_ahorro.svg"
import IconoCasa from "../img/icono_casa.svg"
import IconoComida from "../img/icono_comida.svg"
import IconoGastos from "../img/icono_gastos.svg"
import IconoOcio from "../img/icono_ocio.svg"
import IconoSalud from "../img/icono_salud.svg"
import IconoSuscripciones from "../img/icono_suscripciones.svg"
// Dependencia para el efecto Swipe de los gastos
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"

const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
}


const Gasto = ({gasto, setEditarGasto, eliminarGasto}) => {

    // Funciones para editar o eliminar el gasto con la dependencia del Swipeable List

    const leadingActions = () => {
        return (
            <LeadingActions>
                <SwipeAction onClick={() => setEditarGasto(gasto)}>
                    Editar
                </SwipeAction>
            </LeadingActions>
        )
    }

    const trailingActions = () => {
        return (
            <TrailingActions>
                <SwipeAction onClick={() => eliminarGasto(gasto.id)}
                             destructive={true}>
                    Eliminar
                </SwipeAction>
            </TrailingActions>
        )
    }

  return (
      <SwipeableList>
          <SwipeableListItem leadingActions={leadingActions()}
                             trailingActions={trailingActions()}>

          <div className='gasto sombra'>

              <div className="contenido-gasto">

                  <img src={diccionarioIconos[gasto.categoriaGasto]}
                      alt="Icono gasto" />

                  <div className="descripcion-gasto">

                      <p className="categoria">
                          {gasto.categoriaGasto}
                      </p>

                      <p className="nombre-gasto">
                          {gasto.nombreGasto}
                      </p>

                      <p className="fecha-gasto">
                          Agregado el:
                          <span> {formatearFecha(gasto.fecha)}</span> {/* Función traído de la carpeta helpers */}
                      </p>

                  </div>

              </div>


              <p className="cantidad-gasto">${gasto.cantidadGasto}</p>

          </div>
          </SwipeableListItem>
      </SwipeableList>
  )
}

export default Gasto