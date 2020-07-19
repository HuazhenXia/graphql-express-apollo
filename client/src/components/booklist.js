import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const GET_BOOKS = gql`
  {
    books {
      id,
      name
    }
  }
`;

function BookList(props) {
  const { data } = useQuery(GET_BOOKS);

  if (data) {
    return (
      <ul>
        <li>MY World</li>
        { data.books.map(book => (
          <li key={book.id}>{ book.name }</li>
        )) }
      </ul>
    )
  } else {
    return <div>No Data</div>;
  }
}

export default BookList;
