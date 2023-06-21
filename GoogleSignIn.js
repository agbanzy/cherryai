// GoogleSignIn.js

import React from 'react';
import { Button } from 'react-native';
import firebase from './FirebaseConfig';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '<your-web-client-id>',
});

const signIn = async () => {
  try {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
    return firebase.auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error(error);
  }
}

const GoogleSignInButton = () => (
  <Button
    title="Sign in with Google"
    onPress={() => signIn()}
  />
);

export default GoogleSignInButton;
