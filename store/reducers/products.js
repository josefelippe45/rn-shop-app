import PRODUCTS from '../../data/dummy-data';
import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    SET_PRODUCTS
} from '../actions/products';
import Product from '../../models/product';

const initialState = {
    /**so the user can't buy his on products */
    availableProducts: PRODUCTS,
    /**look on every product that includes the condition */
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};
/**reducer */
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            );
            return {
                //copy of the existing state
                ...state,
                //returns a new array which is the old array plus a new element
                availableProducts: state.availableProducts.concat(newProduct),
                //returns a new array which is the old array plus a new element
                userProducts: state.userProducts.concat(newProduct)
            };
        case UPDATE_PRODUCT:
            //find the index of the current product
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
            //create an updated product that is a new Product object but pre-populate with old data
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price,
            );
            //update the state of userProducts
            const updatedUserProducts = [...state.userProducts];
            //replace the product at that index with the new updatedProduct const this is done in the copy
            updatedUserProducts[productIndex] = updatedProduct;
            //find the availableProduct index
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
            //update the state of availableProducts
            const updatedAvailableProducts = [...state.availableProducts];
            //then set the updatedAvailableProducts for the given availableProductIndex
            //replace the existing product with the updatedProduct
            updatedAvailableProducts[availableProductIndex] = updatedProduct;

            return {
                ...state,
                availableProduct: updatedAvailableProducts,
                userProducts: updatedAvailableProducts,
            }
        case DELETE_PRODUCT:
            //remove it from both userProducts and availableProducts
            return {
                ...state,
                //filter returns a new array by running a function on every item of the old array
                //and if that returns true we keep that item if false we drop it
                userProducts: state.userProducts.filter(product => product.id != action.pid),
                availableProducts: state.availableProducts.filter(product => product.id != action.pid),
            }
    }
    return state;
}