import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-image-gallery/styles/css/image-gallery.css";
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))    
);

function activeConditionRender() {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    const res = registrations[0].active;
    if(res === null){
      window.setTimeout(activeConditionRender(), 2000); /* this checks the flag every 100 milliseconds*/
    }else {
      /* do something*/
      ReactDOM.render(
        <Provider store={store}>  
            <App />
        </Provider>, 
        document.getElementById('root')
      );
    }
  });
}

// if('serviceWorker' in navigator){
//   window.addEventListener('load', async () => {
//     try {
//       let registration = await navigator.serviceWorker.register('/service-worker.js')
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       activeConditionRender();
//     } catch(err) {
//       console.log('ServiceWorker registration failed: ', err);
//     }
//   });
// }



ReactDOM.render(
  <Provider store={store}>  
      <App />
  </Provider>, 
  document.getElementById('root')
);
