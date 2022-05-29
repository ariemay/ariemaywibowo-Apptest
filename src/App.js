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
import {Provider} from 'react-redux';
import {store} from './stores';

const App: () => Node = () => {
  return (
      <Provider store={store}>
          <NavigationContainer>
            <Routers/>
          </NavigationContainer>
      </Provider>
  );
};

export default App;
