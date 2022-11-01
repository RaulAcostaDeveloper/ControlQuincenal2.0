import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ElementoLista from './ElementoLista';

test('Render ElementoLista', () => {
    const props = {
        title: 'Elemento',
        cantidad: 4113,
    }
    const component = render( <ElementoLista title={props.title} cantidad={props.cantidad} /> );
    component.getByText('Elemento');
})
