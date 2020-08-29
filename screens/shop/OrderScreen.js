/**Order screen with the products */
import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton';

const OrderScreen = props => {
    //selecting the slice of data, first orders is the pointer in App.js the second orders
    const orders = useSelector(state => state.orders.orders);

    return (
    <FlatList data={orders} renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>} />
    )
}

OrderScreen.navigationOptions = navData=>{
    return{
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => { navData.navigation.toggleDrawer()}} />
            </HeaderButtons>
        )
    };
}

export default OrderScreen;