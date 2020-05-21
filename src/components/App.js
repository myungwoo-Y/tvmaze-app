import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Home from './Home';
import {Container} from 'react-bootstrap';
import Header from './Header';
import VideoDetail from './VideoDetail';
import SearchResult from './SearchResult';
const App = () => {
  return (
    <div>
       <Router history={history}>
         <Header/>
          <Container>
              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/video/:id" exact component={VideoDetail}/>
                  <Route path="/search/:word" exact component={SearchResult}/>
              </Switch>
          </Container> 
        </Router>
    </div>
  );
}

export default App;
