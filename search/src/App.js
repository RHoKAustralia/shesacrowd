import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {InstantSearch, Hits} from 'react-instantsearch-dom';

import logo from './logo.svg';
import './App.css';

function Search() {
    return (
        <div className="container">
            <Hits/>
        </div>
    );
}

const App = () => (
    <InstantSearch
        appId="664666TT3X"
        apiKey="e16aa90f340ca104cb32b7d8c7e98e8c"
        indexName="dev_incidents"
    >
        <Search/>
    </InstantSearch>
);

export default App;
