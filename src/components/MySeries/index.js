import React, { useEffect } from 'react';
import { fetchMySeries, signIn, deleteMySereis, signOut } from '../../actions';
import { connect } from 'react-redux';
import VideoList from '../VideoList';
import firebase from '../../firebase';
const MySeries = ({ history, isSignedIn, mySeries, fetchMySeries }) => {
  useEffect(() => {
    if(mySeries.length == 0){
      firebase.isInitialized()
        .then(user => {
          if(user){
            signIn();
          }else{
            alert("로그인 후 이용해주세요");
            history.push('/');
            signOut();
          }
        })
      }
  }, []);

  if(mySeries.length === 0){
    return(
      <div className="text-center mt-4">
        <h2>
          시리즈를 추가하고 이용해주세요.
        </h2>
      </div>
    )
  }else{
    return(
      <div>
        <VideoList
          videos={mySeries}
          objectType="mySeries"
        />
      </div>
    )
  }

}

const mapStateProps = (state) => {
  return { 
    isSignedIn: state.auth.isSignedIn,
    mySeries: Object.values(state.videos.mySeries)
  
  };
}


export default connect(mapStateProps, { fetchMySeries })(MySeries);