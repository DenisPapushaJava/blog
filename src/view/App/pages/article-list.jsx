import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchArticles } from '../../../store/articles-slice.js';
import { Pagination, Space, Spin } from 'antd';
import Article from '../components/Article/index.jsx';


const ArticleList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const countArticles = useSelector((state) => state.articles.count);
  const err = useSelector((state) => state.articles.error);
  const status = useSelector((state) => state.articles.status);
  const isLogin = useSelector((state) => state.user.isLogin);
  const articles = useSelector((state) => state.articles.articles);

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [dispatch, page, isLogin]);


  const elmentsArticles = status === 'resolved' ? articles.map((article) => <Article article={article}
                                                                                     key={article.slug} />) : null;

  const handleChang = (current) => {
    setPage(current);
  };
  return (
    <Space
      direction='vertical'
      size='middle'
      align='center'
      style={{
        display: 'flex',
      }}
    >
      {status === 'loading' ? <Spin size='large' /> :
        <>
          {elmentsArticles}
          <Pagination defaultCurrent={page}
                      total={countArticles}
                      showSizeChanger={false}
                      pageSize={5}
                      onChange={handleChang}
                      style={{
                        display: 'flex',
                        wrap: 'nowrap',
                        margin: '0 500px',
                      }}
          />
        </>
      }
    </Space>
  );
};
export { ArticleList };
