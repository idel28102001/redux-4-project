import { message } from 'antd';
import { FC, useEffect } from 'react';
import { MessageInfo } from '@/utils/axiosErrorHandler.ts';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/hooks/useStoreHooks.ts';
import { actionsMessage } from '@/store/reducers/message';
import { MessageInstance } from 'antd/es/message/interface';

interface MessageHOCProps {
  children: JSX.Element | string;
  data?: MessageInfo | null;
}

function sendMessage(messageApi: MessageInstance, data: MessageInfo) {
  switch (data.status) {
    case 'success': {
      messageApi.success({ type: 'success', content: data.message });
      break;
    }
    case 'error':
      messageApi.error({
        type: 'error',
        content: data.message,
      });
  }
}

const MessageHOC: FC<MessageHOCProps> = ({ children, data }) => {
  const { clearMessage } = bindActionCreators(actionsMessage, useAppDispatch());
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 1 });
  useEffect(() => {
    if (!data) return;
    sendMessage(messageApi, data);
    clearMessage();
  }, [data]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

export default MessageHOC;
