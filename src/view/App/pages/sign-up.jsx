import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { Input, Checkbox, Button } from 'antd';

import * as Yup from 'yup';

const SignUp = () => {
  const checkInput = Yup.object().shape({
    email: Yup.string().required('Поле "Email" должно быть заполнено').email('Email не верный'),
    password: Yup.string()
      .min(6, 'Поле "Password" не должно содержать менее 6 символов')
      .max(20, 'Поле "Password" не должно содержать более 40 символов')
      .required('Поле "Password" должно быть заполнено'),
  });
  console.log(checkInput);
  return (
    <div className={styles.container}>
      <h3 className={styles.containerTitle}>
        Create new account
      </h3>
      <form>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Username
          </p>
          <input placeholder='Username' />
        </label>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Email address
          </p>
          <input placeholder='Email address' />
        </label>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Password
          </p>
          <input placeholder='Password' />
        </label>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Repeat Password
          </p>
          <input placeholder='Password' />
        </label>
        <label className={styles.containerLabel}>
          <input type='checkbox' /> <span>I agree to the processing of my personal
        information</span>
        </label>
        <Button type='primary'
                className={styles.containerButton}
                size='large'
        >Create</Button>
        <p className={styles.containerFooter}>
          Already have an account?<Link to='/sign-in'> Sign In.</Link>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
