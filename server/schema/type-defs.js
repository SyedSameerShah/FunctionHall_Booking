const gql = require("graphql-tag");

const typeDefs = gql`

type Query {
    halls: [ hall! ]!
    searchHall(name:String): [hall]!
    hall( id:ID! ): hall!
    price( price: Int, location:locationInput, date:String ) : [hall!]!
    isdate( id:ID!,date:String ): Boolean
}

type Mutation {
    addDate(input: dateInput): Boolean!
}

input dateInput {
    id:ID!
    date:String!
   
}

input locationInput {
    city: String
    state: String
}

type location {
    city: String
    state: String
}



type hall {
    id: ID!
    name: String!
    price: Int
    discription:String
    occupency:String
    cuisine:String
    location: location!
    bookings: [String]!
}

`;

module.exports = { typeDefs };