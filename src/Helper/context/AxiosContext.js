import React, {createContext, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

const AxiosContext = createContext();
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
  const authContext = useContext(AuthContext);
  // console.log(authContext, 'info about user');

  const authAxios = axios.create({
    baseURL: 'https://api.blackboxcontrols.co.uk/v1',
  });

  const publicAxios = axios.create({
    baseURL: 'https://api.blackboxcontrols.co.uk/v1',
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = async failedRequest => {
    const data = {
      RefreshToken: authContext.authState.RefreshToken,
    };
    console.log(data, 'refresh-token data');

    const options = {
      method: 'POST',
      data,
      url: 'https://api.blackboxcontrols.co.uk/v1/accounts/refresh-token',
    };

    try {
      const tokenRefreshResponse = await axios(options);
      // console.log(tokenRefreshResponse , "new refresh token")
      failedRequest.response.config.headers.Authorization =
        'Bearer ' + tokenRefreshResponse.data.JwtToken;

      authContext.setAuthState({
        ...authContext.authState,
        JwtToken: tokenRefreshResponse.data.JwtToken,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          JwtToken: tokenRefreshResponse.data.JwtToken,
          Id: tokenRefreshResponse.data.Id,
          RefreshToken: authContext.authState.RefreshToken,
        }),
      );
      return await Promise.resolve();
    } catch (e) {
      authContext.setAuthState({
        JwtToken: null,
        Id: null,
        RefreshToken: null,
      });
    }
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};