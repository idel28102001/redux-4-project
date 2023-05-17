import { Space, Tag } from 'antd';

interface TagsProps {
  classStyle: string;
  tags: string[];
}

const Tags = ({ tags, classStyle }: TagsProps) => {
  return (
    <Space size={[0, 8]} wrap>
      {tags.map((tag, index) => (
        <Tag key={index} className={classStyle}>
          {tag}
        </Tag>
      ))}
    </Space>
  );
};

export default Tags;
