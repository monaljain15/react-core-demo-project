import {AUTH_SET_TOKEN} from '../actions/actionTypes';

const initialState = {
  authorizationToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      state.authorizationToken = action.authorizationToken;
      console.log('-> reducer token:', state);
      return state;
      // return {
      //   authorizationToken: action.authorizationToken,
      // };
    default:
      return state;
  }
};

export default authReducer;
