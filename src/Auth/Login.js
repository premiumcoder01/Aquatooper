import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../Config';
import axios from 'axios';
import Toaster from '../Helper/Toaster';
import {axiosInstance} from '../utils/Api';
import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from 'react-native-axios-jwt';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('rob@apscyprus.com');
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState('adonis1972');
  const [rememberMe, setRememberMe] = useState(true);

  // const loginUser = async (username, password, rememberMe) => {
  //   setIsLoading(true);
  //   const response = await axiosInstance.post('/authenticate', {
  //     username,
  //     password,
  //     rememberMe,
  //   });

  //   let res = response.data;
  //   AsyncStorage.setItem('userInfo', JSON.stringify(res));
  //   console.log(res.Username, 'user data');
  //   setIsLoading(false);

  //   await setAuthTokens({
  //     accessToken: res.JwtToken,
  //     refreshToken: res.RefreshToken,
  //   });
  //   navigation.navigate('Main');

  //   if (!res) {
  //     Toaster(`"enter the correct username and password"`);
  //     console.log('enter the correct username and password');
  //     setIsLoading(false);
  //   }
  // };

  const loginUser = (username, password, rememberMe) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/authenticate`, {
        username,
        password,
        rememberMe,
      })
      .then(res => {
        let userInfo = res.data;
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        // console.log('+-----------', userInfo);
        navigation.navigate('Main');
      })
      .catch(e => {
        Toaster(`"enter the correct username and password"`);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} color="#0a4b87" />
      <ImageBackground
        source={require('../images/background.png')}
        resizeMode="cover"
        style={styles.image}>
        <LinearGradient
          colors={['#5dcbd3', '#9edce2', '#9edce2', '#9edce2', '#fff']}
          style={styles.firstView}>
          <Image
            source={require('../images/white-logo.png')}
            style={styles.logoImage}
          />
          <Text
            style={{
              color: '#0A4B87',
              textAlign: 'center',
              marginTop: 10,
              fontSize: 19,
              marginBottom: 30,
              fontFamily: 'Lato',
              fontWeight: 700,
            }}>
            Log In
          </Text>
          <View>
            <Image
              source={require('../images/username.png')}
              style={styles.inputImage}
            />
            <TextInput
              placeholder="Enter your email address"
              style={styles.loginInput}
              keyboardType="email-address"
              placeholderTextColor="grey"
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>
          <View>
            <Image
              source={require('../images/password.png')}
              style={styles.inputImagePassword}
            />
            <TextInput
              placeholder="**********"
              style={styles.loginInput}
              secureTextEntry={true}
              adonis1972
              placeholderTextColor="grey"
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.btnOne}
            onPress={() => {
              if (!username) {
                Toaster(`"enter the email address"`);
              } else if (!password) {
                Toaster(`"enter the password"`);
              } else {
                loginUser(username, password, rememberMe);
              }
            }}>
            <Text style={{textAlign: 'center', color: '#fff'}}>Log In </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnTwo}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={{textAlign: 'center', color: '#0A4B87'}}>
              Create New Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Email');
            }}>
            <Text
              style={{
                color: '#083258',
                textAlign: 'center',
                fontSize: 12,
                marginTop: 90,
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: '#083258',
              }}>
              Resend email confirmation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text
              style={{
                color: '#083258',
                textAlign: 'center',
                fontSize: 12,
                marginTop: 10,
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: '#083258',
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  firstView: {
    height: '88%',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  loginInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingLeft: 45,
    marginBottom: 20,
    height: 45,
    color: 'grey',
  },
  btnOne: {
    backgroundColor: '#0A4B87',
    borderRadius: 30,
    padding: 13,
    width: '78%',
    alignSelf: 'center',
  },
  btnTwo: {
    borderRadius: 30,
    padding: 12,
    width: '78%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#0A4B87',
    marginTop: 15,
  },
  logoImage: {
    alignSelf: 'center',
    width: 110,
    height: 110,
    marginTop: 50,
  },
  inputImage: {
    position: 'absolute',
    zIndex: 1,
    top: 16,
    left: 15,
  },
  inputImagePassword: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    left: 15,
  },
});
