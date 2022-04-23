// Función para generar IDs random para un array

export const generarID = () => {
    const randomNumber = Math.random(36).toString().substring(2)
    const date = Date.now.toString(36)
    return randomNumber + date
}

// Función para formatear fechas

export const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha)
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    }

    return nuevaFecha.toLocaleDateString("es-ES", opciones)
}