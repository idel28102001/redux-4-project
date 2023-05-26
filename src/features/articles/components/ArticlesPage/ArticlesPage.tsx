import styles from './ArticlesPage.module.scss';
import Articles from '@/features/articles/components/Articles';
import PaginationEl from '@/components/Elements/PaginationEl';
import { useArticlesPage } from '@/hooks/useArticlesPage.ts';
import Spinner from '@/components/Elements/Loaders/Spinner/Spinner.tsx';
import MessageHOC from '@/hoc/MessageHOC';

const ArticlesPage = () => {
  const { page, setPage, total, items, status, errors } = useArticlesPage();
  console.log(status);
  const content = status === 'loading' ? <Spinner /> : <Articles items={items} />;
  return (
    <MessageHOC data={errors}>
      <div className={styles.root}>
        {content}
        <PaginationEl page={page} total={total} onChange={setPage} />
      </div>
    </MessageHOC>
  );
};

export default ArticlesPage;
