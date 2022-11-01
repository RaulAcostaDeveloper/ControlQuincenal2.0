import { useState } from 'react';
import '../Styles/Modal.css';
const Modal = ({setMostrarModal, mensajeModal})=>{
    const [closing, setClosing] = useState(false);
    const handleClose = ()=>{
        setClosing(true);
        setTimeout(() => {
            setMostrarModal(false)
        }, 300);
    }
    let openAnimationStyle = {
        animationName:"openModal",
        animationDuration:"500ms",
        animationFillMode:"initial",
    };
    let closeAnimationStyle = {
        animationName:"closeModal",
        animationDuration:"500ms",
        animationFillMode:"initial",
    };
    return (
        <div className="modal">
            <div className="exterior" onClick={()=>{handleClose()}}>

            </div>
            <div className="interior" style={closing? closeAnimationStyle:openAnimationStyle}>
                {mensajeModal}
            </div>
        </div>
    )
}
export default Modal;