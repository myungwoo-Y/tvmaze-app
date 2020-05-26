import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
}

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
        this.db = app.firestore();
	}

	login(email, password) {
        const res = this.auth.signInWithEmailAndPassword(email, password);
        console.log(this.auth.currentUser);
	}

	logout() {
		return this.auth.signOut();
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password);
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
    }
    
    async getAllSeries(){
        const series = [];
        await this.db.collection('users_series').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    series.push(doc.data().series);
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

          console.log(series);
          return series;
    }

	addSeries(seriesId, series) {
		if(!this.auth.currentUser) {
			return alert('Not authorized');
        }
        
       this.getAllSeries();
		return this.db.doc(`users_series/${seriesId}`).set({
			series
		});
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve);
		})
    }
    
    getCurrentUser() {
        return this.auth.currentUser;
    }

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName;
    }
    
    hasCurrentUser(){
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('user is logged');
            }
        });
        console.log(this.auth.currentUser);
        return this.auth.currentUser !== null;
    }

	async getCurrentUserQuote() {
		const series = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get();
		return series.get('quote');
	}
}

export default new Firebase();