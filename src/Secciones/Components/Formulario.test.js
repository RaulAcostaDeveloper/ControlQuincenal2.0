import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Formulario from './Formulario';

test('Render Formulario', () => {
    const mensaje = 'Mi formulario';
    const component = render( <Formulario mensaje={mensaje}/> );
    component.getByText('Mi formulario');

})
