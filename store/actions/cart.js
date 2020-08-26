export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

//the action will receive the full product object and pull of an action object
export const addToCart = product => {
    return { type: ADD_TO_CART, product: product };
}
//only needs the id
export const removeFromCart = productId =>{
    //returns a new action object
    return { type: REMOVE_FROM_CART, pid: productId}
}