import {View, Text, ImageBackground, Image, StyleSheet} from 'react-native';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../Helper/context/AuthContext';
import * as Keychain from 'react-native-keychain';

const Onboarding = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);
      console.log(jwt)

      authContext.setAuthState({
        JwtToken: jwt.JwtToken || null,
        Id: jwt.Id || null,
        RefreshToken: jwt.RefreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      // setStatus('success');
    } catch (error) {
      // setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        JwtToken: null,
        Id: null,
        RefreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  const slides = [
    {
      id: 1,
      title: 'Welcome To Aquatopper',
      description:
        'Our app is the ultimate swimming companion, providing you with all the tools you need to manage your pool',
    },
    {
      id: 2,
      title: 'Welcome To Aquatopper',
      description:
        'Our app is the ultimate swimming companion, providing you with all the tools you need to manage your pool',
    },
    {
      id: 3,
      title: 'Welcome To Aquatopper',
      description:
        'Our app is the ultimate swimming companion, providing you with all the tools you need to manage your pool',
    },
  ];

  const buttonLabel = label => {
    return (
      <View>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Lato',
            borderWidth: 2,
            borderColor: '#0A4B87',
            backgroundColor: '#0A4B87',
            padding: 20,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 30,
          }}>
          {label}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/onboarding.png')}
        resizeMode="cover"
        style={styles.image}>
        <Image
          source={require('../images/logo_onboarding.png')}
          style={styles.logoImage}
        />

        <AppIntroSlider
          data={slides}
          showSkipButton
          renderNextButton={() => buttonLabel('Next')}
          renderSkipButton={() => buttonLabel('Skip')}
          renderDoneButton={() => buttonLabel('Done')}
          onDone={() => {
            authContext?.authState?.authenticated === false
              ? navigation.navigate('Login')
              : navigation.navigate('Main');
          }}
          activeDotStyle={{
            backgroundColor: '#0A4B87',
          }}
          renderItem={({item}) => {
            return (
              <LinearGradient
                start={{x: 0.5, y: 0.0}}
                end={{x: 1, y: 1}}
                colors={['#52cad3', '#aee4e8', '#aee4e8', '#aee4e8', '#fff']}
                style={styles.popupInformation}>
                <Text
                  style={{
                    color: '#000',
                    textAlign: 'center',
                    fontSize: 17,
                    marginTop: 30,
                    fontFamily: 'Lato',
                    fontWeight: 600,
                  }}>
                  {item.title}{' '}
                </Text>
                <Text
                  style={{
                    color: 'grey',
                    textAlign: 'center',
                    fontSize: 13,
                    marginTop: 10,
                    fontFamily: 'Lato',
                    fontWeight: 600,
                    lineHeight: 20,
                  }}>
                  Our app is the ultimate swimming companion, providing you with
                  all the tools you need to manage your pool{' '}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 20,
                  }}></View>
              </LinearGradient>
            );
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  logoImage: {
    alignSelf: 'center',
    position: 'absolute',
    top: 100,
    width: 180,
    height: 180,
  },
  popupInformation: {
    backgroundColor: '#7c97a3ed',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
  },
});
