const axios = require('axios');
const BASE_URL = 'https://afternoon-caverns-78721.herokuapp.com/api';

export const fetchAllArticles = async () => {
  const { data } = await axios.get(`${BASE_URL}/articles`);
  return data;
};

export const fetchQueryArticles = async (query, direction, page) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/?sort_by=${query}&${direction}&p=${page}`
  );
  return data;
};

export const fetchSingleArticle = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
  return data;
};

export const fetchArticleComments = async (id, query, direction, page) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${id}/comments?sort_by=${query}&${direction}&p=${page}`
  );
  return data;
};

export const fetchAllTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics?limit=1000`);
  return data;
};

export const fetchTopicArticles = async (slug, query, direction, page) => {
  const { data } = await axios.get(
    `${BASE_URL}/topics/${slug}/articles?sort_by=${query}&${direction}&p=${page}`
  );
  return data;
};

export const fetchSingleUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data;
};

export const updateVotes = async (id, loc, voteVal) => {
  const voteupdate = { inc_votes: voteVal };
  const { data } = await axios.patch(`${BASE_URL}/${loc}/${id}`, voteupdate);
  return data;
};

export const addArticle = async post => {
  const postData = {
    body: post.body,
    title: post.title,
    username: post.username
  };
  const { data } = await axios.post(
    `${BASE_URL}/topics/${post.topic}/articles`,
    postData
  );
  return data;
};

export const deleteItem = async (id, loc) => {
  const { data } = await axios.delete(`${BASE_URL}/${loc}/${id}`);
  return data;
};

export const addComment = async (post, id) => {
  const postData = {
    body: post.body,
    username: post.username
  };
  const { data } = await axios.post(
    `${BASE_URL}/articles/${id}/comments`,
    postData
  );
  return data;
};

export const addTopic = async post => {
  const postData = {
    slug: post.slug,
    description: post.description
  };
  const { data } = await axios.post(`${BASE_URL}/topics`, postData);
  return data;
};

export const fetchAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data;
};
