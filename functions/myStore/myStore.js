// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
var faunadb = require("faunadb");
const {getAllProducts} = require("./getAllProducts");
var q = faunadb.query;

require("dotenv").config();

const handler = async (event) => {
  try {
    if (process.env.FAUNADB_ADMIN_SECRET) {
      var client = new faunadb.Client({
        secret: process.env.FAUNADB_ADMIN_SECRET,
      });

      if (event.httpMethod === "GET" && event.headers.fieldname === "getAllProducts") {
        return await getAllProducts(q, client);
      }
    }

  }
   catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
