import { useEffect, useState } from 'react';
import '../Styles/Formulario.css';
const Formulario =({setMostrarForm, mensaje, handleSend, titleEditar})=>{
    const [closing, setClosing] = useState(false);

    const [titulo, setTitulo] = useState('');
    const [cantidad, setCantidad] = useState('');

    useEffect(()=>{
        if (titleEditar) {
            setTitulo(titleEditar);
        }
    },[titleEditar])
    const handleClose = ()=>{
        setClosing(true);
        setTimeout(() => {
            setMostrarForm(false)
        }, 300);
    }
    let openAnimationStyle = {
        animationName:"openForm",
        animationDuration:"500ms",
        animationFillMode:"initial",
    };
    let closeAnimationStyle = {
        animationName:"closeForm",
        animationDuration:"500ms",
        animationFillMode:"initial",
    };
    return (
        <div className="formulario">
            <div className="exterior" onClick={()=>{handleClose()}}>
            </div>
            <div className="interior" style={closing? closeAnimationStyle:openAnimationStyle}>
                <p>{mensaje}</p>
                <input placeholder='Titulo' type={'text'} value={titulo} onChange={(e)=>setTitulo(e.target.value)}/>
                <input placeholder='Cantidad' type={'number'} value={cantidad} onChange={(e)=>setCantidad(e.target.value)}/>
                <button onClick={()=>handleSend({titulo, cantidad})}>AÑADIR</button>
            </div>
        </div>
    )
}
export default Formulario;