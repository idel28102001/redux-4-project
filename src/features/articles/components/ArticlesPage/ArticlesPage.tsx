import styles from './ArticlesPage.module.scss';
import Articles from '@/features/articles/components/Articles';
import PaginationEl from '@/components/Elements/PaginationEl';
import { useArticlesPage } from '@/hooks/useArticlesPage.ts';

const ArticlesPage = () => {
  const { setPage, page, items, total } = useArticlesPage();
  return (
    <div className={styles.root}>
      <Articles items={items} />
      <PaginationEl setPage={setPage} page={page} total={total} />
    </div>
  );
};

export default ArticlesPage;
