import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import styles from './style.module.scss';
import validUrl from 'valid-url';


const EditProfileForm = ({ submit, user }) => {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      image: user?.image,
    },
  });
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const onSubmit = (data) => {
    submit(data);
    reset();
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.containerTitle}>
        Edit Profile
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Username
          </p>
          <input placeholder='Username'
                 type='text'
                 autoComplete='username'
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
                 type='password'
                 autoComplete='current-password'
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
            Avatar image (url)
          </p>
          <input placeholder='Avatar image'
                 {...register('image', {
                     required: 'Поле обязательно к заполнению',
                     validate: {
                       validUrl: (value) => validUrl.isWebUri(value) ? true : 'Некорректный URL',
                     },
                   },
                 )}
          />
          {errors.image && <div className={styles.containerLabelError}>{errors.image.message}</div>}
        </label>


        <Button type='primary'
                className={styles.containerButton}
                htmlType='submit'
                size='large'
        >Save</Button>

      </form>
    </div>
  );
};
export default EditProfileForm;
