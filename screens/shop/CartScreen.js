/**Visit the products that are in the cart */
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CartItem from '../../components/shop/CartItem';
import CustomButton from '../../components/UI/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card'
//import cart actions
import * as cartActions from '../../store/actions/cart';
//import order actions
import * as ordersActions from '../../store/actions/orders';
const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    //getting access to the items with useSelector
    const cartItems = useSelector(state => {
        //creating an array
        const transformedCartItems = [];
        //for that goes through all the keys in the items and add each of them to the array.
        for (const key in state.cart.items) {
            //pushing a js object which appends new elements to the array
            transformedCartItems.push({
                productId: key,
                //state.cart.items is the object there productTitle is located [key] points at the id that it belongs
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        //the selector will return an array instead of an object, sort it
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total:{' '}
                    <Text style={{ color: Colors.primary }}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <CustomButton
                    style={styles.button}
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
                    }}
                >
                    <Text>Order Now</Text>
                </CustomButton>
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={
                    /**keyExtractor is necessary here cause we are getting data from an object and then turning it into an array */
                    item => item.productId
                }
                renderItem={itemData => <CartItem
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    deletable
                    onRemove={() => {
                        dispatch(cartActions.removeFromCart(itemData.item.productId));
                    }}
                />}
            />
        </View>);
}
CartScreen.navigationOption = {
    headerTitle: 'Cart'
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    button:{
        backgroundColor: Colors.secondary
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    }
});

export default CartScreen;