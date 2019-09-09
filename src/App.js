import React from 'react';
import { FaRobot, FaRegSmileWink, FaGem, FaRegGem } from 'react-icons/fa';
import { Ribbon } from 'react-dev-ribbon';
import ArticleTable from './components/ArticleTable';

const App = () => {
  return (
    <div className="App">
      <Ribbon />
      <h1 className="title">
        <FaGem />
        &nbsp;
        <FaRobot /> HS Flywall <FaRegSmileWink />
        &nbsp;
        <FaRegGem />
      </h1>
      <ArticleTable />
    </div>
  );
};

export default App;
