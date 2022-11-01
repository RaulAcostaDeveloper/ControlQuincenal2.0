import { useState, useEffect } from 'react';
import '../Styles/MenuDesplegable.css';
import { Link } from 'react-router-dom';

const MenuDesplegable =({setOpenMenu})=>{
    const [esIndex, setEsIndex] = useState(false);
    const [esInversiones, setEsInversiones] = useState(false);
    const [esGastos, setEsGastos] = useState(false);
    const [esLujos, setEsLujos] = useState(false);
    const [closing, setClosing] = useState(false);

    useEffect(()=>{
        switch (window.location.pathname) {
            case '/':
                setEsIndex(true);
                break;
            case '/inversiones':
                setEsInversiones(true);
                break;
            case '/gastos':
                setEsGastos(true);
                break;
            case '/lujos':
                setEsLujos(true);
                break;
            default:
                break;
        }
    },[])
    const handleClose = ()=>{
        setClosing(true);
        setTimeout(() => {
            setOpenMenu(false)
        }, 300);
    }
    // La animación está en MenuDesplegable.css
    let openAnimationStyle = {
        animationName:"openMenu",
        animationDuration:"500ms",
        animationFillMode:"initial",
    };
    let closeAnimationStyle = {
        animationName:"closeMenu",
        animationDuration:"500ms",
        animationFillMode:"initial",
    };
    return (
        <div className='MenuDesplegable' onClick={()=>{handleClose()}}>
            <div className='exterior'>
            </div>
            <div className='interior' style={closing? closeAnimationStyle:openAnimationStyle}>
                <div className='header'>
                    <span className='title'>Control Quincenal</span>
                    <span className='subtitle'>Desarrollada por Raúl Acosta</span>
                </div>
                <div className='enlaces' >
                    <div className='el' style={ (esIndex)? {backgroundColor: "rgb(221, 232, 241)"}: {backgroundColor: "rgb(240, 248, 255)"}}>
                        <Link className='link' to={'/'}>Inicio</Link>
                    </div>
                    <div className='el' style={ (esInversiones)? {backgroundColor: "rgb(221, 232, 241)"}: {backgroundColor: "rgb(240, 248, 255)"}}>
                        <Link className='link' to={'/inversiones'}>Inversiones</Link>
                    </div>
                    <div className='el' style={ (esGastos)? {backgroundColor: "rgb(221, 232, 241)"}: {backgroundColor: "rgb(240, 248, 255)"}}>
                        <Link className='link' to={'/gastos'}>Gastos</Link>
                    </div>
                    <div className='el' style={ (esLujos)? {backgroundColor: "rgb(221, 232, 241)"}: {backgroundColor: "rgb(240, 248, 255)"}}>
                        <Link className='link' to={'/lujos'}>Lujos</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MenuDesplegable;