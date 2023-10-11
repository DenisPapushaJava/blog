import axios from 'axios';
import Cookie from 'js-cookie';

class BlogUser {
  user = axios.create({
    baseURL: 'https://blog.kata.academy/api/',
  });

  singUpUser = async (username, email, password) =>
    this.user.post('users', { user: { username, email, password } }).then((res) => res.data);

  loginUser = async (email, password) =>
    this.user.post('users/login', { user: { email, password } }).then((res) => res.data);

  updateUserProfile = async (username, email, password, image) =>
    this.user
      .put(
        'user',
        { user: { username, email, password, image } },
        { headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookie.get('token')}` } }
      )
      .then((res) => res.data);

  getCurrentUser = async () =>
    this.user
      .get('user', {
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${Cookie.get('token')}` },
      })
      .then((res) => res.data);
}

const blogUser = new BlogUser();
export { blogUser };
