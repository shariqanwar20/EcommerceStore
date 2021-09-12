const addProductToCart = async (input, q, client) => {
    try {
        const result = await client.query(
            q.Create(q.Collection("Cart"), {
              data: {
                id: q.Ref(q.Collection("Products"), input.productId),
                quantity: input.quantity
              }
            })
          );
  
          console.log(result);
          return {
            name: "hi",
            price: 24.86,
            image: "https://cloudinary.com/uploads/image",
            quantity: 4
          }
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
}