/**List of products that belongs to the user */
import React from 'react';
import { FlatList, Platform, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import CustomButton from '../../components/UI/CustomButton';

import { useSelector } from 'react-redux';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { }}
                >
                    <CustomButton onPress={() => { }}>
                        <Text>Edit</Text>
                    </CustomButton>
                    <CustomButton onPress={() => { }}>
                        <Text>Delete</Text>
                    </CustomButton>
                </ProductItem>
            }
        />
    );
}
UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        )
    }
}
export default UserProductsScreen;

