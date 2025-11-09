import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { StoreProvider } from '../store/StoreProvider';

test('App mounts without crashing', () => {
    const { container } = render(
        <StoreProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StoreProvider>
    );

    expect(container).toBeTruthy();
});
