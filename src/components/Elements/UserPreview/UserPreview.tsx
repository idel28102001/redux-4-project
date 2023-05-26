import styles from './UserPreview.module.scss';
import { Avatar } from 'antd';
import { formatDate } from '@/utils/format.ts';
import { Author } from '@/features/articles/api/types.ts';
import { UserInfo } from '@/features/auth/api/types.ts';

export interface UserExtraInfo {
  slug: string;
  createdAt: string;
}

interface UserPreviewProps {
  extraInfo?: UserExtraInfo;
  author: UserInfo | Author;
}

const UserPreview = ({ author, extraInfo }: UserPreviewProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <span className={styles.title}>{author.username}</span>
        {extraInfo && <span className={styles.date}>{formatDate(new Date(extraInfo.createdAt))}</span>}
      </div>
      <Avatar src={author.image} size="large" />
    </div>
  );
};

export default UserPreview;
