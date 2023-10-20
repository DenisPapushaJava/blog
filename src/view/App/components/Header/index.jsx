import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../../store/user-slice.js';
import baseAvatar from '../../../../assets/avatarDefolt.png';

import { PATH } from '../../../../constans/index.js';

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const userName = useSelector((state) => state.user.username);
  const avatarUrl = useSelector((state) => state.user.image);
  const pathAvatar = avatarUrl ? avatarUrl : baseAvatar;
  const statusUser = useSelector((state) => state.user.status);
  const statusArticle = useSelector((state) => state.articles.status);

  return (<div className={styles.headerWrapper}>
    <Link to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : '/'}>Realworld Blog</Link>
    <nav className={styles.headerWrapperButton}>
      {!isLogin && (
        <>
          <Link to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : `/${PATH.singIn}`}
                className={styles.headerWrapperButtonActive}>Sign In</Link>
          <Link to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : `/${PATH.singUp}`}
                className={styles.headerWrapperButtonActive}>Sign Up</Link>
        </>
      )}
      {isLogin && (
        <>
          <Link to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : `/${PATH.newArticle}`}
                className={styles.headerWrapperButtonCreate}
          >
            Create article
          </Link>
          <p>{userName}</p>
          <Link to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : `/${PATH.profile}`}>
            <Avatar src={pathAvatar} />
          </Link>
          <Button onClick={() => dispatch(logOut())}>
            Log Out
          </Button>
        </>
      )}

    </nav>
  </div>);
};
export default Header;
