/**When the user select a product */
import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native'
/**will allow to tap into redux store and get the products from there */
import { useSelector, useDispatch } from 'react-redux';
//import actions
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';
import { Feather } from '@expo/vector-icons';
import CustomButton from '../../components/UI/CustomButton';
import Card from '../../components/UI/Card';
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
            <Card style={styles.content}>
                <View style={styles.contentHeader}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack()
                    }}>
                        <Feather name='arrow-left' size={28} color={Colors.primary} />
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", width: '80%' }}>
                        <Text style={styles.headerTitle}>{selectProduct.title}</Text>
                    </View>
                </View>
                <Text style={styles.price}>${selectProduct.price.toFixed(2)}</Text>
                <CustomButton
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectProduct))
                    }}

                >
                    <Text>Add to Cart</Text>
                </CustomButton>
                <Text style={styles.description}>{selectProduct.description}</Text>
            </Card>
        </ScrollView>
    );
}
//setting dynamic header title
ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle'),
        headerShown: false
    }
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        /**add dimensions API */
        height: 300
    },
    price: {
        fontSize: 30,
        color: '#888',
        textAlign: "center",
        margin: 20,
        fontFamily: 'open-sans-bold',

    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 40,
        marginHorizontal: 10,
        marginTop: -20,
        marginBottom: 16,
        overflow: 'hidden',
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: "center",
        margin: 20
    },
    buttonsContainer: {
        marginVertical: 10,
        alignItems: "center"
    },
    touchableCmp: {
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.primary,
        margin: 20,
        borderRadius: 8,
        padding: 20
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
        fontFamily: 'open-sans-bold'
    },
    contentHeader: {
        flexDirection: "row",
    },
    headerTitle: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
    }
});

export default ProductDetailScreen;