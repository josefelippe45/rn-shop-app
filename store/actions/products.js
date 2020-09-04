import ProductDetailScreen from "../../screens/shop/ProductDetailScreen";

//identifier
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
//action creator
export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, pid: productId}
}