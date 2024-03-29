/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Routers} from './routers';

const App: () => Node = () => {
  return (
      <NavigationContainer>
        <Routers/>
      </NavigationContainer>
  );
};

export default App;
