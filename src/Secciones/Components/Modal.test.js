import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Modal from './Modal';

test('Render Modal', () => {
    const mensajeModal = 'Hola modal';
    const component = render( <Modal mensajeModal={mensajeModal}/> );
    component.getByText('Hola modal');

})
