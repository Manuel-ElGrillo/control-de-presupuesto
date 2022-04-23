import React from 'react'

const MensajeValidacion = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>

        {children}

    </div>
  )
}

export default MensajeValidacion