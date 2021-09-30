const getProductsInCart = async (q, client) => {

    try {
        const result = await client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection("Cart"))),
                q.Lambda((x) => q.Get(x))
            )
        );
        const products = result.data && result.data.map((product) => {
            return {
                id: product.ref.id,
                productId: product.data.productId,
                price: product.data.price,
                name: product.data.name,
                image: product.data.image,
                quantity: product.data.quantity
            };
        });
        return {
            statusCode: 200,
            body: JSON.stringify(products),
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
    
}


module.exports = { getProductsInCart }