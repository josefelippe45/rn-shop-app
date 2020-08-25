import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import { Platform } from 'react-native';
//components import
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
//constants imports
import Colors from '../constants/Colors'
const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTitleStyle:{
            fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle:{
            fontFamily: 'open-sans',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitle: 'All Products'
    }
});

export default createAppContainer(ProductsNavigator);