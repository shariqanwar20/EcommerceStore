const getAllProducts = async (q, client) => {

    const result = await client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection("Products"))),
            q.Lambda((x) => q.Get(x))
        )
    );
    console.log(result);
    const products = result.data && result.data.map((product) => {
        //   console.log(product.ref.id);
        return {
            id: product.ref.id,
            categories: product.data.categories,
            price: product.data.price,
            name: product.name,
            image: product.image,
            description: product.description,
            currentInventory: product.currentInventory,
            brand: product.brand
        };
    });
    return {
        statusCode: 200,
        body: JSON.stringify(products),
    };
}


module.exports = { getAllProducts }