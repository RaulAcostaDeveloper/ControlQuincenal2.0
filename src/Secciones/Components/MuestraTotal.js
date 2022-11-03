import { useEffect, useState } from "react";
import '../Styles/MuestraTotal.css';
const MuestraTotal = ({elementos, mensaje, setTotalExt})=>{
    const [total, setTotal] = useState(0);
    useEffect(()=>{
        if (elementos.length>0) {
            let totalTemp = 0;
            for (let index = 0; index < elementos.length; index++) {
                totalTemp = Number(totalTemp) + Number(elementos[index].cantidad);
            }
            setTotal(totalTemp);
        } else{
            setTotal(0);
        }
    },[elementos]);
    setTotalExt(total);
    return (
        <div className="muestraTotal">
            <div className="mensaje">{mensaje}</div>
            <div className="total">$ {total}</div>
        </div>
    )
}
export default MuestraTotal;