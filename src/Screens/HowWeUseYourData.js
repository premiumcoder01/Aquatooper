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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HowWeUseYourData = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/background.png')}
        resizeMode="cover"
        style={styles.image}>
        <LinearGradient colors={['#fff', '#fff']} style={styles.firstView}>
          <Icon
            name="ios-arrow-back"
            size={30}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              color: '#000',
              fontFamily: 'Lato',
              fontWeight: 700,
              fontSize: 20,
              color: '#000',
              marginTop: 30,
            }}>
            How Do We Use Your Data
          </Text>
          <Text style={styles.subHeading}>Disclaimer</Text>
          <Text style={styles.subPara}>
            Blackbox Controls Limited is a sister company to Rainwater
            Harvesting Limited and handles the data collected on behalf of
            Rainwater Harvesting Limited (RWH LTD).
          </Text>

          <Text style={styles.subHeading}>Your Personal Data </Text>
          <Text style={styles.subPara}>
            Your personal data will not be shared or sold to any third party
            companies.
          </Text>
          <Text style={styles.subHeading}>The data we will use </Text>
          <Text style={styles.subPara}>
            Your usage, volumes stored and postcode will be used by RWH LTD to
            assist in market research and future product development and shared
            with Water Authorities across the UK.
          </Text>
          <Text style={styles.subHeading}>Purpose </Text>
          <Text style={styles.subPara}>
            The UK is currently experiencing severe flooding instances and the
            use of this data will help the Authorities and RWH LTD come up with
            a sustainable and practical solution to offer to Planning
            Authorities for new build properties.
          </Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default HowWeUseYourData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  firstView: {
    backgroundColor: '#fff',
    height: '88%',
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 20,
  },
  subHeading: {
    fontFamily: 'Lato',
    fontWeight: 700,
    fontSize: 16,
    marginTop: 30,
    color: '#000',
  },
  subPara: {
    fontFamily: 'Lato',
    fontWeight: 300,
    fontSize: 13,
    marginTop: 10,
    color: '#000',
  },
});
