// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './SignIn';
import Home from './Home'; // You need to create this component

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }} />
      <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}
