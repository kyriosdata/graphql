import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

const Root = () => {
  return (
      <ApolloProvider client={client}>
        <div>Lyrical</div>
      </ApolloProvider>
  )
};

ReactDOM.render(<Root />, document.querySelector('#root')
);
