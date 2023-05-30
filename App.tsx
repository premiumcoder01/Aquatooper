import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './src/Helper/context/AuthContext';
import {AxiosProvider} from './src/Helper/context/AxiosContext';
import MainAuth from './src/MainAuth';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  },[]);

  return (
    <AuthProvider>
      <AxiosProvider>
        <MainAuth />
      </AxiosProvider>
    </AuthProvider>
  );
};

export default App;