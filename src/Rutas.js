import { Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import  Index  from './Rutas/Index';
import Inversiones from './Rutas/Inversiones';
import Lujos from './Rutas/Lujos';
import Gastos from './Rutas/Gastos';
const Rutas = ()=>{
    return (
        <Routes>
            <Route
                exact path="/"
                element={<Index/>}
            />
            <Route
                exact path="/inversiones"
                element={<Inversiones/>}
            />
            <Route
                exact path="/lujos"
                element={<Lujos/>}
            />
            <Route
                exact path="/gastos"
                element={<Gastos/>}
            />
        </Routes>
    )
}
export default Rutas;