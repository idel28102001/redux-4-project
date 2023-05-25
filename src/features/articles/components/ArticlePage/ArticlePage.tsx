import styles from './ArticlePage.module.scss';
import Card from '@/components/Elements/Card';
import ArticleInfo from '@/features/articles/components/ArticleInfo';
import ArticleMessage from '@/features/articles/components/ArticleMessage';
import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import { ArticleItem } from '@/features/articles/api/types.ts';
import { deleteArticle } from '@/features/articles/api/deleteArticle.ts';
import { getArticle } from '@/features/articles/api/getArticle.ts';
import { axiosErrorHandler } from '@/utils/axiosErrorHandler.ts';

export async function deleteAction({ params }: ActionFunctionArgs) {
  const slug = params.slug as string;
  return axiosErrorHandler(async () => {
    await deleteArticle(slug);
    return redirect('/');
  });
}

interface loaderResponse {
  article: ArticleItem;
}

export async function loader({ params }: LoaderFunctionArgs): Promise<loaderResponse> {
  const slug = params.slug || '';
  const result = await getArticle(slug);
  return { article: result.data.article };
}

const ArticlePage = () => {
  const { article } = useLoaderData() as loaderResponse;
  return (
    <div className={styles.root}>
      <Card isForm={false}>
        <div className={styles.info}>
          <ArticleInfo isOpened={true} item={article} />
          <ArticleMessage body={article.body} />
        </div>
      </Card>
    </div>
  );
};

export default ArticlePage;
