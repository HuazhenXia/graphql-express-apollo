import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOKS } from '../queries/queries';
import BookDetail from './bookdetail';

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  let [selectedBook, setSelectedBook] = useState(null);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error!</div>
  }

  if (data) {
    return (
      <div>
        <ul id="book-list">
          <li>MY World</li>
          { data.books.map(book => (
            <li key={book.id} onClick={() => {setSelectedBook(book.id)} }>
              { book.name }
              </li>
          )) }
        </ul>
        <BookDetail bookId={ selectedBook }/>
      </div>

    )
  }
}

export default BookList;
