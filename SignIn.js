// SignIn.js

import React from 'react';
import { View, Button } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication';

export default function SignIn() {
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // TODO: send userInfo to our backend server
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // TODO: send appleAuthRequestResponse to our backend server
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Sign in with Google" onPress={signInWithGoogle} />
      {appleAuth.isSupported ? <AppleButton buttonType={AppleButton.Type.SIGN_IN} onPress={signInWithApple} /> : null}
    </View>
  );
}
