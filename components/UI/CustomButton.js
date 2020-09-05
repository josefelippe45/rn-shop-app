import React from 'react';
import { View, Text, TouchableNativeFeedback, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'
const CustomButton = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) TouchableCmp = TouchableNativeFeedback;
    return(
        <TouchableCmp onPress={props.onPress} disabled={props.disabled} >
            <View style={props.disabled ? styles.buttonDisabled : {...styles.button, ...props.style}}>
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </TouchableCmp>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 8,
        padding: 10
    },
    text: {
        fontSize: 16,
        color: '#FFF',
        fontFamily: 'open-sans-bold'
    },
    buttonDisabled: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#8888',
        borderRadius: 8,
        padding: 10
    },
});

export default CustomButton