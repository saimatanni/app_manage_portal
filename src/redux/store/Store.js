import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

// import CounterReducer from "../reducers/CounterReducer";
import rootReducer from "../reducers/RootReducer";

const middlewares = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);
const initialState = {
    sidebarShow: true,
  }
  
//   const changeState = (state = initialState, { type, ...rest }) => {
//     switch (type) {
//       case 'set':
//         return { ...state, ...rest }
//       default:
//         return state
//     }
//   }
  
export default function Store(previousState) {
    const store = createStore(
        rootReducer,
        previousState,
        composedEnhancers, 
        //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}

// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunkMiddleware from 'redux-thunk';
// import rootReducer from '../reducers/RootReducer';

// const initialState = {
//   sidebarShow: true,
// };

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest };
//     default:
//       return state;
//   }
// };

//  rootReducer = combineReducers({
//   changeState,
//   // Add other reducers from your RootReducer
// });

// const middlewares = [thunkMiddleware];
// const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

// const store = createStore(rootReducer, composedEnhancers);

// export default store;

