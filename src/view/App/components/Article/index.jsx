import { Tag, Avatar, message, Popconfirm, Checkbox, Button } from 'antd';

import noLike from '../../../../assets/noLike.svg';
import like from '../../../../assets/like.svg';
import styles from './index.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDeleteArticle,
  fetchDeleteFavorites,
  fetchFavorites,
} from '../../../../store/articles-slice.js';
import { format } from 'date-fns';
import { v4 } from 'uuid';
import { enGB } from 'date-fns/locale';
import { Link, useNavigate } from 'react-router-dom';

const Article = ({ article, editButton }) => {

  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.username);
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();

  const [favoriteChecked, setFavoriteChecked] = useState(article?.favorited || false);
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount);

  const onChecked = (event) => {
    if (event.target.click && !favoriteChecked) {
      dispatch(fetchFavorites(article.slug));
      setFavoriteChecked(true);
      setFavoriteCount(favoriteCount + 1);
    } else {
      dispatch(fetchDeleteFavorites(article.slug));
      setFavoriteChecked(false);
      setFavoriteCount(favoriteCount - 1);
    }
  };

  const confirm = () => {
    dispatch(fetchDeleteArticle()).then(() => {
      message.success('Article delete');
      return navigate('/', { replace: true });
    });
  };
  const cancel = () => {
    message.error('Article not delete');
  };
  const elementsTag = article.tagList.map(el =>
    <Tag key={v4()} className={styles.articleLeftTag}>{el}</Tag>,
  );
  return (
    <>
      <div className={styles.article}>
        <div className={styles.articleLeft}>
          <div className={styles.articleLeftTitle}>
            <h1 className={styles.articleLeftTitleText}>
              <Link to={`/articles/${article.slug}`}>
                {article.title}
              </Link>
            </h1>
            <label className={styles.articleFaforite}>
              <Checkbox
                className={styles.articleLeftButtonLike}
                disabled={!isLogin}
                style={{ display: 'none' }}
                onClick={(event) => onChecked(event)}>
              </Checkbox>
              <img src={!favoriteChecked ? noLike : like} alt='like' />
            </label>

            <span className={styles.articleLeftLikesCount}>{favoriteCount}</span>
          </div>
          <>
            {elementsTag}
          </>
          <p className={styles.articleLeftText}>{article.description}</p>


        </div>
        <div className={styles.articleRight}>
          <div className={styles.articleRightTop}>
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
          <div className={styles.articleRightBottom}>
            {editButton && userName === article.author.username && (
              <>
                <Popconfirm
                  title='Are you sure to delete this article?'
                  description='Are you sure to delete this article?'
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText='Yes'
                  cancelText='No'
                  placement={'right'}
                >
                  <Button danger>
                    Delete
                  </Button>
                </Popconfirm>
                <Link className={styles.articleRightBottomEdit} to={`/articles/${article.slug}/edit`}>
                  Edit
                </Link>

              </>
            )}
          </div>

        </div>
      </div>
    </>


  );
};
export default Article;
