import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOKS } from '../queries/queries';


function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error!</div>
  }

  if (data) {
    return (
      <ul>
        <li>MY World</li>
        { data.books.map(book => (
          <li key={book.id}>{ book.name }</li>
        )) }
      </ul>
    )
  }
}

export default BookList;
