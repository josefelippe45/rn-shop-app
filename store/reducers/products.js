import PRODUCTS from '../../data/dummy-data';

const initialState = {
    /**so the user can't buy his on products */
    availableProducts: PRODUCTS,
    /**look on every product that includes the condition */
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};
/**reducer */
export default (state = initialState, action)=>{
    return state;
}