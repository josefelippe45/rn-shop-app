import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from "../actions/products";
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
            let updatedCartItems;
            //checks if there's more than one item
            if (currentQuantity > 1) {
                //need to reduce it
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                /**
                 * updatedCartItems needs to replace the old one. it takes the old state and then replace the
                 * productId with the productId from the action
                 */
                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
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
        //clear the cart
        case ADD_ORDER:
            return initialState;
        //delete product. remove from the cart if it was deleted
        case DELETE_PRODUCT:
            /**verify if the item exists. if it isn't the case so just return the state
             * if it pass the if check, so it knows the product with the id to be deleted is part
             * of the items
            */
            if(!state.items[action.pid]) return state;
            //copy exiting state then delete the item from the cart using action.pid that means the productId
            const updatedItems = {...state.items}
            //getting the item total so it will delete the sum of it
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid]
            return{
                ...state,
                //copy of the existing items without the deleted product
                items: updatedItems,
                //itemTotal takes the whole sum and here the totalAmount state gets "deleted"
                totalAmount: state.totalAmount - itemTotal,
            };
    }
    return state;
}