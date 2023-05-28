import React, {createContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    JwtToken: null,
    Id:null,
    RefreshToken: null,
    authenticated: null,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      JwtToken: null,
      Id:null,
      RefreshToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.JwtToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};
