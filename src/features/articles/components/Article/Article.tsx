import styles from './Article.module.scss';
import Card from '@/components/Elements/Card';
import ArticleInfo from '@/features/articles/components/ArticleInfo';
import { ArticleItem } from '@/features/articles/api/getArticle.ts';

interface ArticleProps {
  item: ArticleItem;
}

const Article = ({ item }: ArticleProps) => {
  return (
    <div className={styles.root}>
      <Card isForm={false}>
        <ArticleInfo item={item} isOpened={false} />
      </Card>
    </div>
  );
};

export default Article;
