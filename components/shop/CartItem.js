import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
const CartItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) TouchableCmp = TouchableNativeFeedback;
    return (
        <View style={styles.container}>
            <View style={styles.itemInfo}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.itemInfo}>
                <Text style={styles.mainText}>$ {props.amount.toFixed(2)} </Text>
                <TouchableCmp onPress={props.onRemove} style={styles.delete}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableCmp>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
    },
    itemInfo: {
        flexDirection: "row",
        /**cause flex direction is row, align items works with the X position */
        alignItems: "center",
        padding: 5,
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    delete: {
        marginLeft: 20
    },
});

export default CartItem;