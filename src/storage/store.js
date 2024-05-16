import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";



const store = configureStore(
  
    {   reducer: reducers,
        middleware: [store => next => action => {
            return next(action);
        }],
        devTools: process.env.NODE_ENV !== 'production'
    }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;