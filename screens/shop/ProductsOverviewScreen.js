/**Screen the user see when the app loads */
import React from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
/**will allow to tap into redux store and get the products from there */
import { useSelector, useDispatch } from 'react-redux';
//import actions
import * as cartActions from '../../store/actions/cart';


const ProductsOverviewScreen = props => {
    //useSelector receives the state as an input and return the data i want
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    return (
        <FlatList

            data={products}
            //itemData has the item prop and each item is an item on products
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail',
                            {
                                //pointer at the id so it can be loaded in the detail screen
                                productId: itemData.item.id,
                                //pointer at title to set the header title of detail screen
                                productTitle: itemData.item.title
                            })
                    }}
                    onAddToCart={() => {
                        //dispatches the product and add it to cart with help of the action
                        dispatch(cartActions.addToCart(itemData.item));
                    }}
                />
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

export default ProductsOverviewScreen;






