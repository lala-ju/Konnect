import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            if(e.code == 'auth/invalid-credential'){
              Alert.alert('You need to sign up first or you have the wrong password.');
            }
            console.log(e);
          }
        },
        googleLogin: async() =>{
          try{
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            await auth().signInWithCredential(googleCredential)
            .then(() => {
              const userRef = firestore().collection('users').doc(auth().currentUser.uid);
              userRef.get().then((docSnapshot) => {
                  if (! docSnapshot.exists) {
                    userRef.set({
                      userImg: null,
                      username: '',
                      bio: '',
                      email: auth().currentUser.email,
                      createdAt: firestore.FieldValue.serverTimestamp(),
                      likedStars: [],
                      numPost: 0,
                    })
                    .catch(error => {
                      console.log('Something went wrong with added user to firestore: ', error);
                    })
                  }
              });
            })
            .catch(error => {
              console.log('Something went wrong with sign up or sign in: ', error);
            })
          } catch(error){
            console.log({error});
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            if(e.code == 'auth/email-already-in-use'){
              Alert.alert('You have signed up before, please go to sign in page.');
            }else if(e.code == 'auth/weak-password'){
              Alert.alert('Your password needs to be at least 6 digits or characters.');
            }else{
              Alert.alert(`${error}`);
            }
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};