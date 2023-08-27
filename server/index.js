const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema/type-defs");
const {resolvers } = require("./schema/resolver");
const mongoose = require("mongoose");

const MONGO_URL = "mongodb://localhost:27017/BookingHall"

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db Connected");
}).catch( err  => console.log(err.message))

const server = new ApolloServer( { typeDefs, resolvers } );

startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });