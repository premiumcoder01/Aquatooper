
import { View, Text, ToastAndroid } from 'react-native'
import React from 'react'
const Toaster = (toast) => {
    // console.log(toast)
    return (
        ToastAndroid.show(toast, ToastAndroid.LONG)
    )
}

export default Toaster
