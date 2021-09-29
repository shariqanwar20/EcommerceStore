import inventory from './inventory'
import axios from 'axios'

/*
Inventory items should adhere to the following schema:
type Product {
  id: ID! 
  categories: [String]! 
  price: Float!
  name: String!
  image: String!
  description: String! 
  currentInventory: Int!
  brand: String
  sku: ID
}
*/

/* fetch all products from strapi where each product has the above format */
async function fetchInventory() {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products` || "http://localhost:1337/products");
  // // console.log(response);
  // const data = await response.json();

  const inventory = await axios.get("http://localhost:8888/.netlify/functions/myStore", {
    headers: {
      "fieldName": "getAllProducts"
    }
  })

  // console.log(i);
  // const inventory = data.map((item) => {
  //   return {
  //     id: item.id,
  //     name: item.title,
  //     description: item.description,
  //     categories: item.categories.map((category) => (
  //       category.name
  //     )),
  //     brand: item.brand,
  //     currentInventory: item.currentInventory,
  //     price: item.price,
  //     image: item.image

  //   }
  // })

  return Promise.resolve(inventory.data)
}

export {
  fetchInventory, inventory as staticInventory
}