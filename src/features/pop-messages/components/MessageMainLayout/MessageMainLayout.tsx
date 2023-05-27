import MainLayout from '@/components/Layout/MainLayout';
import MessageHOC from '@/hoc/MessageHOC';
import { useAppSelector } from '@/hooks/useStoreHooks.ts';
import { selectMessage } from '@/store/reducers/message';

const MessageMainLayout = () => {
  const { message } = useAppSelector(selectMessage);
  return (
    <MessageHOC data={message}>
      <MainLayout />
    </MessageHOC>
  );
};

export default MessageMainLayout;
