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

function renderAtActiveCondition(count) {
  if(count > 1000){
    console.log("서비스 워크가 활성화 되지 않습니다.");
    renderReactDom();
    return;
  }
  navigator.serviceWorker.getRegistrations().then(registrations => {
    const isActive = registrations[0].active;
    if(isActive === null){
      console.log("Service worker is not activating");
      window.setTimeout(renderAtActiveCondition(count+1), 1000); 
    }else {
      renderReactDom();
    }
  });
}

if('serviceWorker' in navigator){
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js')
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      renderAtActiveCondition(0);
    } catch(err) {
      console.log('ServiceWorker registration failed: ', err);
      renderReactDom();
    }
  });
}else{
  console.log("서비스워커를 지원하지 않습니다.")
  renderReactDom();
}



