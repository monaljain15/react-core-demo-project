import {AUTH_SET_TOKEN} from './actionTypes';

export const authGetToken = (authorizationToken) => {
  console.log("authorizationToken", authorizationToken);
  return {
    type: AUTH_SET_TOKEN,
    authorizationToken: authorizationToken,
  };
};

