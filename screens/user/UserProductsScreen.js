/**List of products that belongs to the user */
import React from 'react';
import { FlatList, Platform, Text, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import CustomButton from '../../components/UI/CustomButton';

import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/products';
import EditProductScreen from './EditProductScreen';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id });
    }

    const deleteProductHandler = (id) => {
        Alert.alert('Are you sure?', 'You will delete this item',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes', style: 'destructive', onPress: () => {
                        dispatch(productsActions.deleteProduct(id))
                    }
                },
            ]
        )
    };
    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { editProductHandler(itemData.item.id) }}
                >
                    <CustomButton onPress={() => { editProductHandler(itemData.item.id) }}>
                        <Text>Edit</Text>
                    </CustomButton>
                    <CustomButton onPress={deleteProductHandler.bind(this, itemData.item.id)}>
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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Add"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => { navData.navigation.navigate('EditProduct') }} />
            </HeaderButtons>
        ),
    }
}
export default UserProductsScreen;

