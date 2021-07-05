import { Auth0Provider } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.css';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);
console.log(window.location.origin);

ReactDOM.render(
    <Provider store={store}>
        <Auth0Provider
        domain="dev-r7fmessb.eu.auth0.com"
        clientId="sxpa9h7p3UnlhP2aIttZHlLVr41rU0RR"
        redirectUri={window.location.origin+"/admin"}
        >
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Auth0Provider>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
