/* @flow */

import React from "react";
import thunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { autoRehydrate, persistStore } from "redux-persist";
import { createLogger } from "redux-logger";

import MainTabs from "./MainTabs";
import { noteReducers } from "./reducers";

const logger = createLogger({ predicate: (getState, action) => __DEV__ });

export default class App extends React.Component {
  state = {
    store: null,
    isLoading: true,
  };

  componentWillMount() {
    let reducer = combineReducers({
      // for nested reducer
      notes: combineReducers({ ...noteReducers })
    });

    const preloadState = {};

    let store = createStore(
      reducer,
      preloadState,
      compose(applyMiddleware(logger, thunk), autoRehydrate({ log: true }))
    );

    let persistor = persistStore(store, {
      storage: AsyncStorage,
    }, () => this.setState({ isLoading: false }));

    this.setState({ store, persistor });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <Provider store={this.state.store} persistor={this.state.persistor}>
        <MainTabs/>
      </Provider>
    );
  }
};
