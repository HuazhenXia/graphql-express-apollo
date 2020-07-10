const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema } = require('graphql');

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const books = [
  { name: "Alogrithm", genre: "CS", id: "1" },
  { name: "Network", genre: "CS", id: "2" },
  { name: "World History", genre: "History", id: "3" }
]

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // get data
        console.log(args)
        return _.find(books, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
