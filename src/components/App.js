import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Home from './Home';
import Header from './Header';
import VideoDetail from './VideoDetail';
import SearchResult from './SearchResult';
import SingUp from './SignUp';
import Login from './Login';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import firebase from '../firebase';

const App = ({ signIn, signOut }) => {
  useEffect(() => {
    firebase.isInitialized()
      .then(user => {
        if(user){
          signIn();
        }else{
          signOut();
        }
      })
  }, []);
  return (
    <div>
       <Router history={history}>
         <Header/>
              <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/video/:id" exact component={VideoDetail}/>
                  <Route path="/signup" exact component={SingUp}/>
                  <Route path="/login" exact component={Login}/>
                  <Route path="/search/:word" exact component={SearchResult}/>
              </Switch>
        </Router>
    </div>
  );
}

export default connect(null, { signIn, signOut })(App);
