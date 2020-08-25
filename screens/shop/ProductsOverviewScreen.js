/**Screen the user see when the app loads */
import React from 'react';
import { FlatList } from 'react-native';
/**will allow to tap into redux store and get the products from there */
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {
    //useSelector receives the state as an input and return the data i want
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList

            data={products}
            //itemData has the item prop and each item is an item on products
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => { }}
                    onAddToCart={() => { }}
                />
            )}
        />
    );
};

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
};

export default ProductsOverviewScreen;






