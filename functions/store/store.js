require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    getAllProducts: [ProductDetail]
  }

  type Mutation {
    addProductToCart(product: AddProductToCart!): CartProduct
    updateProductInCart(product: UpdateProduct!): CartProduct
    addProductInInventory(product: AddProductInInventory!): ProductDetail
  }

  input AddProductInInventory {
    categories: [String]! 
    price: Float!
    name: String!
    image: String!
    description: String! 
    currentInventory: Int!
    brand: String
  }

  input AddProductToCart {
    productId: ID!
    quantity: Int!
  }

  input UpdateProduct {
    id: ID!
    quantity: Int!
  }

  type Product {
    id: ID! 
    categories: [String]! 
    price: Float!
    name: String!
    image: String!
  }

  type ProductDetail {
    id: ID! 
    categories: [String]! 
    price: Float!
    name: String!
    image: String!
    description: String! 
    currentInventory: Int!
    brand: String
  }

  type CartProduct {
    id: ID!
    name: String!
    price: Float!
    image: String!
    quantity: Int!
  }

  type Category {
    id: ID!
    name: String!
    image: String!
    numOfItems: Int!
  }
`;

const resolvers = {
  Query: {
    getAllProducts: async (parent, args, context) => {
      try {
        // if (!user) return [];
        // else {
          if (process.env.FAUNADB_ADMIN_SECRET) {
            var client = new faunadb.Client({
              secret: process.env.FAUNADB_ADMIN_SECRET,
            });

            const result = await client.query(
              q.Map(
                q.Paginate(q.Documents(q.Collection("Products"))),
                q.Lambda((x) => q.Get(x))
              )
            );
            console.log(result);
            // return [];
            return result.data.map((product) => {
              console.log(product.ref.id);
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
          }
        // }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addProductToCart: async (_, { product }) => {
      // if (!user) throw new Error("Must be authenticated to edit");
      try {
        var client = new faunadb.Client({
          secret: process.env.FAUNADB_ADMIN_SECRET,
        });

        const result = await client.query(
          q.Create(q.Collection("Cart"), {
            data: {
              id: q.Ref(q.Collection("Products"), product.productId),
              quantity: product.quantity
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
      } catch (err) {
        console.log(err);
      }
    },
    updateProductInCart: async (_, { product }) => {
      // if (!user) throw new Error("Must be authenticated to edit");
      try {
        var client = new faunadb.Client({
          secret: process.env.FAUNADB_ADMIN_SECRET,
        });

        let result;
        let existingCartProduct;
        if (product.quantity <= 0) {
          result = await client.query(
            q.Delete(q.Ref(q.Collection("Cart"), product.id))
          );
        }
        else {
          existingCartProduct = await client.query(
            q.Get(q.Ref(q.Collection("Cart"), product.id))
          )

          console.log("Existing cart prod => ", existingCartProduct);
          
          result = await client.query(
            q.Update(q.Ref(q.Collection("Cart"), product.id), {
              data: {
                quantity: product.quantity,
              },
            })
          )
        }

        console.log(result);
        return {
          id: product.id,
          name: existingCartProduct.data.name,
          price: existingCartProduct.data.price,
          image: existingCartProduct.data.image,
          quantity: existingCartProduct.data.quantity,
        };
      } catch (err) {
        console.log(err);
      }
    },
    addProductInInventory: async (_, { product }) => {
      // if (!user) {
      //   throw new Error("Must be authenticated to insert todos");
      // }
      try {
        var client = new faunadb.Client({
          secret: process.env.FAUNADB_ADMIN_SECRET,
        });

        const result = await client.query(
          q.Create(q.Collection("Products"), {
            data: {
              categories: product.categories, 
              price: product.price,
              name: product.name,
              image: product.image,
              description: product.description, 
              currentInventory: product.currentInventory,
              brand: product.brand
            },
          })
        );

        console.log(result);
        return {
          categories: result.data.categories,
          price: result.data.price,
          name: result.data.name,
          image: result.data.image,
          description: result.data.description,
          currentInventory: result.data.currentInventory,
          brand: result.data.brand
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ context }) => {
  //   if (context.clientContext.user) {
  //     return { user: context.clientContext.user.sub };
  //   } else {
  //     return {};
  //   }
  // },
})
const handler = server.createHandler();

module.exports = { handler };