/**When the user select a product */
import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native'
/**will allow to tap into redux store and get the products from there */
import { useSelector, useDispatch } from 'react-redux';
//import actions
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';
const ProductDetailScreen = props => {
    //extracting navigation data
    const productId = props.navigation.getParam('productId');
    //using redux to help selecting single product. it access the 'products' slice defined in combineReducers
    //then access the availableProducts and runs a function on every item to match the one i want.
    const selectProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
    //manages the actions from redux
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectProduct.imageUrl }} />
            <View style={styles.buttonsContainer}>
                <Button
                    color={Colors.primary}
                    title="Add to Cart"
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectProduct))
                    }}
                />
            </View>
            <Text style={styles.price}>${selectProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectProduct.description}</Text>
        </ScrollView>
    );
}
//setting dynamic header title
ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        /**add dimensions API */
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: "center",
        marginVertical: 20,
        fontFamily: 'open-sans-bold',
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: "center",
        marginHorizontal: 20
    },
    buttonsContainer: {
        marginVertical: 10,
        alignItems: "center"
    }
});

export default ProductDetailScreen;