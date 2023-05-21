import styles from './ArticlesPage.module.scss';
import Articles from '@/features/articles/components/Articles';
import PaginationEl from '@/components/Elements/PaginationEl';
import { useArticlesPage } from '@/hooks/useArticlesPage.ts';
import Spinner from '@/components/Elements/Loaders/Spinner/Spinner.tsx';

const ArticlesPage = () => {
  const { page, setPage, total, items, status } = useArticlesPage();
  const content = status === 'loading' ? <Spinner /> : <Articles items={items} />;
  return (
    <div className={styles.root}>
      {content}
      <PaginationEl page={page} total={total} onChange={setPage} />
    </div>
  );
};

export default ArticlesPage;
