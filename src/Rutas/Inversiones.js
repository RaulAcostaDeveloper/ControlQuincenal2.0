import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import './Styles/GlobalPage.css';
import Header from "../Secciones/Components/Header";
import BotonAniadir from "../Secciones/Components/BotonAniadir";
import Formulario from "../Secciones/Components/Formulario";
import ElementoLista from "../Secciones/Components/ElementoLista";
import Modal from "../Secciones/Components/Modal";
import OpenModal from "../Secciones/Components/OpenModal";
import MuestraTotal from "../Secciones/Components/MuestraTotal";
const Inversiones = ()=>{
    const dispatch = useDispatch();
    const [mostrarFormAniadir, setMostrarFormAniadir] = useState(false);
    const [mostrarFormEditar, setMostrarFormEditar] = useState(false);
    const [keyElementoEditar, setKeyElementoEditar] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState('');
    const [elementos, setElementos] = useState([]); //Local Storage
    const [contadorElementos, setContadorElementos] = useState(0); //Local Storage
    const [totalInversiones, setTotalInversiones] = useState(0); //Redux
    const [titleEditar, setTitleEditar] = useState('');
    // localStorage.clear(); // <--------------------------------------------------------
    useEffect(()=>{
        let items = JSON.parse(localStorage.getItem('inversiones-control-quincenal2.0-LocalStorage'));
        if (items) {
            if (items.contadorElementos>0) {
                setElementos(items.elementos);
                setContadorElementos(items.contadorElementos);
            }
        }
    },[]);
    useEffect(()=>{
        if (elementos.length>0 && contadorElementos>0) { //Previene el primer render vacío
            localStorage.setItem('inversiones-control-quincenal2.0-LocalStorage', JSON.stringify({elementos, contadorElementos}));
        }
    },[elementos, contadorElementos]);
    useEffect(()=>{
        if (totalInversiones>0) {
            dispatch({ type: 'totalInversiones/actualiza', payload: totalInversiones });
            localStorage.setItem('totalInversiones-control-quincenal2.0-LocalStorage', JSON.stringify(totalInversiones));
        }
    },[totalInversiones]);
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
        let titulo;
        elementos.forEach(el => {
            if (el.key === key) {
                titulo = el.title;
            }
        });
        setTitleEditar(titulo);
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
            setTitleEditar('');
        }
    }
    return (
        <div className="Page">
            <Header title={'Inversiones'}/>
            <BotonAniadir setMostrarForm={setMostrarFormAniadir}/>
            <OpenModal setMostrarModal={setMostrarModal} setMensajeModal={setMensajeModal}/>
            <MuestraTotal elementos={elementos} mensaje='Total de inversiones' setTotalExt={setTotalInversiones} />
            {mostrarFormAniadir&&
                <Formulario handleSend={handleNewElemento} setMostrarForm={setMostrarFormAniadir} mensaje='Añadiendo una inversión'/>
            }
            {mostrarFormEditar&&
                <Formulario handleSend={handleEditar} titleEditar={titleEditar} setMostrarForm={setMostrarFormEditar} mensaje='Editando una inversión'/>
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