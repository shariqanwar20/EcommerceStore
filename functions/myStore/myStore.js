// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
var faunadb = require("faunadb");
const {getAllProducts} = require("./getAllProducts");
const {addProductInInventory} = require("./addProductInInventory");
const {addProductToCart} = require("./cart/addProductToCart")
const {getProductsInCart} = require("./cart/getProductsInCart")
const {removeProductFromCart} = require("./cart/removeProductFromCart")
const {updateCartProductQuantity} = require("./cart/updateCartProductQuantity")

var q = faunadb.query;

require("dotenv").config();

/* 
  get a specific product based on id
  get all products based on categories
  get items in cart
  get all products in inventory

  addProduct in inventroy
  add product in cart 
  update quantity of product in cart and inventory

  place order

  change the image object format and the way to display them based on cloudinary
*/

const handler = async (event) => {
  console.log(event.headers.fieldname);
  try {
    if (process.env.FAUNADB_ADMIN_SECRET) {
      var client = new faunadb.Client({
        secret: process.env.FAUNADB_ADMIN_SECRET,
      });

      if (event.httpMethod === "GET" && event.headers.fieldname === "getAllProducts") {
        return await getAllProducts(q, client);
      }
      else if (event.httpMethod === "POST" && event.headers.fieldname === "addProductInInventory") {
        console.log("hello");
        return await addProductInInventory(JSON.parse(event.body), q, client);
      }
      else if (event.httpMethod === "POST" && event.headers.fieldname === "addProductToCart") {
        console.log("hello");
        return await addProductToCart(JSON.parse(event.body), q, client);
      }
      else if (event.httpMethod === "GET" && event.headers.fieldname === "getProductsInCart") {
        console.log("hello");
        return await getProductsInCart(q, client);
      }
      else if (event.httpMethod === "POST" && event.headers.fieldname === "removeProductFromCart") {
        console.log("hello");
        return await removeProductFromCart(JSON.parse(event.body), q, client);
      }
      else if (event.httpMethod === "POST" && event.headers.fieldname === "updateCartProductQuantity") {
        console.log("hello");
        return await updateCartProductQuantity(JSON.parse(event.body), q, client);
      }
      
    }

  }
   catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
