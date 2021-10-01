const addProductToCart = async (input, q, client) => {
  // console.log(input);
    try {
        const result = await client.query(
            q.Create(q.Collection("Cart"), {
              data: {
                productId: input.id,
                name: input.name,
                image: input.image,
                price: input.price,
                quantity: input.quantity
              }
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

module.exports = { addProductToCart }