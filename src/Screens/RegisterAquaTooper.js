import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import React, {useContext, useState} from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import {useNavigation} from '@react-navigation/native';
  import Toaster from '../Helper/Toaster';
  import Spinner from 'react-native-loading-spinner-overlay/lib';
  import axios from 'axios';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  import {AQUATOOPER_BASE_URL} from '../Config';
  import {AxiosContext} from '../Helper/context/AxiosContext';
  import {AuthContext} from '../Helper/context/AuthContext';
  const RegisterAquaTooper = () => {
    const [levelFirstWorld, setLevelFirstWorld] = useState(null);
    const [levelSecondWorld, setLevelSecondWorld] = useState(null);
  
    const [levelThirdWorld, setLevelThirdWorld] = useState(null);
    const [hoseFirstWorld, setHoseFirstWorld] = useState();
    const [hoseSecondWorld, setHoseSecondWorld] = useState(null);
  
    const [hoseThirdWorld, setHoseThirdWorld] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const axiosContext = useContext(AxiosContext);
  
    const Register = async () => {
      setIsLoading(true);
      try {
        await axiosContext.authAxios.post(`/aqua-toppers`, {
          LevelThreeWordSerial: {
            WordOne: levelFirstWorld,
            WordTwo: levelSecondWorld,
            WordThree: levelThirdWorld,
          },
          ValveThreeWordSerial: {
            WordOne: hoseFirstWorld,
            WordTwo: hoseSecondWorld,
            WordThree: hoseThirdWorld,
          },
          GroupName: name,
          GroupDescription: description,
        });
        setIsLoading(false);
        Toaster(`"Registered Sucessfully"`);
        navigation.navigate('RegisterConfirmation');
      } catch (e) {
        setIsLoading(false);
        if (e.response?.status == 400) {
          Toaster(`${e.response?.data}`);
        } else {
          Toaster(`Something went wrong, please try again`);
        }
      }
    };
  
    //   const Register = async () => {
    //     const user = await AsyncStorage.getItem('userInfo');
    //     setIsLoading(true);
  
    //     axios
    //       .post(
    //         `${AQUATOOPER_BASE_URL}`,
    //         {
    //           LevelThreeWordSerial: {
    //             WordOne: levelFirstWorld,
    //             WordTwo: levelSecondWorld,
    //             WordThree: levelThirdWorld,
    //           },
    //           ValveThreeWordSerial: {
    //             WordOne: hoseFirstWorld,
    //             WordTwo: hoseSecondWorld,
    //             WordThree: hoseThirdWorld,
    //           },
    //           GroupName: name,
    //           GroupDescription: description,
    //         },
    //         {
    //           method: 'POST',
    //           headers: {
    //             Authorization: `Bearer ${JSON.parse(user).JwtToken}`,
    //             'Content-Type': 'application/json',
    //           },
    //         },
    //       )
    //       .then(res => {
    //         setIsLoading(false);
    //         Toaster(`"Registered Sucessfully"`);
    //         navigation.navigate('RegisterConfirmation');
    //       })
    //       .catch(e => {
    //         setIsLoading(false);
    //         if (e.response?.status == 400) {
    //           Toaster(`${e.response?.data}`);
    //         } else {
    //           Toaster(`Something went wrong, please try again`);
    //         }
    //       });
    //   };
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Spinner visible={isLoading} color="#0a4b87" />
  
        <ImageBackground
          source={require('../images/background.png')}
          resizeMode="cover"
          style={styles.image}>
          <ScrollView>
            <LinearGradient
              colors={[
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
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  marginTop: 40,
                  fontSize: 16,
                  fontFamily: 'Lato',
                  fontWeight: 700,
                }}>
                Register Your Aqua topper
              </Text>
              <Text
                style={{
                  color: '#0A4B87',
                  marginTop: 10,
                  fontSize: 10,
                  lineHeight: 16,
                  fontFamily: 'Lato',
                  fontWeight: 100,
                }}>
                Here you will register both your level sensor and hose pipe valve
                using thE 3-word serial found as a small sticker affixed to the
                outside of each device
              </Text>
              <Text
                style={{
                  color: '#0A4B87',
                  marginTop: 30,
                  fontSize: 14,
                  marginLeft: 20,
                  fontFamily: 'Lato',
                  fontWeight: 600,
                }}>
                Level Sensor 3-World Serial
              </Text>
              <TextInput
                placeholder="First World:"
                style={styles.loginInput}
                placeholderTextColor="grey"
                value={levelFirstWorld}
                onChangeText={text => setLevelFirstWorld(text)}
              />
              <TextInput
                placeholder="Second World:"
                style={styles.loginInput}
                placeholderTextColor="grey"
                value={levelSecondWorld}
                onChangeText={text => setLevelSecondWorld(text)}
              />
              <TextInput
                placeholder="Third World:"
                style={styles.loginInput}
                placeholderTextColor="grey"
                value={levelThirdWorld}
                onChangeText={text => setLevelThirdWorld(text)}
              />
              <Text
                style={{
                  color: '#0A4B87',
                  marginTop: 20,
                  fontSize: 14,
                  marginLeft: 20,
                  fontFamily: 'Lato',
                  fontWeight: 600,
                }}>
                Hose Pipe Valve 3-World Serial
              </Text>
              <TextInput
                placeholder="First World:"
                style={styles.loginInput}
                placeholderTextColor="grey"
                value={hoseFirstWorld}
                onChangeText={text => setHoseFirstWorld(text)}
              />
              <TextInput
                placeholder="Second World:"
                style={styles.loginInput}
                placeholderTextColor="grey"
                value={hoseSecondWorld}
                onChangeText={text => setHoseSecondWorld(text)}
              />
              <TextInput
                placeholder="Third World:"
                style={styles.loginInput}
                placeholderTextColor="grey"
                value={hoseThirdWorld}
                onChangeText={text => setHoseThirdWorld(text)}
              />
              <Text
                style={{
                  color: '#0A4B87',
                  marginTop: 0,
                  fontSize: 10,
                  marginLeft: 20,
                  fontFamily: 'Lato',
                  fontWeight: 100,
                }}>
                Please customize your kit by giving it a name and a description
              </Text>
              <Text
                style={{
                  color: '#0A4B87',
                  marginTop: 20,
                  fontSize: 14,
                  marginLeft: 20,
                  fontFamily: 'Lato',
                  fontWeight: 600,
                }}>
                Name
              </Text>
              <TextInput
                placeholder="Name:"
                style={styles.loginInput}
                placeholderTextColor="grey"
                value={name}
                onChangeText={text => setName(text)}
              />
              <TextInput
                placeholder="Description:"
                style={styles.loginInputOne}
                placeholderTextColor="grey"
                value={description}
                onChangeText={text => setDescription(text)}
              />
              <View
                style={{display: 'flex', flexDirection: 'row', marginLeft: 13}}>
                <Image
                  source={require('../images/information.png')}
                  style={{marginTop: 6}}
                />
                <Text
                  style={{
                    color: '#0A4B87',
                    marginTop: 0,
                    fontSize: 10,
                    marginLeft: 6,
                    fontFamily: 'Lato',
                    fontWeight: 100,
                  }}>
                  Remember to set the open/close values on the Aqua Topper kit’s
                  page
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btnOne}
                onPress={() => {
                  if (!levelFirstWorld) {
                    Toaster(`"please fill level sensor first world"`);
                  } else if (!levelSecondWorld) {
                    Toaster(`"please fill level sensor second world"`);
                  } else if (!levelThirdWorld) {
                    Toaster(`"please fill level sensor third world"`);
                  } else if (!hoseFirstWorld) {
                    Toaster(`"please hose pipe first world"`);
                  } else if (!hoseSecondWorld) {
                    Toaster(`"please hose pipe second world"`);
                  } else if (!hoseThirdWorld) {
                    Toaster(`"please hose pipe third world"`);
                  } else if (!name) {
                    Toaster(`"please fill your name"`);
                  } else Register();
                }}>
                <Text style={{textAlign: 'center', color: '#fff'}}>
                  Register{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('HowDoWeUseYourData');
                }}>
                <Text
                  style={{
                    color: '#083258',
                    textAlign: 'center',
                    fontSize: 12,
                    marginTop: 30,
                    paddingBottom: 30,
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'solid',
                    textDecorationColor: '#083258',
                  }}>
                  How we use your data?
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  };
  
  export default RegisterAquaTooper;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
    },
    mainContainer: {
      margin: 20,
      marginTop: 40,
      borderRadius: 10,
      padding: 20,
    },
    loginInput: {
      backgroundColor: '#fff',
      borderRadius: 30,
      paddingLeft: 20,
      marginBottom: 10,
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
      marginTop: 10,
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
  });