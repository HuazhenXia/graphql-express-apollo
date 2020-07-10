const graphql = require('graphql');

const { GraphQLObjectType, GraqhQLString, GraqhQLSchema } = require('graphql');

const BookType = GraphQLObjectType({
  name: "Book",
  field: () => ({
    id: { type: GraqhQLString },
    name: { type: GraqhQLString },
    genre: { type: GraqhQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  field: {
    book: {
      type: BookType,
      args: { id: { type: GraqhQLString } },
      resolve(parent, args) {
        // get data
      }
    }
  }
})

module.exports = new GraqhQLSchema({
  query: RootQuery
});
