import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

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