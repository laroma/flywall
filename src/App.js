import React from 'react';
import { FaRobot, FaRegSmileWink, FaGem, FaRegGem } from 'react-icons/fa';
import { DismissibleRibbon } from 'react-dev-ribbon';
import ArticleTable from './components/ArticleTable';
import config from './config/config';

const App = () => {
  return (
    <div className="App">
      <DismissibleRibbon children={'DEMO'} />
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
