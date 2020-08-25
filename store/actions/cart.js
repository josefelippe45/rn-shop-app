export const ADD_TO_CART = 'ADD_TO_CART';

//the action will receive the full product object and pull of an action object
export const addToCart = product => {
    return { type: ADD_TO_CART, product: product };
}