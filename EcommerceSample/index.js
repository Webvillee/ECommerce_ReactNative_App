import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './src/reducers';

const store = createStore(reducer);

    const AppContainer  = () =>
	<Provider store={store}>
            <App />
    </Provider>

AppRegistry.registerComponent('EcommerceSample', () => AppContainer);
