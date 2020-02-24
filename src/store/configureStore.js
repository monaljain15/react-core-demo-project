import {createStore, combineReducers} from 'redux';

import authReducer from './reducers/auth';

// const rootReducer = combineReducers({
//   authReducer,
// });

// const configureStore = () => {
//   return createStore(rootReducer);
// };

export default createStore(
  combineReducers({
    authReducer
  }),
)
