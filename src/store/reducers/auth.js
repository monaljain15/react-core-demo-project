import {AUTH_SET_TOKEN} from '../actions/actionTypes';
import {SET_PROFILE_PIC} from '../actions/actionTypes';
import {SET_USER} from '../actions/actionTypes';

const initialState = {
  authorizationToken: null,
  pickedImage: '',
  user: null,

};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      state.authorizationToken = action.authorizationToken;
      return state;
      case SET_PROFILE_PIC:
        state.pickedImage = action.pickedImage;
        return state;
      case SET_USER:
        state.user = action.user;
        return state;
    default:
      return state;
  }
};

export default authReducer;
