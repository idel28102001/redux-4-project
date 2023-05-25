import styles from './Articles.module.scss';
import Article from '@/features/articles/components/Article';
import { ArticleItem } from '@/features/articles/api/types.ts';

interface ArticlesProps {
  items: Array<ArticleItem>;
}

const Articles = ({ items }: ArticlesProps) => {
  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.slug}>
            <Article item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
