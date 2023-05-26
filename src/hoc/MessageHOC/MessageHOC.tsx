import { message } from 'antd';
import { FC, useEffect } from 'react';
import { ErrorBody } from '@/utils/axiosErrorHandler.ts';

interface MessageHOCProps {
  children: JSX.Element | string;
  data?: ErrorBody;
}

const MessageHOC: FC<MessageHOCProps> = ({ children, data }) => {
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!data) return;
    switch (data.status) {
      case 'success': {
        if (!data.message) return;
        messageApi.success({ type: 'success', content: data.message });
        break;
      }
      case 'error':
        messageApi.error({
          type: 'error',
          content: data.message,
        });
    }
  }, [data]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

export default MessageHOC;
