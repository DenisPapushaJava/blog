import { Tag, Avatar } from 'antd';

import noLike from '../../../../assets/noLike.svg';
import avatarDefault from '../../../../assets/avatarDefolt.png';
import like from '../../../../assets/like.svg';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../../../store/articles-slice.js';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

const Article = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const countArticles = useSelector((state) => state.articles.count);
  const err = useSelector((state) => state.articles.error);
  const status = useSelector((state) => state.articles.status);
  const isLogin = useSelector((state) => state.user.isLogin);
  const articles = useSelector((state) => state.articles.articles);
  console.log(articles);

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [dispatch, page, isLogin]);

  return (
    <>
      {articles.map(article =>
        <div className={styles.article}>
          <div className={styles.articleLeft}>
            <div className={styles.articleLeftTitle}>
              <h1>
                <a href='#'>
                  {article.title}
                </a>
              </h1>
              <button className={styles.articleLeftButtonLike}>
                <img src={ noLike} alt='like' />
              </button>
              <span className={styles.articleLeftLikesCount}>{article.favoritesCount}</span>
            </div>
            <>
              {article.tagList.map(el =>
                <Tag className={styles.articleLeftTag}>{el}</Tag>,
              )}
            </>

            <p className={styles.articleLeftText}>{article.body}</p>
          </div>
          <div className={styles.articleRight}>
            <div className={styles.articleRightInfo}>
              <p className={styles.articleRightInfoName}>
                {article.author.username}
              </p>
              <p className={styles.articleRightInfoDate}>
                {format(new Date(article.createdAt), 'MMMM d, yyyy', {
                  locale: enGB,
                })}
              </p>
            </div>
            <Avatar className={styles.articleRightAvatar} size='large' src={article.author.image} />
          </div>
        </div>,
      )}
    </>


  );
};
export default Article;
