import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))    
);

const renderReactDom = () => {
  ReactDOM.render(
    <Provider store={store}>  
        <App />
    </Provider>, 
    document.getElementById('root')
  );
}


let intervalId = null;
let count = 0;
const intervalTime = 500;
const maxCount = (1000 / intervalTime) * 60;
const activeCheckInterval = () => {
  count++;
  if(count > maxCount){
    renderReactDom();
  }else{
    navigator.serviceWorker.getRegistrations().then(registrations => {
      const isActive = registrations[0].active;
      console.log(isActive)
      if(isActive !== null){
        renderReactDom();
        clearInterval(intervalId);
      }
    });
  }
};

if('serviceWorker' in navigator){
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js')
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      intervalId = setInterval(activeCheckInterval, intervalTime);
    } catch(err) {
      console.log('ServiceWorker registration failed: ', err);
      renderReactDom();
    }
  });
  console.log("render")
}else{
  console.log("서비스워커를 지원하지 않습니다.")
  renderReactDom();
}



