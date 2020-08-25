import { ADD_TO_CART } from "../actions/cart";
import CartItem from '../../models/cart-item';
const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            let updatedOrNewCartItem;
            //checks if the item is already add so it sums instead of adding the same item twice
            if (state.items[addedProduct.id]) {
                //already have
                //update the existing one. the CartItem will be populated with existing data
                updatedOrNewCartItem = new CartItem(
                    //increment plus one quantity
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                );
            } else {
                //add a brand new item
                //object of CartItem
                //the sum variable is equal to our productPrice initially
                //CartItem(quantity, productPrice, productTitle, sum)
                updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice);
            }
            //returns a copy of the existing state
            return {
                ...state,
                //new object with the existing items merged inside of it and add a new key
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + productPrice
            }
    }
    return state;
}