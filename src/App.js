import React, { useState, useEffect } from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { FaGem, FaRobot, FaSmile } from 'react-icons/fa';

import articleService from './services/articles';
import { Ribbon } from 'react-dev-ribbon';

const DIAMOND_TRESHOLD = 75;

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    articleService.getAll().then(allArticles => setArticles(allArticles));
  }, []);

  const togglePaywall = id => {
    const article = articles.find(a => a.id === id);
    const toggledArticle = { ...article, paywall: !article.paywall };

    articleService
      .update(id, toggledArticle)
      .then(response =>
        setArticles(articles.map(a => (a.id !== id ? a : response.data)))
      );
  };

  const columns = [
    {
      Header: 'Kone',
      sortable: false,
      accessor: 'predictedDiamond',
      Cell: props => (
        <span className="icon">
          {props.value >= DIAMOND_TRESHOLD ? (
            <FaGem />
          ) : (
            <FaGem className="dimmed" />
          )}
        </span>
      ),
      maxWidth: 70
    },
    {
      Header: 'Ihminen',
      sortable: false,
      accessor: 'paywall',
      Cell: props => (
        <span className="icon">
          {props.value ? <FaGem /> : <FaGem className="dimmed" />}
        </span>
      ),
      maxWidth: 70
    },
    {
      Header: '',
      sortable: false,
      accessor: 'id',
      Cell: props => (
        <button className="toggle" onClick={() => togglePaywall(props.value)}>
          päätä
        </button>
      ),
      maxWidth: 70
    },
    {
      Header: 'Otsikko',
      sortable: false,
      accessor: 'title'
    },
    {
      Header: 'Näyte-ennuste',
      accessor: 'predictedDiamond',
      Cell: props => <span className="number">{Math.floor(props.value)}</span>,
      maxWidth: 120
    },
    {
      Header: 'Käynnit',
      accessor: 'reads',
      Cell: props => <span className="number">{Math.floor(props.value)}</span>,
      maxWidth: 100
    },
    {
      Header: 'Rahuliennuste',
      accessor: 'predictedEuros',
      Cell: props => (
        <span className="number">{Math.floor(props.value)} €</span>
      ),
      maxWidth: 100
    }
  ];

  return (
    <div className="App">
      <Ribbon />
      <h1 className="title">
        <FaRobot /> Flywall <FaSmile />
      </h1>
      <ReactTable className="-striped" data={articles} columns={columns} />
    </div>
  );
};

export default App;
