import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListaGastos from "./components/ListaGastos";
import Filtros from "./components/Filtros";
import { generarID } from "./helpers";
import iconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {

  const [presupuesto, setPresupuesto] = useState(
    // Obteniendo el presupuesto del Local Storage si ya se guardó uno
    Number(localStorage.getItem("presupuesto")) ?? 0
    );

  const [presupuestoValido, setPresupuestoValido] = useState(false)

  const [modal, setModal] = useState(false)

  const [animacionModal, setAnimacionModal] = useState(false)

  const [gastos, setGastos] = useState(
    // Obteniendo los gastos del Local Storage, si no existe un arreglo de gastos el state estará como un arreglo vacío
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  )

  const [filtro, setFiltro] = useState("")

  const [gastosFiltrados, setGastosFiltrados] = useState([])

  const [editarGasto, setEditarGasto] = useState({})

  // Mostrando el modal con la información ya completada para editar

  useEffect( () => {
    if (Object.keys(editarGasto).length > 0) {
      
      setModal(true)

      setTimeout( () => {
        setAnimacionModal(true)
      }, 300)
    }

  }, [editarGasto])

  // Guardando el presupuesto en Local Storage

  useEffect( () => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  }, [presupuesto])

  useEffect( () => {
    const presupuestoDesdeLocalStorage = Number(localStorage.getItem("presupuesto")) ?? 0

    // Para no tener que volver a mostrar la ventana para pedir el presupuesto
    if ( presupuestoDesdeLocalStorage > 0) {
      setPresupuestoValido(true)
    }
  }, [])

  // Guardando los gastos en el Local Storage

  useEffect( () => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
  }, [gastos])

  const handleNuevoGasto = () => {
    setModal(true)

    setEditarGasto({})

    setTimeout( () => {
      setAnimacionModal(true)
    }, 300)
  }

  // Guardando el gasto agregado en el componente Modal

  const guardarGasto = gasto => { //gasto será el objeto que va a recibir del componente Modal

    if(gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map( stateGasto => stateGasto.id === gasto.id ? gasto : stateGasto)
      setGastos(gastosActualizados)
      setEditarGasto({})
    } else {
      // Nuevo gasto
      gasto.id = generarID() //Función traída de la carpeta Helpers para generar un ID único
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setAnimacionModal(false)

    setTimeout( () => {
      setModal(false)
    }, 300) 
    
  }

  // Eliminando el gasto agregado

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id )
    setGastos(gastosActualizados)
  }

  // Filtrando los gastos por categoría

  useEffect( () => {
    if (filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoriaGasto === filtro )
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  return (
    <>
      <div className={modal ? "fijar" : ""}>

      <Header presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              presupuestoValido={presupuestoValido}
              setPresupuestoValido={setPresupuestoValido}
              gastos={gastos}
              setGastos={setGastos}/>

      {
        presupuestoValido && (
          <>
            <main>
              <Filtros filtro={filtro}
                       setFiltro={setFiltro}/>

              <ListaGastos gastos={gastos}
                           setEditarGasto={setEditarGasto}
                           eliminarGasto={eliminarGasto}
                           gastosFiltrados={gastosFiltrados}
                           filtro={filtro}/>
            </main>

            <div className="nuevo-gasto">
              <img src={iconoNuevoGasto} alt="Icono nuevo gasto" onClick={handleNuevoGasto}/>
            </div>
          </>
        ) 
      }

      {modal && <Modal setModal={setModal} 
                       animacionModal={animacionModal}
                       setAnimacionModal={setAnimacionModal}
                       guardarGasto={guardarGasto}
                       editarGasto={editarGasto}
                       setEditarGasto={setEditarGasto}/>}

      </div>
    </>
  );
}

export default App;
