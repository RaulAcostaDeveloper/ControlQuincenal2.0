import '../Styles/Header.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuDesplegable from './MenuDesplegable';
const Header = ({title})=>{
    const [esIndex, setEsIndex] = useState(false);
    const [esInversiones, setEsInversiones] = useState(false);
    const [esGastos, setEsGastos] = useState(false);
    const [esLujos, setEsLujos] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
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
    return (
        <header className="Header">
            <button className='botonMenu' onClick={()=>{setOpenMenu(true)}}>
                <img src='./menu.png' alt='Botón Menú'/>
            </button>
            <div className='titulo'>
                <Link className='link' to={'/'}>{title}</Link>
            </div>
            <div className='secciones' >
                <div title='Ir al inicio' className='el' style={ (esIndex)? {backgroundColor: "rgb(221, 232, 241)"}: {backgroundColor: "rgb(240, 248, 255)"}}>
                    <Link className='link' to={'/'}>Inicio</Link>
                </div>
                <div title='Ir a las inversiones' className='el' style={ (esInversiones)? {backgroundColor: "rgb(221, 232, 241)"}: {backgroundColor: "rgb(240, 248, 255)"}}>
                    <Link className='link' to={'/inversiones'}>Inversiones</Link>
                </div>
                <div title='Ir a los gastos' className='el' style={ (esGastos)? {backgroundColor: "rgb(221, 232, 241)"}: {backgroundColor: "rgb(240, 248, 255)"}}>
                    <Link className='link' to={'/gastos'}>Gastos</Link>
                </div>
                <div title='Ir a los lujos' className='el' style={ (esLujos)? {backgroundColor: "rgb(221, 232, 241)"}: {backgroundColor: "rgb(240, 248, 255)"}}>
                    <Link className='link' to={'/lujos'}>Lujos</Link>
                </div>
            </div>
            {openMenu&&
                <MenuDesplegable setOpenMenu={setOpenMenu}/>
            }
        </header>
    )
}
export default Header;