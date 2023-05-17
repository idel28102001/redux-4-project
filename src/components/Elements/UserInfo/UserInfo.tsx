import styles from './UserInfo.module.scss';
import { Avatar } from 'antd';
import { Author } from '@/features/articles/api/getArticles.ts';
import { formatDate } from '@/utils/format.ts';

export interface UserExtraInfo {
  slug: string;
  createdAt: string;
}

interface UserInfoProps {
  extraInfo?: UserExtraInfo;
  author: Author;
}

const UserInfo = ({ author, extraInfo }: UserInfoProps) => {
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

export default UserInfo;
