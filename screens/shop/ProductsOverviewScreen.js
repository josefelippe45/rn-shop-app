/**Screen the user see when the app loads */
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Platform, Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import CustomButton from '../../components/UI/CustomButton';
/**will allow to tap into redux store and get the products from there */
import { useSelector, useDispatch } from 'react-redux';
//import actions
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products'
import Colors from '../../constants/Colors';


const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState()
    //useSelector receives the state as an input and return the data i want
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    const loadProducts = useCallback(async () => {
        setError(null)
        setIsLoading(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError]);
    useEffect(() => {
        loadProducts()
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail',
            {
                productId: id,
                productTitle: title
            })
    }
    if (error) {
        return (
            <View style={styles.splash}>
                <Text style={styles.text}>An error ocurred</Text>
                <CustomButton
                    style={{ backgroundColor: Colors.secondary }}
                    onPress={loadProducts}>
                    <Text>Restart</Text>
                </CustomButton>
            </View>
        );
    }
    if (isLoading) {
        return (
            <View style={styles.splash}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }
    if (!isLoading && products.length === 0) {
        <View style={styles.splash}>
            <Text>No products found!</Text>
        </View>
    }
    return (
        <FlatList

            data={products}
            //itemData has the item prop and each item is an item on products
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}
                >
                    <CustomButton onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}>
                        <Text>View Details</Text>
                    </CustomButton>
                    <CustomButton onPress={() => {
                        //dispatches the product and add it to cart with help of the action
                        dispatch(cartActions.addToCart(itemData.item));
                    }}>
                        <Text>To Cart</Text>
                    </CustomButton>
                </ProductItem>
            )}
        />
    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => { navData.navigation.toggleDrawer() }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Cart" iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => { navData.navigation.navigate('Cart') }} />
            </HeaderButtons>
        )
    }
};
const styles = StyleSheet.create({
    splash: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans'
    }
})
export default ProductsOverviewScreen;






