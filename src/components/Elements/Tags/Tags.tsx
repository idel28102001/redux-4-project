import { Space, Tag } from 'antd';
import styles from './Tags.module.scss';

interface TagsProps {
  classStyle: string;
  tags: string[];
}

const Tags = ({ tags, classStyle }: TagsProps) => {
  return (
    <Space size={[0, 8]} wrap>
      <ul className={styles.list}>
        {tags.map((tag, index) => (
          <Tag key={index} className={classStyle}>
            {tag}
          </Tag>
        ))}
      </ul>
    </Space>
  );
};

export default Tags;
