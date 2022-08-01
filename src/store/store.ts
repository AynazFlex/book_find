import { legacy_createStore, combineReducers, applyMiddleware  } from "redux";
import thunkMiddleware from "redux-thunk";
import booksReducer from "./booksReducer"; 
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
    books: booksReducer,
});

const store = legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
