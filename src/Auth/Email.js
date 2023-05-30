import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {BASE_URL} from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../Helper/Toaster';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {AxiosContext} from '../Helper/context/AxiosContext';
const Email = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState();

  const axiosContext = useContext(AxiosContext);

  const forgetUserEmail = async password => {
    setIsLoading(true);

    try {
      let userInfo = await axiosContext.authAxios.post(
        '/accounts/resend-email-confirmation',
        {
          email,
        },
      );
      let res = userInfo.data;
      setUserInfo(res);
      AsyncStorage.setItem('userInfo', JSON.stringify(res));
      setIsLoading(false);

      console.log('+-----------', res.Message);
      {
        Platform.OS == 'android' ? Toaster(res.Message) : null;
      }

      navigation.navigate('Login');
    } catch (error) {}

    axios
      .post(`${BASE_URL}/resend-email-confirmation`, {
        email,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);

        console.log('+-----------', userInfo.Message);
        Toaster(userInfo.Message);
        navigation.navigate('Login');
      })
      .catch(e => {
        Toaster(`"enter correct email"`);
        setIsLoading(false);
        console.log(`register error ${e}`);
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
            Resent Email Verification
          </Text>

          <View>
            <Image
              source={require('../images/username.png')}
              style={styles.inputImage}
            />
            <TextInput
              placeholder="priyanshu@gmail.com"
              style={styles.loginInputOne}
              placeholderTextColor="grey"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.btnOne}
            onPress={() => {
              forgetUserEmail(email);
            }}>
            <Text style={{textAlign: 'center', color: '#fff'}}>Resent </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Email;

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
    paddingLeft: 20,
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
