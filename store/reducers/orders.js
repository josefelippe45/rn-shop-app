import { ADD_ORDER } from "../actions/orders";
import Order from "../../models/order";

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        //create a new order object
        case ADD_ORDER:
            //using a dummy id and data to test
            const newOrder = new Order(
                new Date().toString(),
                action.orderData.items,
                action.orderData.amount,
                new Date()
            );
            return {
                ...state,
                //concat adds a new item to an array and returns a new array that includes that item
                orders: state.orders.concat(newOrder)
            }
    }
    return state;
}