import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer);
//loading fonts
const fetchFonts = () => {

  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [FontLoaded, setFontLoaded] = useState(false);
  //loading fonts
  if (!FontLoaded) {
    return (<AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true) }} />)
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
