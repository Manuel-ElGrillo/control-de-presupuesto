import React from 'react'
import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar" //Dependencia para la barra circular traída de npmjs.com
import "react-circular-progressbar/dist/styles.css"

const ControlDePresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setPresupuestoValido}) => {

    const [presupuestoDisponible, setPresupuestoDisponible] = useState(0)
    const [presupuestoGastado, setPresupuestoGastado] = useState(0)

    const [porcentajeProgreso, setPorcentajeProgreso] = useState(0)

    // Calculando el presupuesto gastado y disponible

    useEffect( () => {
        const totalGastado = gastos.reduce( (total, gasto) => {
            return gasto.cantidadGasto + total
        }, 0 )

        const totalDisponible = presupuesto - totalGastado

        // Calculando el porcentaje para la barra de progreso
        const porcentaje = ((( presupuesto - totalDisponible ) / presupuesto) * 100).toFixed(2)

        setPresupuestoDisponible(totalDisponible)
        setPresupuestoGastado(totalGastado)
        setPorcentajeProgreso(porcentaje)

    }, [gastos])

    const formatearValorPresupuesto = (presupuesto) => {
        return presupuesto.toLocaleString("en-US", {
               style: "currency",
               currency: "USD",
        })
    }

    // Función para resetear

    const resetearApp = () => {
       setGastos([])
       setPresupuesto(0)
       setPresupuestoValido(false)
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

        <div>
            <CircularProgressbar value={porcentajeProgreso}
                                 styles={buildStyles({
                                     pathColor: porcentajeProgreso > 100 ? "#dc2626" : "#3b82f6",
                                     textColor: porcentajeProgreso > 100 ? "#dc2626" : "#3b82f6"
                                 })}
                                 text={`${porcentajeProgreso}% Gastado`}/>
        </div>

        <div className="contenido-presupuesto">

            <button className='reset-app' 
                    type='button'
                    onClick={resetearApp}>
                Resetear Presupuesto
            </button>

            <p>
                <span>Presupuesto: </span> { formatearValorPresupuesto(presupuesto) }
            </p>

            <p className={`${presupuestoDisponible}` < 0 ? "negativo" : ""}>
                <span>Disponible: </span> { formatearValorPresupuesto(presupuestoDisponible) }
            </p>

            <p>
                <span>Gastado: </span> { formatearValorPresupuesto(presupuestoGastado) }
            </p>
        </div>

    </div>
  )
}

export default ControlDePresupuesto