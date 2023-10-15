import { useSelector } from 'react-redux';
import { message } from 'antd';
import { useCallback, useEffect } from 'react';


const ErrorMessage = () => {
  const err = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);
  const [messageApi, contextHolder] = message.useMessage();
  const error = useCallback(() => {
    messageApi.open({
      type: 'error',
      content:  `${err.statusText}`,
      style: {
        backgroundColor: 'tomato',
        width: '50%',
        margin: '5px auto',
        borderRadius: '15px',
      },
    });
  }, [err.statusText, messageApi]);

  useEffect(() => {
    if (status === 'rejected' && err.statusText != undefined) {
      error();
    }
  }, [status, error]);
  return <>{contextHolder}</>;
};
export { ErrorMessage };
