import { Button, Popconfirm } from 'antd';
import { FC } from 'react';
import { useFetcher } from 'react-router-dom';
import styles from './DeleteConfirmButton.module.scss';

interface DeleteConfirmButtonProps {
  children: JSX.Element | string;
}

const DeleteConfirmButton: FC<DeleteConfirmButtonProps> = ({ children }) => {
  const fetcher = useFetcher();

  return (
    <Popconfirm
      title="Are you sure to delete this task?"
      description="Delete the task"
      placement="leftTop"
      onConfirm={() => fetcher.submit(null, { method: 'post', action: 'delete' })}
    >
      <Button danger className={styles.button}>
        {children}
      </Button>
    </Popconfirm>
  );
};

export default DeleteConfirmButton;
