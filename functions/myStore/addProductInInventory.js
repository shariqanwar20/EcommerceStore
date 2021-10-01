const addProductInInventory = async (input, q, client) => {
    try {
        const result = await client.query(
            q.Create(q.Collection("Products"), {
              data: {
                categories: input.categories, 
                price: input.price,
                name: input.name,
                image: input.image,
                description: input.description, 
                currentInventory: input.currentInventory,
                brand: input.brand
              },
            })
          );
  
          // console.log(result);
          return {
            statusCode: 200,
            body: JSON.stringify(result)
          };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
}

module.exports = { addProductInInventory }