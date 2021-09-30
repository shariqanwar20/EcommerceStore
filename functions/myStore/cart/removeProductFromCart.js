const removeProductFromCart = async (input, q, client) => {
  console.log(input)
  try {
    const result = await client.query(
      q.Delete(q.Ref(q.Collection("Cart"), input.id))
    )

    console.log(result)
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { removeProductFromCart }
