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
  const inventory = await axios.get("http://itus.netlify.app/.netlify/functions/myStore", {
    headers: {
      "fieldName": "getAllProducts"
    }
  })

  // console.log("Inventory => ", inventory.data);

  return Promise.resolve(inventory.data)
}

export {
  fetchInventory, inventory as staticInventory
}