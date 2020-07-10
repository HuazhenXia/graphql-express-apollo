const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = require('graphql');


const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id })
      }
    }
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type:GraphQLID },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(_.find(authors, { id: parent.authorId }))
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
});

// A book has A author. A Author has many books
const books = [
  { name: "Alogrithm", genre: "CS", id: "1", authorId: '1' },
  { name: "Network", genre: "CS", id: "2", authorId: '2' },
  { name: "World History", genre: "History", id: "3", authorId: '3' },
  { name: "Human History", genre: "History", id: "4", authorId: '3' },
  { name: "Bird History", genre: "History", id: "5", authorId: '3' }
]

const authors = [
  { name: "Ben", age: 27, id: "1" },
  { name: "Lily", age: 30, id: "2" },
  { name: "James", age: 21, id: "3" },
];

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // get data logic
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors;
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
