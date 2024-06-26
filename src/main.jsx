// import React from "react";
// //import ReactDOM from "react-dom/client";
// //import LandingPage from "./components/LandingPage";
// import App from "./App";
// import "./index.css";
//  //import { createRoot } from 'react-dom/client';
// import { renderToString } from 'react-dom/server';

// import store from "./redux/store";
// import {Provider} from 'react-redux';
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

// const container = document.getElementById('root');
// let persistor = persistStore(store);

// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(
// <Provider store = {store}>
//    <PersistGate persistor={persistor}>
//       <App />
//    </PersistGate>
// </Provider>
// );


import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store";

const container = document.getElementById('root');
let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  container
);
