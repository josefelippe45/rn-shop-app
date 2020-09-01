import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CartItem from '../shop/CartItem';
import CustomButton from '../UI/CustomButton';
const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <CustomButton onPress={() => { setShowDetails(prevState => !prevState /**or !showDetails */) }}>
                <Text>{showDetails ?  'Hide Details' : 'Show Details'}</Text>
            </CustomButton>
            {showDetails && (
                <View style={{width: '100%'}}>
                    {props.items.map(
                        //map every item got from props.items, it's getting access to the array created in CartScreen
                        cartItem => (
                            <CartItem
                                key={cartItem.productId}
                                quantity={cartItem.quantity}
                                amount={cartItem.sum}
                                title={cartItem.productTitle}
                            />
                        )
                    )}
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    orderItem: {
        alignItems: "center",
        /**those shadow properties are for ios */
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        /**elevation is for android */
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        overflow: 'hidden'
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        /**vertical x */
        alignItems: 'center',
        width: '100%',
        marginBottom: 20
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#8888'
    },
});

export default OrderItem;