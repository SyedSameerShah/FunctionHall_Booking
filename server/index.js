const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./schema/type-defs");
const {resolvers } = require("./schema/resolver");
const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://sameershah96636:jDbS1UhI7CR6oRy4@cluster0.w8hz7yl.mongodb.net/BookingHall?retryWrites=true&w=majority"

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

  // 