import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const GET_AUTHOR_QUERY = gql`
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

function AddBook() {
  const { data } = useQuery(GET_AUTHOR_QUERY);
  const [addBook] = useMutation(ADD_BOOK);

  let [name, setName] = useState('');
  let [genre, setGenre] = useState('');
  let [author, setAuthor] = useState('');

  const getAuthors = () => {
    if (data) {
      return data.authors.map(author => {
        return (
          <option key={ author.id } value={ author.id }>
            { author.name }
          </option>
        )
      })
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    addBook({ variables: {
      name, genre, authorId: author
    } });
    setAuthor('');
    setGenre('');
    setName('');
  }

  return (
    <form onSubmit={ submitHandler }>
      <div className="field">
        <label>Book name:</label>
        <input type="text"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text"
          value={ genre }
          onChange={ (e) => setGenre(e.target.value) }
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select value={ author }
          onChange={ (e) => setAuthor(e.target.value) }
        >
          <option>Select author</option>
          { getAuthors() }
        </select>
      </div>
      <button>Add</button>
    </form>
  );
}

export default AddBook;
