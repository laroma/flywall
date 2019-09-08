import React from 'react';
import { FaRobot, FaRegSmileWink } from 'react-icons/fa';
import { Ribbon } from 'react-dev-ribbon';
import ArticleTable from './components/ArticleTable';

const App = () => {
  return (
    <div className="App">
      <Ribbon />
      <h1 className="title">
        <FaRobot /> HS Flywall <FaRegSmileWink />
      </h1>
      <ArticleTable />
    </div>
  );
};

export default App;
