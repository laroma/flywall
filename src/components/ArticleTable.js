import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { FaGem, FaRegGem } from 'react-icons/fa';
import articleService from '../services/articles';

import config from '../config/config';

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

  const flywall = x => x >= config.diamondTreshold;

  const getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      const row = rowInfo.row;
      return {
        className:
          flywall(row.predictedDiamond) && !row.paywall ? 'flywall' : ''
      };
    }
    return {};
  };

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
      maxWidth: 80,
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
      maxWidth: 80,
      className: 'text-center'
    },
    {
      Header: 'Otsikko',
      sortable: false,
      accessor: 'title',
      Cell: row => (
        <span className={row.original.paywall ? 'paywall' : ''}>
          {row.value}
        </span>
      ),
      className: 'text-left'
    },
    {
      Header: 'Näyte-ennuste',
      accessor: 'predictedDiamond',
      Cell: row => <span className="number">{Math.floor(row.value)}</span>,
      maxWidth: 130,
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
      maxWidth: 130,
      className: 'text-left'
    }
  ];

  return (
    <ReactTable data={articles} columns={columns} getTrProps={getTrProps} />
  );
};

export default ArticleTable;
