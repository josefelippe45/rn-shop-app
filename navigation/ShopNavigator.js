import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import { Platform } from 'react-native';
//components import
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
//constants imports
import Colors from '../constants/Colors';

const defaultNavOptions ={
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
const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
}, {
    defaultNavigationOptions: defaultNavOptions
});
const OrdersNavigator = createStackNavigator({
    Orders: OrderScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})
const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions:{
        activeTintColor: Colors.primary
    }
})
export default createAppContainer(ShopNavigator);