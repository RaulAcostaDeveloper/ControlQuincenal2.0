import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import './Styles/GlobalPage.css';
import Header from "../Secciones/Components/Header";
import BotonAniadir from "../Secciones/Components/BotonAniadir";
import Formulario from "../Secciones/Components/Formulario";
import ElementoLista from "../Secciones/Components/ElementoLista";
import Modal from "../Secciones/Components/Modal";
import OpenModal from "../Secciones/Components/OpenModal";
import MuestraTotal from "../Secciones/Components/MuestraTotal";
const Lujos = ()=>{
    const dispatch = useDispatch();
    const [mostrarFormAniadir, setMostrarFormAniadir] = useState(false);
    const [mostrarFormEditar, setMostrarFormEditar] = useState(false);
    const [keyElementoEditar, setKeyElementoEditar] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState('');
    const [elementos, setElementos] = useState([]); //Local Storage
    const [contadorElementos, setContadorElementos] = useState(0); //Local Storage
    const [totalLujos, setTotalLujos] = useState(0); //Redux
    const [titleEditar, setTitleEditar] = useState('');

    // localStorage.clear(); // <--------------------------------------------------------
    useEffect(()=>{
        let items = JSON.parse(localStorage.getItem('lujos-control-quincenal2.0-LocalStorage'));
        if (items) {
            if (items.contadorElementos>0) {
                setElementos(items.elementos);
                setContadorElementos(items.contadorElementos);
            }
        }
    },[]);
    useEffect(()=>{
        if (elementos.length>0 && contadorElementos>0) { //Previene el primer render vacío
            localStorage.setItem('lujos-control-quincenal2.0-LocalStorage', JSON.stringify({elementos, contadorElementos}));
        }
    },[elementos, contadorElementos]);
    useEffect(()=>{
        if (totalLujos>0) {
            dispatch({ type: 'totalLujos/actualiza', payload: totalLujos });
            localStorage.setItem('totalLujos-control-quincenal2.0-LocalStorage', JSON.stringify(totalLujos));

        }
    },[totalLujos])
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
        }
    }
    return (
        <div className="Page">
            <Header title={'Lujos'}/>
            <BotonAniadir setMostrarForm={setMostrarFormAniadir}/>
            <OpenModal setMostrarModal={setMostrarModal} setMensajeModal={setMensajeModal}/>
            <MuestraTotal elementos={elementos} mensaje='Total de lujos'  setTotalExt={setTotalLujos}/>
            {mostrarFormAniadir&&
                <Formulario handleSend={handleNewElemento} setMostrarForm={setMostrarFormAniadir} mensaje='Añadiendo un lujo'/>
            }
            {mostrarFormEditar&&
                <Formulario handleSend={handleEditar} titleEditar={titleEditar} setMostrarForm={setMostrarFormEditar} mensaje='Editando un lujo'/>
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
export default Lujos;