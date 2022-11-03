import { useEffect, useState } from "react";
import Header from "../Secciones/Components/Header";
import './Styles/GlobalPage.css';
import './Styles/Index.css';

const Index = ()=>{
    const [ingresoQuincenal, setIngresoQuincenal] = useState(''); //Local Storage
    const [promedioDiarioLibre, setPromedioDiarioLibre] = useState(0);
    const [cantidadTotalLibre, setCantidadTotalLibre] = useState(0);
    useEffect(()=>{
        if (ingresoQuincenal>15) {
            setPromedioDiarioLibre(Math.round(ingresoQuincenal/15))
            setCantidadTotalLibre(Math.round(ingresoQuincenal))
        }
    },[ingresoQuincenal])
    return (
        <div className="Page">
            <Header title={'Control Quincenal'}/>
            <div className="seccionIndex" title="El ingreso quincenal es la cantidad recibida en cada quincena.">
                <div className="cantidad">
                    $ {Math.round(ingresoQuincenal)}
                </div>
                <div className="input">
                    <input placeholder="Cantidad" type={'number'} value={ingresoQuincenal} onChange={(e)=>setIngresoQuincenal(e.target.value)}/>
                </div>
                <div className="mensaje">Ingreso neto quincenal</div>
            </div>
            <div className="seccionIndex" title="El promedio diario libre es la cantidad que puedes gastar diariamente.">
                <div className="cantidad">
                    $ {promedioDiarioLibre}
                </div>
                <div className="mensaje">Promedio diario libre</div>
            </div>
            <div className="seccionIndex" title="La cantidad total libre es la cantidad total que queda después de restar las inversiones, gastos y lujos.">
                <div className="cantidad">
                    $ {cantidadTotalLibre}
                </div>
                <div className="mensaje">Cantidad total libre</div>
            </div>
        </div>
    )
}
export default Index;