import { useForm } from 'react-hook-form';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { Button } from 'antd';


const SignUpForm = () => {

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const password = watch('password', '');
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const onSubmit = (data) => {
    submit(data);
    reset();
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.containerTitle}>
        Create new account
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Username
          </p>
          <input placeholder='Username'
                 {...register('username', {
                     required: 'Поле обязательно к заполнению',
                     minLength: {
                       value: 3,
                       message: 'Не менее 3 символов',
                     },
                     maxLength: {
                       value: 20,
                       message: 'Не более 20 символов',
                     },

                   },
                 )}
          />
          {errors.username && <div className={styles.containerLabelError}>{errors.username.message}</div>}
        </label>
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
                 {...register('password', {
                     required: 'Поле обязательно к заполнению',
                     minLength: {
                       value: 6,
                       message: 'Не менее 6 символов',
                     },
                     maxLength: {
                       value: 40,
                       message: 'Не более 40 символов',
                     },
                   },
                 )}
          />
          {errors.password && <div className={styles.containerLabelError}>{errors.password.message}</div>}
        </label>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Repeat Password
          </p>
          <input placeholder='Password'
                 {...register('repeatPassword', {
                   required: 'Поле обязательно к заполнению',
                   validate: (value) => value === password || 'Пароли должны совпадать',
                 })}
          />
          {errors.repeatPassword && <div className={styles.containerLabelError}>{errors.repeatPassword.message}</div>}
        </label>
        <label className={styles.containerLabel}>
          <input type='checkbox'
                 {...register('agreement', {
                   required: 'Вы должны согласиться с обработкой ваших данных',
                 })}
          /> <span>I agree to the processing of my personal
        information</span>
          {errors.agreement && <div className={styles.containerLabelError}>{errors.agreement.message}</div>}
        </label>
        <Button type='primary'
                className={styles.containerButton}
                htmlType='submit'
                size='large'
        >Create</Button>
        <p className={styles.containerFooter}>
          Already have an account?<Link to='/sign-in'> Sign In.</Link>
        </p>
      </form>
    </div>
  );
};
export default SignUpForm;
