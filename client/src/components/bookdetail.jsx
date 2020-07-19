import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOK } from '../queries/queries';


const BookDetail = ({ bookId }) => {
  
  const { data } = useQuery(GET_BOOK, {
    variables: { id: bookId }
  });

  
  if (data && data.book) {
    const book = data.book;
    return (
      <div id="book-details">
        <h2>{ book.name }</h2>
        <p>{ book.genre }</p>
        <p>{ book.author.name }</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          { book.author.books.map(item => {
            return <li key={ item.id }>{ item.name }</li>
          })}
        </ul>
      </div>
    )
  } else {
    return (
      <div>No book selected...</div>
    )
  }
}

export default BookDetail;
