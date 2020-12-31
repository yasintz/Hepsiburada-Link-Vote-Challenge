import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from 'react-query';
import { getLinks } from './services/api';

function App() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'score' | 'date'>('score');
  const { isLoading, isError, data } = useQuery(
    ['getLinks', page, sortBy],
    () => getLinks({ sortBy, page, order: 'desc' })
  );

  console.log({ isLoading, isError, data });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
