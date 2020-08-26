import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
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
        //remove from cart
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            //action.pid is accessing the productId set on the REMOVE_FROM_CART action
            const currentQuantity = state.items[action.pid].quantity;
            let updatedCartItems
            //checks if there's more than one item
            if (currentQuantity > 1) {
                //need to reduce it
                const updatedCartItems = new CartItem(
                    selectedCartItem - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                /**
                 * NOTE: the first updateCartItems is the let variable, it isn't a const because with let we
                 * can change it values.
                 * updatedCartItems needs to replace the old one. it takes the old state and then replace the
                 * productId with the productId from the action
                 */
                updatedCartItems = {...state.items, [action.pid]: updatedCartItems}
            } else {
                //"clone" the current state
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
            }
            //returns a copy of the state
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
    }
    return state;
}