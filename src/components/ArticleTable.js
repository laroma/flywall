import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { FaGem, FaRegGem } from 'react-icons/fa';
import articleService from '../services/articles';

const ArticleTable = () => {
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
  const DIAMOND_TRESHOLD = 75;
  const flywall = x => x >= DIAMOND_TRESHOLD;
  const columns = [
    {
      Header: 'Kone',
      sortable: false,
      accessor: 'predictedDiamond',
      Cell: row => (
        <div className="icon">
          {flywall(row.value) ? <FaGem /> : <FaGem className="dimmed" />}
        </div>
      ),
      maxWidth: 70,
      className: 'text-center'
    },
    {
      Header: 'Ihminen',
      sortable: false,
      accessor: 'paywall',
      Cell: row => (
        <div
          className={'icon toggle'}
          onClick={() => togglePaywall(row.original.id)}
        >
          {row.value ? <FaRegGem /> : <FaRegGem className="dimmed" />}
        </div>
      ),
      maxWidth: 70,
      className: 'text-center'
    },
    {
      Header: 'Otsikko',
      sortable: false,
      accessor: 'title',
      Cell: row => (
        <span
          className={
            row.original.paywall
              ? 'paywall'
              : flywall(row.original.predictedDiamond)
              ? 'flywall'
              : ''
          }
        >
          {row.value}
        </span>
      ),
      className: 'text-left'
    },
    {
      Header: 'Näyte-ennuste',
      accessor: 'predictedDiamond',
      Cell: row => <span className="number">{Math.floor(row.value)}</span>,
      maxWidth: 120,
      className: 'text-left'
    },
    {
      Header: 'Käynnit',
      accessor: 'reads',
      Cell: row => <span className="number">{Math.floor(row.value)}</span>,
      maxWidth: 100,
      className: 'text-left'
    },
    {
      Header: 'Rahuliennuste',
      accessor: 'predictedEuros',
      Cell: row => <span className="number">{Math.floor(row.value)} €</span>,
      maxWidth: 100,
      className: 'text-left'
    }
  ];

  return <ReactTable className="-striped" data={articles} columns={columns} />;
};

export default ArticleTable;
