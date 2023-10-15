import { useSelector } from 'react-redux';
import { Space, Spin } from 'antd';
import { ArticleFull } from '../components/ArticleFull/index.jsx';


const SinglArticle = () => {
  const err = useSelector((state) => state.articles.error);
  const status = useSelector((state) => state.articles.status);

  return (
    <Space
      direction='vertical'
      size='middle'
      style={{
        display: 'flex',
      }}
      align='center'
    >
      {status === 'loading' && <Spin size='large' />}
      {status === 'rejected' && <h1>{err}</h1>}
      <ArticleFull />
    </Space>
  );
};
export { SinglArticle };
