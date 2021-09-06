import inventory from './inventory'

/*
Inventory items should adhere to the following schema:
type Product {
  id: ID! - done
  categories: [String]! -done
  price: Float!
  name: String!- done
  image: String!
  description: String! - done
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

  // // console.log(data);
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

  return Promise.resolve(inventory)
}

export {
  fetchInventory, inventory as staticInventory
}