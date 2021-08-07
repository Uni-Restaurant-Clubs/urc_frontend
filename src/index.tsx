import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import authReducer from "./redux/reducers/authReducer";
import reducers from "./redux/reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const ourStore = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ourStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ngrok authtoken 2NMvMfcwPSgKimzdqvyzm_7BdrvBTmG9CrWhSJKmANv
// ngrok http --region=us --hostname=urc-frontend.ngrok.io 3000

// https://urc.ngrok.io

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.7.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>
