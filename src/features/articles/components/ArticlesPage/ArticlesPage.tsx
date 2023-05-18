import styles from './ArticlesPage.module.scss';
import Articles from '@/features/articles/components/Articles';
import PaginationEl from '@/components/Elements/PaginationEl';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { GetArticles, getArticles } from '@/features/articles/api/getArticles.ts';
import { getURLParam } from '@/utils/getURLParam.ts';

type LoaderReturn = GetArticles & { page: number };

export async function loader({ request }: LoaderFunctionArgs): Promise<LoaderReturn> {
  const url = new URL(request.url);
  const page = getURLParam(url, 'page', 1);
  const response = await getArticles(page);
  return { page, ...response.data };
}

const ArticlesPage = () => {
  const obj = useLoaderData() as never as LoaderReturn;
  return (
    <div className={styles.root}>
      <Articles items={obj.articles} />
      <PaginationEl page={obj.page} total={obj.articlesCount} />
    </div>
  );
};

export default ArticlesPage;
