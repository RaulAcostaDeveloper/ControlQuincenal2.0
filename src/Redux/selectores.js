export const selectInversiones = state => {
    const { inversiones } = state;
    return inversiones;
}
export const selectGastos = state => {
    const { gastos } = state;
    return gastos;
}
export const selectLujos = state => {
    const { lujos } = state;
    return lujos;
}