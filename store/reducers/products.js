import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
    /**so the user can't buy his on products */
    availableProducts: PRODUCTS,
    /**look on every product that includes the condition */
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};
/**reducer */
export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            //remove it from both userProducts and availableProducts
            return{
                ...state,
                //filter returns a new array by running a function on every item of the old array
                //and if that returns true we keep that item if false we drop it
                userProducts: state.userProducts.filter(product => product.id != action.pid),
                availableProducts: state.availableProducts.filter(product => product.id != action.pid),
            }
    }
    return state;
}