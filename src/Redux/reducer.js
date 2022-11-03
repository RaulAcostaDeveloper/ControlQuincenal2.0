import { combineReducers } from "redux";

let initialInversiones = 0;
if (JSON.parse(localStorage.getItem('totalInversiones-control-quincenal2.0-LocalStorage'))) {
  initialInversiones = JSON.parse(localStorage.getItem('totalInversiones-control-quincenal2.0-LocalStorage'))
}
let initialGastos = 0;
if (JSON.parse(localStorage.getItem('totalGastos-control-quincenal2.0-LocalStorage'))) {
  initialGastos = JSON.parse(localStorage.getItem('totalGastos-control-quincenal2.0-LocalStorage'))
}
let initialLujos = 0;
if (JSON.parse(localStorage.getItem('totalLujos-control-quincenal2.0-LocalStorage'))) {
  initialLujos = JSON.parse(localStorage.getItem('totalLujos-control-quincenal2.0-LocalStorage'))
}

export const inversionesReducer = (state = initialInversiones, action) =>{
    switch (action.type) {
      case 'totalInversiones/actualiza':
        return state = action.payload;
      default:
        return state;
    }
}
export const gastosReducer = (state = initialGastos, action) =>{
    switch (action.type) {
      case 'totalGastos/actualiza':
        return state = action.payload;
      default:
        return state;
    }
}
export const lujosReducer = (state = initialLujos, action) =>{
    switch (action.type) {
      case 'totalLujos/actualiza':
        return state = action.payload;
      default:
        return state;
    }
}
export const reducer = combineReducers({
    inversiones: inversionesReducer,
    gastos: gastosReducer,
    lujos: lujosReducer,

})
