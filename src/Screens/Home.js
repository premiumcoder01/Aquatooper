import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AQUATOOPER_BASE_URL, BASE_URL} from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import isTokenExpired from '../Helper/isTokenExpired';
import Wave from 'react-native-waveview';

const Home = () => {
  const [value, setValue] = useState(0.6);
  const [isLoading, setIsLoading] = useState(false);
  const [poolValue, setPoolValue] = useState();
  const [newToken, setNewToken] = useState();

  const isFocused = useIsFocused();

  const getAquaToopers = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const token = JSON.parse(user).JwtToken;
    setIsLoading(true);
    isTokenExpired(token);
    try {
      const aquaTopper = await fetch(`${AQUATOOPER_BASE_URL}`, {
        method: 'GET',
        headers: {
          Authorization: !isTokenExpired(token)
            ? `Bearer ${token}`
            : `Bearer ${newToken}`,
          'Content-Type': 'application/json',
        },
      });
      const response = await aquaTopper.json();
      setPoolValue(response.DashboardCards);
      setIsLoading(false);
      // console.log('new responces', response);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const getRefreshToken = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    try {
      const newRefreshTOken = await fetch(`${BASE_URL}/refresh-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JSON.parse(user).JwtToken}`,
          'Content-Type': 'application/json',
        },
      });

      const response = await newRefreshTOken.json();
      // console.log('new token recevied', response);

      setNewToken(response.JwtToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRefreshToken();
  }, []);

  useEffect(() => {
    getAquaToopers();
  }, [newToken, isFocused]);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} color="#0a4b87" />

      <ImageBackground
        source={require('../images/home.png')}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.firstHeading}>
          Here you find the current status of your device
        </Text>
        {poolValue != 0 ? (
          <FlatList
            data={poolValue}
            renderItem={({item, index}) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('PairedDevices', {
                        aquaId: item.PairedDeviceGroupId,
                      });
                    }}>
                    <LinearGradient
                      start={{x: 0, y: 0.75}}
                      end={{x: 1, y: 0.75}}
                      colors={[
                        '#a4d1d7',
                        '#a7dbdf',
                        '#a7dbdf',
                        '#9edce2',
                        '#9edce2',
                        '#b8e7eb',
                        '#d2eef1',
                      ]}
                      style={styles.mainContainer}>
                      {item.ValveState == null ? null : (
                        <Text
                          style={{
                            backgroundColor:
                              item.BallBackgroundClass == 'bg-success'
                                ? '#2DCE89'
                                : '#F5365C',
                            color: '#fff',
                            fontSize: 8,
                            textAlign: 'center',
                            marginTop: 8,
                            fontFamily: 'Lato',
                            fontWeight: 900,
                            position: 'absolute',
                            top: -3,
                            right: 10,
                            padding: 4,
                            paddingRight: 8,
                            paddingLeft: 8,
                            borderRadius: 20,
                          }}>
                          {item.ValveState}
                        </Text>
                      )}

                      <View style={{paddingLeft: 10}}>
                        <TouchableOpacity
                          style={styles.firstContainer}
                          //   onPress={() => {
                          //     navigation.navigate('PairedDevices', {
                          //       aquaId: item.PairedDeviceGroupId,
                          //     });
                          //   }}
                        >
                          <Text style={styles.btnheading}>
                            {item.DisplayName}
                          </Text>
                        </TouchableOpacity>

                        {/* <Text
                          style={{
                            color: '#0A4B87',
                            fontSize: 11,
                            textAlign: 'center',
                            marginTop: 8,
                            fontFamily: 'Lato',
                            fontWeight: 900,
                          }}>
                          Current Level
                        </Text> */}
                        {/* <Text
                          style={{
                            color: '#0A4B87',
                            fontSize: 11,
                            textAlign: 'center',
                            marginTop: 1,
                          }}>
                          65%
                        </Text> */}
                        <View
                          style={{
                            flex: 1,
                            marginVertical: 10,
                            marginHorizontal: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Wave
                            style={styles.waveBall}
                            H={40}
                            waveParams={[
                              {A: 10, T: 180, fill: '#62c2ff'},
                              {A: 15, T: 140, fill: '#0087dc'},
                              {A: 20, T: 100, fill: '#1aa7ff'},
                            ]}
                            animated={true}
                          />
                        </View>
                        {/* <Image
                          source={require('../images/vector.png')}
                          style={{
                            borderRadius: 50,
                            alignSelf: 'center',
                            marginTop: 2,
                          }}
                        /> */}
                      </View>

                      <View style={{paddingLeft: 30, width: 200}}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 9,
                            marginTop: 10,
                            fontFamily: 'Lato',
                            fontWeight: 600,
                          }}>
                          {item.DisplayDescription}
                        </Text>
                        <Text
                          style={{
                            color: '#0A4B87',
                            fontSize: 14,
                            fontFamily: 'Lato',
                            fontWeight: 600,
                          }}>
                          Close at level:{item.CloseConditionValue}%{' '}
                        </Text>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: 9,
                            marginTop: 25,
                            fontFamily: 'Lato',
                            fontWeight: 600,
                          }}>
                          Lorem Ipsum
                        </Text>
                        <Text
                          style={{
                            color: '#0A4B87',
                            fontSize: 14,
                            fontFamily: 'Lato',
                            fontWeight: 600,
                          }}>
                          Open at level:{item.OpenConditionValue}%{' '}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <TouchableOpacity
            style={styles.Register}
            onPress={() => {
              navigation.navigate('RegisterAquaTooperTab');
            }}>
            <Text
              style={{
                color: '#0A4B87',
                textAlign: 'center',
                fontFamily: 'Lato',
                fontWeight: 900,
              }}>
              Register Now
            </Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  firstHeading: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 65,
    fontSize: 20,
    padding: 50,
    paddingBottom: 30,
    fontFamily: 'Lato',
    fontWeight: 700,
  },
  mainContainer: {
    margin: 20,
    marginTop: 0,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    paddingRight: 10,
    paddingLeft: 10,
  },
  firstContainer: {
    backgroundColor: '#0A4B87',
    borderRadius: 20,
    padding: 7,
    paddingRight: 22,
    paddingLeft: 22,
  },
  btnheading: {
    color: '#fff',
    fontSize: 10,
    width: 60,
    textAlign: 'center',
  },
  Register: {
    backgroundColor: '#fff',
    width: '60%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 30,
  },
  waveBall: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
});
