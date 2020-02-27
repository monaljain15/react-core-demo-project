import {AUTH_SET_TOKEN} from './actionTypes';
import {SET_PROFILE_PIC} from './actionTypes';
import {SET_USER} from './actionTypes';

export const authGetToken = (authorizationToken) => {
  return {
    type: AUTH_SET_TOKEN,
    authorizationToken: authorizationToken,
  };
};

export const getProfilePic = (pickedImage) => {
  return {
    type: SET_PROFILE_PIC,
    pickedImage: pickedImage,
  };
};

export const getUser = (user) => {
  return {
    type: SET_USER,
    user: user,
  };
};

