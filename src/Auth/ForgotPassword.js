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
  import axios from 'axios';
  import {BASE_URL} from '../Config';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Toaster from '../Helper/Toaster';
  import Spinner from 'react-native-loading-spinner-overlay/lib';
  import {AxiosContext} from '../Helper/context/AxiosContext';
  import {AuthContext} from '../Helper/context/AuthContext';
  
  const ForgotPassword = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const [email, setEmail] = useState();
  
    const axiosContext = useContext(AxiosContext);
  
    const forgetUserPassword = async password => {
      setIsLoading(true);
      try {
        let userInfo = await axiosContext.authAxios.post(
          '/accounts/forgot-password',
          {
            email,
          },
        );
        let res = userInfo.data;
        setUserInfo(res);
        AsyncStorage.setItem('userInfo', JSON.stringify(res));
        setIsLoading(false);
        console.log('+-----------', res.message);
        Toaster(res.message);
        navigation.navigate('Login');
      } catch (e) {
        Toaster(`"enter correct email"`);
        setIsLoading(false);
        console.log(`register error ${e}`);
      }
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
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: 180,
                fontSize: 18,
                marginBottom: 30,
                fontFamily: 'Lato',
                fontWeight: 700,
              }}>
              Forgot you’re password{' '}
            </Text>
  
            <View>
              <Image
                source={require('../images/username.png')}
                style={styles.inputImage}
              />
              <TextInput
                placeholder="enter your email"
                style={styles.loginInput}
                placeholderTextColor="grey"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
  
            <TouchableOpacity
              style={styles.btnOne}
              onPress={() => {
                forgetUserPassword(email);
              }}>
              <Text style={{textAlign: 'center', color: '#fff'}}>
                Resent Password{' '}
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
                navigation.navigate('Register');
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
                Create new account
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };
  export default ForgotPassword;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
    },
    firstView: {
      backgroundColor: '#9edce2',
      height: '88%',
      marginTop: 50,
      marginLeft: 15,
      marginRight: 15,
      borderRadius: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
    loginInput: {
      backgroundColor: '#fff',
      borderRadius: 30,
      paddingLeft: 40,
      marginBottom: 10,
      height: 45,
      color: 'grey',
    },
    loginInputOne: {
      backgroundColor: '#fff',
      borderRadius: 30,
      paddingLeft: 20,
      marginBottom: 10,
      height: 45,
      paddingLeft: 45,
    },
    btnOne: {
      backgroundColor: '#0A4B87',
      borderRadius: 30,
      padding: 13,
      width: '78%',
      alignSelf: 'center',
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