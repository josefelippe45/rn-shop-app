export const ADD_ORDER = 'ADD_ORDER';

//action creator
export const addOrder = (cartItems, totalAmount) => {
    return {
        type: ADD_ORDER,
        orderData: { items: cartItems, amount: totalAmount }
    };
}