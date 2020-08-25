class Product {
    constructor(id, ownerId, title, imageUrl, description, price) {
        /**store the data received in properties of the created object*/
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}
export default Product;