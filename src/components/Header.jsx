import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlDePresupuesto from './ControlDePresupuesto'

const Header = ({presupuesto, setPresupuesto, presupuestoValido, setPresupuestoValido, gastos, setGastos}) => {
  return (
    <>
    
        <header>

            <h1>Planificador de Gastos</h1>

            { presupuestoValido ? (
                <ControlDePresupuesto presupuesto={presupuesto}
                                      gastos={gastos}
                                      setGastos={setGastos}
                                      setPresupuesto={setPresupuesto}
                                      setPresupuestoValido={setPresupuestoValido}/>
            ) : (
                <NuevoPresupuesto presupuesto={presupuesto}
                                  setPresupuesto={setPresupuesto}
                                  setPresupuestoValido={setPresupuestoValido}/>
            )
            }

        </header>
    
    </>
  )
}

export default Header