import { useState } from "react";
import './Styles/GlobalPage.css';
import Header from "../Secciones/Components/Header";
import BotonAniadir from "../Secciones/Components/BotonAniadir";
import Formulario from "../Secciones/Components/Formulario";
import ElementoLista from "../Secciones/Components/ElementoLista";
import Modal from "../Secciones/Components/Modal";
import OpenModal from "../Secciones/Components/OpenModal";
import MuestraTotal from "../Secciones/Components/MuestraTotal";
const Inversiones = ()=>{
    const [mostrarFormAniadir, setMostrarFormAniadir] = useState(false);
    const [mostrarFormEditar, setMostrarFormEditar] = useState(false);
    const [keyElementoEditar, setKeyElementoEditar] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState('');
    const [elementos, setElementos] = useState([]);
    const [contadorElementos, setContadorElementos] = useState(0);
    const cumpleValidaciones = (data) => {
        // Validaciones
        if (data.titulo.length<=0) {
            setMostrarModal(true);
            setMensajeModal('Escribe el nombre');
            return false;
        }
        if (data.titulo.length>45 ) {
            setMostrarModal(true);
            setMensajeModal('Escribe un nombre mas corto');
            return false;
        }
        if (typeof(Number(data.cantidad)) != 'number') {
            setMostrarModal(true);
            setMensajeModal('La cantidad debe ser un número');
            return false;
        }
        if (Number(data.cantidad) <= 0) {
            setMostrarModal(true);
            setMensajeModal('La cantidad debe ser positiva');
            return false;
        }
        // Si cumple todo
        return true;
    }
    const handleNewElemento = (data)=>{
        if (cumpleValidaciones(data)) {
            setElementos(elementos.concat({
                title: data.titulo,
                cantidad: data.cantidad,
                key: contadorElementos,
            }));
            setContadorElementos(contadorElementos + 1);
            setMostrarFormAniadir(false);
        }
    }
    const handleDelete = (key)=>{
        console.log('handleDelete ', key);
        let nuevoArreglo = elementos.filter( el => el.key!==key);
        setElementos(nuevoArreglo);
    }
    const handleOpenEditar = (key)=>{
        console.log('handleOpenEditar ', key);
        setKeyElementoEditar(key);
        setMostrarFormEditar(true);
    }
    const handleEditar =(data)=>{
        if (cumpleValidaciones(data)) {
            let nuevaLista = elementos.map( el =>{
                if (el.key === keyElementoEditar) {
                    return {
                        title: data.titulo,
                        cantidad: data.cantidad,
                        key: keyElementoEditar,
                    }
                } else {
                    return el;
                }
            });
            setElementos(nuevaLista);
            setKeyElementoEditar('');
            setMostrarFormEditar(false);
        }
    }
    return (
        <div className="Page">
            <Header title={'Inversiones'}/>
            <BotonAniadir setMostrarForm={setMostrarFormAniadir}/>
            <OpenModal setMostrarModal={setMostrarModal} setMensajeModal={setMensajeModal}/>
            <MuestraTotal elementos={elementos} mensaje='Total de inversiones'/>
            {mostrarFormAniadir&&
                <Formulario handleSend={handleNewElemento} setMostrarForm={setMostrarFormAniadir} mensaje='Añadiendo una inversión'/>
            }
            {mostrarFormEditar&&
                <Formulario handleSend={handleEditar} setMostrarForm={setMostrarFormEditar} mensaje='Editando una inversión'/>
            }
            {mostrarModal&&
                <Modal mensajeModal={mensajeModal} setMostrarModal={setMostrarModal}/>
            }
            <div className="elementos">
                {elementos.map((el)=>
                    <div key={el.key}>
                        <ElementoLista 
                            id={el.key}
                            title={el.title} 
                            cantidad={el.cantidad}
                            handleDelete={handleDelete}
                            handleEditar={handleOpenEditar}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
export default Inversiones;