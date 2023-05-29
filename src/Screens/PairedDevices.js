import {
  StyleSheet,
  Text,
  View,
  Animated,
  ImageBackground,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  BlurView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AQUATOOPER_BASE_URL, BASE_URL} from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {Switch} from 'react-native-switch';
import Toaster from '../Helper/Toaster';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import isTokenExpired from '../Helper/isTokenExpired';
import Wave from 'react-native-waveview';

const PairedDevices = ({route}) => {
  // const [value, setValue] = useState(0.6);

  const navigation = useNavigation();
  const id = route.params.aquaId;
  const [isLoading, setIsLoading] = useState(false);
  const [aquaDevice, setAquaDevices] = useState([]);
  const [aquaDeviceWaterLevel, setAquaDeviceWaterLevel] = useState([]);
  const [aquaDeviceHosePipe, setAquaDeviceHosePipe] = useState([]);
  const [aquaTopperKit, setAquaTopperKit] = useState([]);
  const [aquaOpenConditionValue, setAquaOpenConditionValue] = useState([]);
  const [aquaCloseConditionValue, setCloseConditionValue] = useState([]);
  const [newToken, setNewToken] = useState();

  const getAquaDevice = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const token = JSON.parse(user).JwtToken;

    isTokenExpired(token);
    setIsLoading(true);
    try {
      const aquaDevice = await fetch(`${AQUATOOPER_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: !isTokenExpired(token)
            ? `Bearer ${token}`
            : `Bearer ${newToken}`,
          'Content-Type': 'application/json',
        },
      });
      const response = await aquaDevice.json();

      setAquaDevices(response);

      setAquaDeviceWaterLevel(response.WaterLevelSensor);
      setAquaDeviceHosePipe(response.HosePipeValve);
      setAquaTopperKit(response.AquaTopperKit);
      // console.log('-----dashboard------', response.AquaTopperKit);
      setEditName(response.AquaTopperKit.Name);
      setEditDescription(response.AquaTopperKit.Description);
      setEditPostCode(response.AquaTopperKit.Postcode);
      setAquaOpenConditionValue(response.OpenConditionValue);
      setCloseConditionValue(response.CloseConditionValue);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const s = JSON.stringify(aquaDeviceWaterLevel.Level);
  const n = parseInt(s);

  console.log('---rip', typeof n, n, aquaDeviceWaterLevel.Level);

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
    getAquaDevice();
  }, [newToken]);

  useEffect(() => {
    getRefreshToken();
  }, []);

  //Show Modal
  const [showModalOne, setShowModalOne] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const [showModalThree, setShowModalThree] = useState(false);

  //Aquatopper Edit

  const [editName, setEditName] = useState();
  const [editDescription, setEditDescription] = useState();
  const [editPostCode, setEditPostCode] = useState();

  const editAquaToper = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const token = JSON.parse(user).JwtToken;
    isTokenExpired(token);
    setIsLoading(true);
    axios
      .put(
        `${AQUATOOPER_BASE_URL}/${id}`,
        {
          PairedDeviceGroupId: id,
          Name: editName,
          Description: editDescription,
          Postcode: editPostCode,
        },
        {
          method: 'PUT',
          headers: {
            Authorization: !isTokenExpired(token)
              ? `Bearer ${token}`
              : `Bearer ${newToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        console.log('ddddddddddd', res);
        Toaster(`"edit successfully"`);
        setIsLoading(false);
        setShowModalTwo(false);
      })
      .catch(e => {
        if (e.response?.status == 400) {
          Toaster(`"please check your entry again"`);
          setIsLoading(false);
          setShowModalTwo(false);
        } else if (e.response?.status == 401) {
          Toaster(`You are not authorised to make these changes`);
          setIsLoading(false);
          setShowModalTwo(false);
        } else if (e.response?.status == 404) {
          Toaster(`Device not found`);
          setIsLoading(false);
          setShowModalTwo(false);
        } else if (e.response?.status == 500) {
          Toaster(`Failed to update details`);
          setIsLoading(false);
          setShowModalTwo(false);
        } else {
          Toaster(`Some thing went wrong`);
          setIsLoading(false);
        }
      });
  };

  // Aquatooper Settings

  const [rangeOpenValue, setRangeOpenValue] = useState();
  const [rangeCloseValue, setRangeCloseValue] = useState();

  const openValue = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const token = JSON.parse(user).JwtToken;
    isTokenExpired(token);
    setIsLoading(true);
    axios
      .post(
        `${AQUATOOPER_BASE_URL}/${id}/update-condition-value`,
        {
          ConditionValueId: aquaOpenConditionValue.ConditionValueId,
          Value: Math.floor(rangeOpenValue),
        },
        {
          method: 'POST',
          headers: {
            Authorization: !isTokenExpired(token)
              ? `Bearer ${token}`
              : `Bearer ${newToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        Toaster(`"value has been changed"`);
        setIsLoading(false);
        setShowModalThree(false);
        getAquaDevice();
      })
      .catch(e => {
        if (e.response?.status == 400) {
          // Toaster(`"please check your entry again"`);
          setIsLoading(false);
        } else if (e.response?.status == 401) {
          Toaster(`You are not authorised to make these changes`);
          setIsLoading(false);
        } else if (e.response?.status == 404) {
          Toaster(`Condition Value not found`);
          setIsLoading(false);
        } else if (e.response?.status == 500) {
          Toaster(`Failed to update details`);
          setIsLoading(false);
        } else {
          Toaster(`Some thing went wrong`);
          setIsLoading(false);
        }
      });
  };

  const closeValue = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const token = JSON.parse(user).JwtToken;
    isTokenExpired(token);
    setIsLoading(true);
    axios
      .post(
        `${AQUATOOPER_BASE_URL}/${id}/update-condition-value`,
        {
          ConditionValueId: aquaCloseConditionValue.ConditionValueId,
          Value: Math.floor(rangeCloseValue),
        },
        {
          method: 'POST',
          headers: {
            Authorization: !isTokenExpired(token)
              ? `Bearer ${token}`
              : `Bearer ${newToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        // Toaster(`"value has been changed"`);
        setIsLoading(false);
        setShowModalThree(false);
        // getAquaDevice();
      })
      .catch(e => {
        if (e.response?.status == 400) {
          // Toaster(`"please check your entry again"`);
          setIsLoading(false);
        } else if (e.response?.status == 401) {
          Toaster(`You are not authorised to make these changes`);
          setIsLoading(false);
        } else if (e.response?.status == 404) {
          Toaster(`Condition Value not found`);
          setIsLoading(false);
        } else if (e.response?.status == 500) {
          Toaster(`Failed to update details`);
          setIsLoading(false);
        } else {
          Toaster(`Some thing went wrong`);
          setIsLoading(false);
        }
      });
  };

  // Automation Toggle
  const [isEnabled, setIsEnabled] = useState(Boolean);
  const [toggle, setToggle] = useState(false);

  const automationOn = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const token = JSON.parse(user).JwtToken;
    isTokenExpired(token);
    axios
      .post(
        `${AQUATOOPER_BASE_URL}/${id}/toggle-automation`,
        {
          Enabled: isEnabled == false ? true : false,
        },
        {
          method: 'POST',
          headers: {
            Authorization: !isTokenExpired(token)
              ? `Bearer ${token}`
              : `Bearer ${newToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        setIsEnabled(previousState => !previousState);
        Toaster(`"The automation scenario has been toggled."`);
      })
      .catch(e => {
        Toaster(`"error"${e}`);
      });
  };

  const getToggleInfo = async () => {
    const localStorageToggled = await AsyncStorage.getItem('toggle');
    // console.log('status of toggle', JSON.stringify(localStorageToggled));

    // If is not null
    if (localStorageToggled) {
      setToggle(localStorageToggled === 'true' ? true : false);
    } else {
      // If null set the localStorage key/value as a string.
      AsyncStorage.setItem('toggle', `${toggle}`);
    }
  };

  useEffect(() => {
    getToggleInfo();
  }, []);

  const handleToggle = async toggle => {
    console.log('clicked');
    await AsyncStorage.setItem('toggle', `${!toggle}`);
    setToggle(toggle);
  };

  // Keep Valve Closed

  const [isEnabledOne, setIsEnabledOne] = useState(Boolean);

  const kepValve = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const token = JSON.parse(user).JwtToken;
    isTokenExpired(token);
    axios
      .post(
        `${AQUATOOPER_BASE_URL}/${id}/set-valve-state`,
        {
          DesiredValveState: !isEnabledOne == 1 ? 0 : 1,
        },
        {
          method: 'POST',
          headers: {
            Authorization: !isTokenExpired(token)
              ? `Bearer ${token}`
              : `Bearer ${newToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        setIsEnabledOne(previousState => !previousState);
        Toaster(`"The desired valve state has been updated."`);
      })
      .catch(e => {
        Toaster(`error${e}`);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading} color="#0a4b87" />
      <ImageBackground
        source={require('../images/home.png')}
        resizeMode="cover"
        style={styles.image}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.firstContainer}>
            <FontAwesome
              name="angle-left"
              style={{fontSize: 20, color: '#fff'}}
            />
            <Text
              style={{
                marginTop: -2,
                marginLeft: 10,
                fontSize: 18,
                color: '#fff',
                fontFamily: 'Lato',
                fontWeight: 600,
              }}>
              Back
            </Text>
          </View>
        </TouchableOpacity>
        <ScrollView>
          <LinearGradient
            colors={[
              '#81d5dbba',
              '#4ac6cf',
              '#84d7de',
              '#a9e1e6',
              '#bbe5ea',
              '#bbe6eb',
              '#bbe6eb',
              '#bbe6eb',
              '#bbe6eb',
            ]}
            style={styles.mainContainer}>
            <View style={styles.imgContainer}>
              <TouchableOpacity onPress={() => setShowModalTwo(true)}>
                <FontAwesome
                  name="edit"
                  style={{fontSize: 25, color: '#0A4B87'}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModalOne(true)}>
                <Ionicons
                  name="ios-information-circle-outline"
                  style={{fontSize: 28, color: '#0A4B87'}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModalThree(true)}>
                <Ionicons
                  name="settings-outline"
                  style={{fontSize: 25, color: '#0A4B87'}}
                />
              </TouchableOpacity>
            </View>
            <Modal visible={showModalOne} animationType="slide">
              <View style={styles.container}>
                <ImageBackground
                  source={require('../images/popup.png')}
                  resizeMode="cover"
                  style={styles.image}>
                  <ScrollView>
                    <View style={styles.popupInformation}>
                      <TouchableOpacity onPress={() => setShowModalOne(false)}>
                        <Entypo name="cross" style={styles.cross} />
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          fontSize: 17,
                          marginTop: 30,
                          fontFamily: 'Lato',
                          fontWeight: 700,
                        }}>
                        Aqua Topper Infotmation
                      </Text>
                      <View style={styles.popup}>
                        <Text
                          style={{
                            fontSize: 11,
                            lineHeight: 17,
                            color: '#000',
                          }}>
                          * All swimming pools are different shapes and sizes.
                          Once your pool's water level sensor has started
                          sending information, get the water level of your pool
                          to the appropriate levels, and then press the buttons
                          below to set when you want the top up system to stop
                          and start. */
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                </ImageBackground>
              </View>
            </Modal>
            <Modal visible={showModalTwo} animationType="slide">
              <View style={styles.container}>
                <ImageBackground
                  source={require('../images/popup.png')}
                  resizeMode="cover"
                  style={styles.image}>
                  <ScrollView style={styles.popupInformationOne}>
                    <TouchableOpacity onPress={() => setShowModalTwo(false)}>
                      <Entypo name="cross" style={styles.cross} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 17,
                        marginTop: 30,
                        marginBottom: 30,
                        fontFamily: 'Lato',
                        fontWeight: 700,
                      }}>
                      Edit Aqua Toper Details
                    </Text>

                    <TextInput
                      placeholder="Anarita Pool"
                      style={styles.loginInput}
                      placeholderTextColor="grey"
                      value={editName}
                      onChangeText={text => setEditName(text)}
                    />
                    <Text
                      style={{
                        color: '#0A4B87',
                        marginTop: 0,
                        fontSize: 11,
                        marginLeft: 20,
                      }}>
                      Unique and required
                    </Text>
                    <TextInput
                      placeholder="Rob’s pool top up device:"
                      style={styles.loginInputOne}
                      placeholderTextColor="grey"
                      value={editDescription}
                      onChangeText={text => setEditDescription(text)}
                    />
                    <TextInput
                      placeholder="Post Code"
                      style={styles.loginInput}
                      placeholderTextColor="grey"
                      value={editPostCode}
                      onChangeText={text => setEditPostCode(text)}
                    />
                    <Text
                      style={{
                        color: '#0A4B87',
                        marginTop: 0,
                        fontSize: 11,
                        marginLeft: 20,
                      }}>
                      The nearest postcode to the location of the device
                    </Text>
                    <TouchableOpacity
                      style={styles.btnOne}
                      onPress={() => {
                        editAquaToper();
                      }}>
                      <Text style={{textAlign: 'center', color: '#fff'}}>
                        Save{' '}
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                </ImageBackground>
              </View>
            </Modal>
            <Modal visible={showModalThree} animationType="slide">
              <View style={styles.container}>
                <ImageBackground
                  source={require('../images/popup.png')}
                  resizeMode="cover"
                  style={styles.image}>
                  <ScrollView>
                    <View style={styles.popupInformation} blurRadius={70}>
                      <TouchableOpacity
                        onPress={() => setShowModalThree(false)}>
                        <Entypo name="cross" style={styles.cross} />
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          fontSize: 17,
                          marginTop: 30,
                          fontFamily: 'Lato',
                          fontWeight: 700,
                        }}>
                        {' '}
                        Aqua Topper Settings
                      </Text>

                      <View style={styles.popup}>
                        <Text
                          style={{
                            fontSize: 11,
                            lineHeight: 17,
                            color: '#000',
                          }}>
                          All swimming pools are different shapes and sizes.
                          Once your pool's water level sensor has started
                          sending information, get the water level of your pool
                          to the appropriate levels, and then press the buttons
                          below to set when you want the top up system to stop
                          and start.
                        </Text>
                      </View>
                      <View style={styles.popupRange}>
                        <Text
                          style={{
                            fontSize: 11,
                            lineHeight: 17,
                            color: '#000',
                            textAlign: 'center',
                            color: '#0D467A',
                            fontFamily: 'Lato',
                            fontWeight: 700,
                          }}>
                          Start Filling: my pool needs tooping up
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            lineHeight: 17,
                            color: '#000',
                            textAlign: 'center',
                            color: '#0D467A',
                            marginTop: 15,
                            fontFamily: 'Lato',
                            fontWeight: 700,
                          }}>
                          {rangeOpenValue
                            ? Math.floor(rangeOpenValue)
                            : aquaOpenConditionValue.Value}
                          %
                        </Text>
                        <Slider
                          style={{width: '100%', height: 40}}
                          minimumValue={0}
                          maximumValue={100}
                          minimumTrackTintColor="#0D467A"
                          maximumTrackTintColor="#0D467A"
                          value={
                            rangeOpenValue
                              ? rangeOpenValue
                              : aquaOpenConditionValue.Value
                          }
                          onValueChange={value => setRangeOpenValue(value)}
                          thumbTintColor="#0D467A"
                        />
                      </View>

                      <View style={styles.popupRange}>
                        <Text
                          style={{
                            fontSize: 11,
                            lineHeight: 17,
                            color: '#000',
                            textAlign: 'center',
                            color: '#0D467A',
                            fontFamily: 'Lato',
                            fontWeight: 700,
                          }}>
                          Stop Filling: my pool is full{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            lineHeight: 17,
                            color: '#000',
                            textAlign: 'center',
                            color: '#0D467A',
                            marginTop: 15,
                            fontFamily: 'Lato',
                            fontWeight: 700,
                          }}>
                          {rangeCloseValue
                            ? Math.floor(rangeCloseValue)
                            : aquaCloseConditionValue.Value}
                          %{' '}
                        </Text>
                        <Slider
                          style={{width: '100%', height: 40}}
                          minimumValue={0}
                          maximumValue={100}
                          minimumTrackTintColor="#0D467A"
                          maximumTrackTintColor="#0D467A"
                          thumbTintColor="#0D467A"
                          value={
                            rangeCloseValue
                              ? rangeCloseValue
                              : aquaCloseConditionValue.Value
                          }
                          onValueChange={value => setRangeCloseValue(value)}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.btnOne}
                        onPress={() => {
                          openValue();
                          closeValue();
                        }}>
                        <Text style={{textAlign: 'center', color: '#fff'}}>
                          Save Settings
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => {}}>
                        <Text
                          style={{
                            color: '#083258',
                            textAlign: 'center',
                            fontSize: 12,
                            marginTop: 50,
                            textDecorationLine: 'underline',
                            textDecorationStyle: 'solid',
                            textDecorationColor: '#083258',
                          }}>
                          Reset Settings
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {}}>
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
                          How we use your data?
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </ImageBackground>
              </View>
            </Modal>
            <View style={{marginTop: 40}}>
              <Text
                style={{
                  fontSize: 26,
                  color: '#0A4B87',
                  textAlign: 'center',
                  fontFamily: 'Lato',
                  fontWeight: 700,
                }}>
                {aquaTopperKit.Name}
              </Text>
              <Text
                style={{fontSize: 24, color: '#0A4B87', textAlign: 'center'}}>
                {aquaDeviceWaterLevel.Level === null
                  ? 0
                  : aquaDeviceWaterLevel.Level}{' '}
                %
              </Text>
              <View
                style={{
                  flex: 1,
                  marginVertical: 10,
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {aquaDeviceWaterLevel.Level === null ? (
                  <Wave
                    style={styles.waveBall}
                    H={aquaDeviceWaterLevel.Level === null ? 0 : 1}
                    waveParams={[
                      {A: 10, T: 180, fill: 'orange'},
                      {A: 15, T: 140, fill: 'black'},
                      {A: 20, T: 100, fill: 'red'},
                    ]}
                    animated={true}
                  />
                ) : (
                  <Wave
                    style={styles.waveBall}
                    H={aquaDeviceWaterLevel.Level === null ? 0 : 75}
                    waveParams={[
                      {A: 10, T: 180, fill: '#62c2ff'},
                      {A: 15, T: 140, fill: '#0087dc'},
                      {A: 20, T: 100, fill: '#1aa7ff'},
                    ]}
                    animated={true}
                  />
                )}
              </View>
            </View>
            {/* <View style={{marginTop: 20, alignSelf: 'center'}}>
              <Image
                source={require('../images/paired-1.png')}
                style={styles.vectorOne}
              />
              <Image
                source={require('../images/paired-2.png')}
                style={styles.vectorTwo}
              />
            </View> */}

            <View
              style={{
                marginTop: 40,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <View>
                <Text
                  style={{fontSize: 12, color: '#0A4B87', textAlign: 'center'}}>
                  Close at level:{aquaCloseConditionValue.Value}%
                </Text>
                <Text
                  style={{fontSize: 9, color: '#0A4B87', textAlign: 'center'}}>
                  Hose pipe valve temp: {aquaDeviceWaterLevel.Temperature} C
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 12, color: '#0A4B87', textAlign: 'center'}}>
                  Open at level:{aquaOpenConditionValue.Value}%
                </Text>
                <Text
                  style={{fontSize: 9, color: '#0A4B87', textAlign: 'center'}}>
                  Level sensor temp: {aquaDeviceHosePipe.Temperature} C
                </Text>
              </View>
            </View>
            <View style={styles.switchContainer}>
              <Text style={{fontSize: 12, color: '#0A4B87', marginLeft: 10}}>
                Automation{' '}
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={() => {
                  automationOn();
                  // handleToggle(!toggle);
                }}
                value={isEnabled}
                circleBorderWidth={2}
                backgroundActive={'#2DCE89'}
                backgroundInactive={'#F5365C'}
                circleSize={25}
                barHeight={20}
                activeText={'On'}
                inActiveText={'Off'}
              />
            </View>
            <View style={{marginLeft: 10, marginTop: 10}}>
              <Text style={{color: '#000000D6', fontSize: 10, lineHeight: 15}}>
                "Close Solenoid Valve" was called at{' '}
                {aquaDeviceHosePipe.LoggedAtUtc}
              </Text>
            </View>

            {isEnabled ? (
              <Text></Text>
            ) : (
              <View style={styles.switchContainerOne}>
                <Text style={{fontSize: 12, color: '#0A4B87', marginLeft: 10}}>
                  Keep Valve
                </Text>

                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabledOne ? '#f5dd4b' : '#f4f3f4'}
                  onValueChange={() => {
                    kepValve();
                  }}
                  value={isEnabledOne}
                  circleBorderWidth={2}
                  backgroundActive={'#2DCE89'}
                  backgroundInactive={'#F5365C'}
                  circleSize={25}
                  barHeight={20}
                  activeText={'On'}
                  inActiveText={'Off'}
                />
              </View>
            )}

            <Text
              style={{
                fontSize: 18,
                color: '#0A4B87',
                textAlign: 'center',
                marginTop: 30,
                fontFamily: 'Lato',
                fontWeight: 700,
              }}>
              Paired Devices{' '}
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '80%',
                alignSelf: 'center',
              }}>
              <View style={{padding: 40, paddingTop: 20, paddingBottom: 0}}>
                <Text style={{fontSize: 8, color: '#0A4B87'}}>
                  {aquaDeviceWaterLevel.Name}
                </Text>
                <Text style={{fontSize: 7, color: '#0A4B87', marginTop: 3}}>
                  {aquaDeviceWaterLevel.Description}
                </Text>
                <Text style={{fontSize: 7, color: '#0A4B87', marginTop: 3}}>
                  Surrounding air temperature:{aquaDeviceWaterLevel.Temperature}
                </Text>
                <Text style={{fontSize: 6, color: '#0A4B87', marginTop: 3}}>
                  Last update received:{aquaDeviceWaterLevel.LoggedAtUtc}
                </Text>
              </View>
              <View style={{padding: 40, paddingTop: 20, paddingBottom: 0}}>
                <Text style={{fontSize: 8, color: '#0A4B87'}}>
                  {aquaDeviceHosePipe.Name}
                </Text>
                <Text style={{fontSize: 7, color: '#0A4B87', marginTop: 3}}>
                  {aquaDeviceHosePipe.Description}
                </Text>
                <Text style={{fontSize: 7, color: '#0A4B87', marginTop: 3}}>
                  Surrounding air temperature:{aquaDeviceWaterLevel.Temperature}
                </Text>
                <Text style={{fontSize: 6, color: '#0A4B87', marginTop: 3}}>
                  Last update received:{aquaDeviceWaterLevel.LoggedAtUtc}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PairedDevices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  waveBall: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  mainContainer: {
    margin: 20,
    marginTop: 40,
    borderRadius: 10,
    padding: 20,
    paddingBottom: 50,
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vectorOne: {
    height: 110,
    width: 150,
    borderRadius: 50,
    marginTop: -10,
  },
  vectorTwo: {
    height: 110,
    width: 150,
    borderRadius: 50,
    position: 'absolute',
    top: 0,
  },
  switchContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 30,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchContainerOne: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupInformation: {
    backgroundColor: '#7c97a3ed',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 110,
  },
  popupInformationOne: {
    backgroundColor: '#7c97a3ed',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 50,
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
  },
  popupRange: {
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  cross: {
    fontSize: 20,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  loginInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 4,
    height: 42,
    color: 'grey',
    marginTop: 10,
    fontSize: 12,
  },
  loginInputOne: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 10,
    height: 150,
    color: 'grey',
    marginTop: 30,
    fontSize: 12,
  },
  btnOne: {
    backgroundColor: '#0A4B87',
    borderRadius: 30,
    padding: 13,
    width: '78%',
    alignSelf: 'center',
    marginTop: 20,
  },
  firstContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 10,
  },
});
