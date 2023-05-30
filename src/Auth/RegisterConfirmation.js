import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const RegisterConfirmation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
            Register Confirmation{' '}
          </Text>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 12,
              marginBottom: 20,
            }}>
            Please check you're e-mail to confirm you're account
          </Text>

          <TouchableOpacity
            style={styles.btnOne}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{textAlign: 'center', color: '#fff'}}>Go Back</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
export default RegisterConfirmation;

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
  inputImagePassword: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    left: 15,
  },
});
