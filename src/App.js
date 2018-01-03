import React from "react";
import thunk from "redux-thunk";
import { AsyncStorage, View, Text } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { autoRehydrate, persistStore } from "redux-persist";
import { createLogger } from "redux-logger";

import { noteReducer } from "./reducers";


const logger = createLogger({ predicate: (getState, action) => __DEV__ });


export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			store: null,
			isLoading: true,
		};
	}

	componentWillMount() {
		let reducer = combineReducers({
			...listReducer,
			notes: combineReducers({ ...noteReducer })
		});

		const preloadedState = {};

		let store = createStore(
			reducer,
			preloadedState,
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
				<View>
					<Text>App.js</Text>
				</View>
			</Provider>
		);
	}
};

