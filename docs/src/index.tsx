import React, { ComponentType, StatelessComponent } from 'react';
import { render } from 'react-dom';

import App from './App';

const renderRoot = <P extends {}>(Component: ComponentType<P>) =>
    render(<Component />, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
    import('react-hot-loader').then(({ AppContainer }) => {
        const DevApp: StatelessComponent = () => (
            <AppContainer>
                <App />
            </AppContainer>
        );

        renderRoot(DevApp);
        module.hot && module.hot.accept('./App', () => renderRoot(DevApp));
    });
}

if (process.env.NODE_ENV === 'production') {
    renderRoot(App);
}
