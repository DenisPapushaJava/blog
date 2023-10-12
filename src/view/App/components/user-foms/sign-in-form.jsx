import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './style.module.scss';
import { Button } from 'antd';


const SignInForm = ({submit}) => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const onSubmit = (data) => {
    submit(data);
    reset();
  };


  return (
    <div className={styles.container}>
      <h3 className={styles.containerTitle}>
        Sign In
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Email address
          </p>
          <input placeholder='Email address'
                 {...register('email', {
                     required: 'Поле обязательно к заполнению',
                     pattern: {
                       value: emailRegex,
                       message: 'Введите корректный email',
                     },
                   },
                 )}
          />
          {errors.email && <div className={styles.containerLabelError}>{errors.email.message}</div>}
        </label>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Password
          </p>
          <input placeholder='Password'
                 type='password'
                 {...register('password', {
                     required: 'Поле обязательно к заполнению',
                   },
                 )}
          />
          {errors.password && <div className={styles.containerLabelError}>{errors.password.message}</div>}
        </label>
        <Button type='primary'
                htmlType='submit'
                className={styles.containerButton}
        >Login
        </Button>
        <p className={styles.containerFooter}>
          Don’t have an account?<Link to='/sign-up'> Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};
export default SignInForm;
