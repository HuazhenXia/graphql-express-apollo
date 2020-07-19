import { gql } from 'apollo-boost';


const GET_BOOKS = gql`
  {
    books {
      id,
      name,
      genre
    }
  }
`;

const GET_AUTHOR = gql`
  {
    authors {
      name
      id
    }
  }
`;

const ADD_BOOK = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;


export {
  GET_BOOKS,
  GET_AUTHOR,
  ADD_BOOK
}
