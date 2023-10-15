import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchArticleSingle } from '../../../../store/articles-slice.js';
import Article from '../Article/index.jsx';
import ReactMarkdown from 'react-markdown';
import styles from './index.module.scss';


const ArticleFull = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const article = useSelector((state) => state.articles.articleSingle);
  const status = useSelector((state) => state.articles.status);

  const elements = status === 'resolved' && article ? (
    <div className={styles.article}>
      <Article article={article} editButton={true} />
      <ReactMarkdown className={styles.articleText}>{article.body}</ReactMarkdown>
    </div>
  ) : null;
  useEffect(() => {
    dispatch(fetchArticleSingle(slug));
  }, [dispatch, slug]);

  return <>{elements}</>;
};
export { ArticleFull };
