import '../Styles/BotonAniadir.css';
const BotonAniadir = ({setMostrarForm})=>{
    return (
        <div className='botonAniadir'>
            <button onClick={()=>setMostrarForm(true)}>AÑADIR</button>
        </div>
    )
}
export default BotonAniadir;