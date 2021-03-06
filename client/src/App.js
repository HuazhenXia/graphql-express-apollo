import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import BookList from './components/booklist.jsx';
import AddBook from './components/addbook.jsx';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div id="main">
          <AddBook />
          <h1>Reading List</h1>
          <BookList />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
