import { legacy_createStore, combineReducers, applyMiddleware  } from "redux";
import thunkMiddleware from "redux-thunk";
import booksReducer from "./booksReducer"; 

const reducers = combineReducers({
    books: booksReducer,
});

const store = legacy_createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
);

export default store;
