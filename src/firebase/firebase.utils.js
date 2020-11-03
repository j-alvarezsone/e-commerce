import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCgnQ2br5oT0ivD6yreZLZHV7UQgNETJhw',
  authDomain: 'crwn-db-7e422.firebaseapp.com',
  databaseURL: 'https://crwn-db-7e422.firebaseio.com',
  projectId: 'crwn-db-7e422',
  storageBucket: 'crwn-db-7e422.appspot.com',
  messagingSenderId: '462120137773',
  appId: '1:462120137773:web:cbc290c3daeca3d186b4a4',
  measurementId: 'G-W8QSNL292B',
};

firebase.initializeApp(config);

//* allows us to take that user off object that we got back from our authentication library and then store inside of our database.

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
