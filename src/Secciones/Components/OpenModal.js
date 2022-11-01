import '../Styles/BotonOpenModal.css';
const OpenModal = ({setMostrarModal, setMensajeModal})=>{
    return (
        <div className='openModal'>
            <button 
                onClick={()=>{
                    setMostrarModal(true); 
                    setMensajeModal('Hola soy un modal con animaciones')}
                }>
                Open Modal
            </button>
        </div>
    )
}
export default OpenModal;