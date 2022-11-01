import { useState } from 'react';
import '../Styles/ElementoLista.css';
const ElementoLista = ({id, title, cantidad, handleEditar, handleDelete})=>{
    const [closing, setClosing] = useState(false);
    let openAnimationStyle = {
        animationName:"createElemento",
        animationDuration:"500ms",
        animationFillMode:"initial",
    };
    let closeAnimationStyle = {
        animationName:"closeElemento",
        animationDuration:"500ms",
        animationFillMode:"initial",
    };
    const handleEliminar = ()=>{
        setClosing(true);
        setTimeout(() => {
            handleDelete(id)
        }, 300);
    }
    return (
        <div className="elementoLista">
            <div className='contenedor' style={closing? closeAnimationStyle:openAnimationStyle}>
                <div className="info">
                    <span className="titulo">
                        {title}
                    </span>
                    <span className="cantidad">
                        ${cantidad}
                    </span>
                </div>
                <div className="botones">
                    <button className='edit' onClick={()=>handleEditar(id)}><img alt='edit' src='./editar.png'/></button>
                    <button className='delete' onClick={()=>{handleEliminar()}}><img alt='delete' src='./delete.png'/></button>
                </div>
            </div>
        </div>
    )
}
export default ElementoLista;