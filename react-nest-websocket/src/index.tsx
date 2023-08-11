import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports'

import { store, persistor } from './app/store'
import Main from './Main';
import "./assets/styles/index.scss"
import {PersistGate} from "redux-persist/integration/react";
import { WebsocketProvider, socket } from './context/WebsocketContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebsocketProvider value={socket}>
          <Main />
        </WebsocketProvider>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);


