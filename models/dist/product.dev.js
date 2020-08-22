"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function Product(id, ownerId, title, imageUrl, description, price) {
  _classCallCheck(this, Product);

  /**store the data received in properties of the created object*/
  this.id = id;
  this.ownerId = ownerId;
  this.title = title;
  this.imageUrl = imageUrl;
  this.description = description;
  this.price = price;
};