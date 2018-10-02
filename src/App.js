import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SearchBarView from './components/SearchBarView'
import ImageListView from './components/ImageListView'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../src/reducers'

export default class App extends Component {

  constructor(props) {
    super(props)
  }


  render() {

    

    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ImageListView/>
        </View>
      </Provider>
    );
  }
}