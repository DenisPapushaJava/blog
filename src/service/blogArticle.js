import axios from 'axios';
import Cookie from 'js-cookie';

class BlogArticle {
  article = axios.create({
    baseURL: 'https://blog.kata.academy/api/',

  });
  getArticles = async (page) =>
    this.article
      .get(`articles?offset=${(page - 1) * 5}&limit=5`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookie.get('token')}` },
      })
      .then(response => response.data);
  getArticle = async (slug) =>
    this.article
      .get(`articles/${slug}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookie.get('token')}` },
      })
      .then((response) => response.data);
  createArticle = async (title, description, body, tagList) =>
    this.article
      .post(
        'articles',
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },

        {
          headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookie.get('token')}` },
        },
      )
      .then((response) => response.data);
  editArticle = async (slug, title, description, body, tagList) =>
    this.article
      .put(
        `articles/${slug}`,
        {
          article: {
            title,
            description,
            body,
            tagList,
          },
        },
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookie.get('token')}` },
        },
      )
      .then((res) => res.data);
  deleteArticle = async (slug) =>
    this.article
      .delete(`articles/${slug}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookie.get('token')}` },
      })
      .then((res) => res.data);

  setFavorite = async (slug) =>
    this.article
      .post(
        `articles/${slug}/favorite`,
        {},
        {
          headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookie.get('token')}` },
        },
      )
      .then((res) => res.data);
  deleteFavorite = async (slug) =>
    this.article
      .delete(`articles/${slug}/favorite`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookie.get('token')}` },
      })
      .then((res) => res.data);
}

const blogArticle = new BlogArticle();
export {blogArticle};


