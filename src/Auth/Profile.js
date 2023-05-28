import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect,useContext} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Toaster from '../Helper/Toaster';

import { AxiosContext } from '../Helper/context/AxiosContext';
import { AuthContext } from '../Helper/context/AuthContext';

const Profile = () => {
  const [personalData, setPersonalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  console.log(authContext)


  const getUserData = async () => {
    setIsLoading(true);
    const id = authContext.authState.Id;
    try {
      const response = await axiosContext.authAxios.get(`/accounts/${id}`);
      setPersonalData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Hello Error', error);
    }
  };

  const logoutUser = async () => {
    try {
      authContext.logout();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };


  const deleteUser = async () => {
    try {
      const userProfile = await axiosContext.authAxios.delete(`/accounts/${id}`);
      const response = await userProfile.json();
      Toaster(`"account successfully deleted"`);
      navigation.navigate('Register');
    } catch (error) {
      console.log('Hello Error', error);
    }
  }; 




  useEffect(() => {
    getUserData();
  }, []);

  const navigation = useNavigation();
  const [value, setValue] = useState(null);

  const data = [
    {label: 'India', value: 'India'},
    {label: 'Russia', value: 'Russia'},
    {label: 'Japan', value: 'Japan'},
  ];
  return (
    <ScrollView style={{}}>
      <Spinner visible={isLoading} color="#0a4b87" />

      <LinearGradient
        colors={['#5dcbd3', '#9edce2', '#9edce2', '#9edce2', '#fff']}>
        <View style={{padding: 20}}>
          <View>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                textAlign: 'center',
                marginTop: 30,
                fontFamily: 'Lato',
                fontWeight: 700,
              }}>
              Manage You're Account{' '}
            </Text>
            <Text
              style={{
                color: '#0A4B87',
                fontSize: 14,
                marginTop: 30,
                marginLeft: 20,
                marginBottom: 10,
                fontFamily: 'Lato',
                fontWeight: 600,
              }}>
              Profile
            </Text>
            <TextInput
              placeholder="First name:"
              style={styles.loginInput}
              placeholderTextColor="grey"
              value={personalData.FirstName}
            />
            <TextInput
              placeholder="Last name:"
              style={styles.loginInput}
              placeholderTextColor="grey"
              value={personalData.LastName}
            />
            <TextInput
              placeholder="Building Number:"
              style={styles.loginInput}
              placeholderTextColor="grey"
              value={personalData.BuildingNameNumber}
            />
            <TextInput
              placeholder="Address Line One:"
              style={styles.loginInput}
              placeholderTextColor="grey"
              value={personalData.Street1}
            />
            <TextInput
              placeholder="Address Line Two :"
              style={styles.loginInput}
              placeholderTextColor="grey"
              value={personalData.Street2}
            />
            <TextInput
              placeholder="Town:"
              style={styles.loginInput}
              placeholderTextColor="grey"
              value={personalData.Town}
            />
            <Dropdown
              style={[
                styles.dropdown,
                {
                  borderColor: '#fff',
                  backgroundColor: '#fff',
                  borderRadius: 30,
                  marginBottom: 50,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              placeholder="Select your country"
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={data}
              onChange={item => {
                setValue(item.value);
              }}
            />

            <TextInput
              placeholder="Phone Number 1 :"
              style={styles.loginInput}
              placeholderTextColor="grey"
              value={personalData.PhoneNumber}
            />
            <TextInput
              placeholder="Phone Number 2 :"
              style={styles.loginInput}
              placeholderTextColor="grey"
              value={personalData.SecondaryPhoneNumber}
            />
            <TouchableOpacity
              style={styles.btnOne}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={{textAlign: 'center', color: '#fff'}}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.firstContainerOne}>
            <TouchableOpacity
              onPress={() => {
                logoutUser();
              }}>
              <Text
                style={{
                  marginTop: 1,
                  fontSize: 18,
                  color: '#0A4B87',
                  marginBottom: 90,
                }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignSelf: 'center',
              marginBottom: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HowDoWeUseYourData');
              }}>
              <Text
                style={{
                  color: '#083258',
                  textAlign: 'center',
                  fontSize: 12,
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#083258',
                }}>
                How we use your data?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                deleteUser();
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
                Delete Account{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  firstContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 10,
  },
  firstContainerOne: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 10,
    alignSelf: 'center',
  },
  loginInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingLeft: 20,
    marginBottom: 10,
    height: 45,
    color: 'grey',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#000',
  },
  placeholderStyle: {
    color: 'grey',
    fontSize: 13,
    paddingLeft: 10,
  },
  selectedTextStyle: {
    color: 'grey',
    fontSize: 13,
    paddingLeft: 10,
  },
  btnOne: {
    backgroundColor: '#0A4B87',
    borderRadius: 30,
    padding: 13,
    width: '78%',
    alignSelf: 'center',
    marginTop: 15,
  },
  inputImagePassword: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    left: 15,
  },
});
