import "./style/style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import App from "./App.jsx";
import SongList from "./components/SongList.jsx";
import SongCreate from "./components/SongCreate.jsx";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

const Root = () => {
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="songs/list" element={<SongList />} />
                    <Route path="songs/create" element={<SongCreate />} />
                </Route>
            </Routes>
        </BrowserRouter>
      </ApolloProvider>
  )
};

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);
