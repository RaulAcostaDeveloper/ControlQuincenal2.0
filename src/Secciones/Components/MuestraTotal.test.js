import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import MuestraTotal from './MuestraTotal';

test('Render MuestraTotal', () => {
    const elementos = [
        {
            key:'2',
            title:'Mi elemento aosidnasd aosasdasAAi asooindunkiw',
            cantidad:150,
        },
        {
            key:'3',
            title:'Mi elemento',
            cantidad:151,
        },
    ]
    const component = render( <MuestraTotal elementos={elementos}/> );
    component.getByText('$ 301');

})
