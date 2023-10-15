import { useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { Button } from 'antd';
import { useState } from 'react';
import { v4 } from 'uuid';


const ArticleForm = ({ title = 'Create new article', submit, article }) => {


  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm(
    {
      defaultValues: {
        title: article?.title,
        description: article?.description,
        text: article?.body,
      },
    },
  );

  const [tagList, setTagList] = useState(
    article?.tagList.map((tag) => ({ text: tag, id: v4() })) || [{ text: '', id: v4() }],
  );

  const addTag = () => {
    setTagList((state) => [...state, { text: '', id: v4() }]);
  };
  const removeTag = (id) => {
    setTagList((state) => state.filter((tag) => tag.id !== id));
  };
  const Tag = ({ removeTag, register, id, text }) => {
    return (
      <label className={styles.containerLabelTag}>
        <input
          id={id}
          defaultValue={text}
          placeholder='Tag'
          {...register(id)}
        />
        <Button
          onClick={removeTag}
          danger>
          Delete
        </Button>
      </label>
    );
  };
  const tags = tagList.map((tag) => (
    <Tag key={tag.id} removeTag={() => removeTag(tag.id)} register={register} id={tag.id} text={tag.text} />
  ));

  const onSubmit = (data) => {
    submit(data);
    reset();
  };


  return (
    <div className={styles.container}>
      <h3 className={styles.containerTitle}>
        {title}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Title
          </p>
          <input placeholder='Title'
                 {...register('title', {
                     required: 'Поле обязательно к заполнению',
                   },
                 )}
          />
          {errors.title && <div className={styles.containerLabelError}>{errors.title.message}</div>}
        </label>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Short description
          </p>
          <input placeholder='Title'
                 {...register('description', {
                     required: 'Поле обязательно к заполнению',
                   },
                 )}
          />
          {errors.description && <div className={styles.containerLabelError}>{errors.description.message}</div>}
        </label>
        <label className={styles.containerLabel}>
          <p className={styles.containerInputName}>
            Text
          </p>
          <textarea placeholder='Text'
                    className={styles.containerLabelText}
                    {...register('text', {
                        required: 'Поле обязательно к заполнению',
                      },
                    )}

          />
          {errors.text && <div className={styles.containerLabelError}>{errors.text.message}</div>}
        </label>


        <div className={styles.containerTag}>
          <div className={styles.containerTagList}>
            {tags}
            <div className={tagList.length === 0 ? styles.containerTagAdd0 : styles.containerTagAdd}>
              <Button
                type='primary'
                ghost
                onClick={addTag}
              >
                Add Tag
              </Button>
            </div>
          </div>

        </div>

        <div>
          <Button
            type='primary'
            htmlType='submit'
            className={styles.containerButton}
          >Send
          </Button>
        </div>
      </form>
    </div>
  );
};
export { ArticleForm };
