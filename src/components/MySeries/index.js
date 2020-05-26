import React, { useEffect } from 'react';
import firebase from '../../firebase';

const MySeries = ({ history }) => {
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

}

export default MySeries;