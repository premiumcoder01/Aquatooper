import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { createContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Toaster from '../Helper/Toaster';
import axios from 'axios';
import { BASE_URL } from "../Config";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = () => {
    const navigation = useNavigation()

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});



    const registerUser = (firstName, lastName, email, password, confirmPassword) => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/register`, {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        }).then(res => {
            let userInfo = res.data
            console.log(res.data)
            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
            navigation.navigate('RegisterConfirmation')
            Toaster('verify your email');
        }).catch(e => {
            Toaster('User already registered');
            console.log(`register error ${e}`)
            setIsLoading(false)
        })
    }

    return (

        <View style={styles.container}>
            <Spinner visible={isLoading} color='#0a4b87' />
            <ImageBackground source={require('../images/background.png')} resizeMode="cover" style={styles.image}>
                <LinearGradient colors={['#5dcbd3', '#9edce2', '#9edce2', '#9edce2', '#fff']} style={styles.firstView}>
                    <Text style={{ color: "#fff", textAlign: "center", marginTop: 20, fontSize: 18, marginBottom: 20, fontFamily: "Lato", fontWeight: 700, }}>Create new account</Text>

                    <Text style={{ color: "#fff", fontSize: 15, marginLeft: 10, marginBottom: 15, }}>Your Details:</Text>
                    <ScrollView>
                        <TextInput
                            placeholder='Your name:'
                            style={styles.loginInput}
                            placeholderTextColor="grey"
                            value={firstName}
                            onChangeText={(test) => setFirstName(test)}
                        />
                        <TextInput
                            placeholder='Last name:'
                            style={styles.loginInput}
                            placeholderTextColor="grey"
                            value={lastName}
                            onChangeText={(test) => setLastName(test)}
                        />

                        <Text style={{ color: "#fff", fontSize: 15, marginLeft: 10, marginBottom: 15, marginTop: 5 }}>Log in details:</Text>
                        <View>
                            <Image source={require('../images/username.png')} style={styles.inputImage} />
                            <TextInput
                                placeholder='priyanshu@gmail.com'
                                style={styles.loginInputOne}
                                placeholderTextColor="grey"
                                value={email}
                                onChangeText={(test) => setEmail(test)}
                            />
                        </View>
                        <View>
                            <Image source={require('../images/password.png')} style={styles.inputImagePassword} />
                            <TextInput
                                placeholder='**********'
                                style={styles.loginInputOne}
                                secureTextEntry={true}
                                placeholderTextColor="grey"
                                value={password}
                                onChangeText={(test) => setPassword(test)}
                            />
                        </View>
                        <View>
                            <Image source={require('../images/password.png')} style={styles.inputImagePassword} />
                            <TextInput
                                placeholder='Confirm Password'
                                style={styles.loginInputOne}
                                placeholderTextColor="grey"
                                secureTextEntry={true}
                                value={confirmPassword}
                                onChangeText={(test) => setConfirmPassword(test)}
                            />
                        </View>
                        <Text style={{
                            color: "#083258",
                            fontSize: 11,
                            padding: 10,
                            paddingTop: 3,
                            textAlign: "center",

                        }}>

                            Passwords need be at least six characters long
                            and require at least one number </Text>



                        <TouchableOpacity style={styles.btnOne}
                            onPress={() => {
                                if (!firstName) {
                                    Toaster(`"Please fill first name"`)
                                } else if (!lastName) {
                                    Toaster(`"Please fill last name"`)
                                } else if (!email) {
                                    Toaster(`"Please your email"`)
                                } else if (!password) {
                                    Toaster(`"enter password"`)
                                } else if (password.length < 6) {
                                    Toaster(`"password must be grater than 6"`)
                                }
                                else if (!confirmPassword) {
                                    Toaster(`"re-enter password to confirm"`)
                                } else if (confirmPassword.length < 6) {
                                    Toaster(`"confirm password must be grater than 6"`)
                                }
                                else if (confirmPassword != password) {
                                    Toaster(`"Please match the password and confirm password"`)
                                }

                                else (
                                    registerUser(firstName, lastName, email, password, confirmPassword)
                                )
                            }}
                        >
                            <Text style={{ textAlign: "center", color: "#fff" }}>Sign Up </Text>
                        </TouchableOpacity>

                    </ScrollView>

                </LinearGradient>

            </ImageBackground>
        </View >
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        color: "#000",
    },
    firstView: {
        backgroundColor: "#9edce2",
        height: "88%",
        marginTop: 50,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,

    },
    loginInput: {
        backgroundColor: "#fff",
        borderRadius: 30,
        paddingLeft: 20,
        marginBottom: 10,
        height: 45,
        color: "grey",
    },
    loginInputOne: {
        backgroundColor: "#fff",
        borderRadius: 30,
        paddingLeft: 20,
        marginBottom: 10,
        height: 45,
        paddingLeft: 45,
    },
    btnOne: {
        backgroundColor: "#0A4B87",
        borderRadius: 30,
        padding: 13,
        width: "78%",
        alignSelf: "center",
    },
    inputImage: {
        position: "absolute",
        zIndex: 1,
        top: 16,
        left: 15,
    },
    inputImagePassword: {
        position: "absolute",
        zIndex: 1,
        top: 10,
        left: 15,
    },
    placeholderStyle: {
        color: "grey",
        fontSize: 13,
        paddingLeft: 10,
    },
    selectedTextStyle: {
        color: "grey",
        fontSize: 13,
        paddingLeft: 10,
    },
    inputImagePassword: {
        position: "absolute",
        zIndex: 1,
        top: 10,
        left: 15,
    },



})