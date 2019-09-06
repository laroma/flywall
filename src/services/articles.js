import axios from 'axios';

const baseUrl = 'http://localhost:3001/articles';

const getAll = () => axios.get(baseUrl).then(response => response.data);

const update = (id, updatedArticle) =>
  axios.put(`${baseUrl}/${id}`, updatedArticle);

export default { getAll, update };
