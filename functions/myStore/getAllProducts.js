const getAllProducts = async (q, client) => {

    try {
        const result = await client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection("Products"))),
                q.Lambda((x) => q.Get(x))
            )
        );
        const products = result.data && result.data.map((product) => {
            return {
                id: product.ref.id,
                categories: product.data.categories,
                price: product.data.price,
                name: product.data.name,
                image: product.data.image,
                description: product.data.description,
                currentInventory: product.data.currentInventory,
                brand: product.data.brand
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


module.exports = { getAllProducts }