import styles from './ArticlePage.module.scss';
import Card from '@/components/Elements/Card';
import ArticleInfo from '@/features/articles/components/ArticleInfo';
import ArticleMessage from '@/features/articles/components/ArticleMessage';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { ArticleItem, getArticle } from '@/features/articles/api/getArticle.ts';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug || '';
  const result = await getArticle(slug);
  return { article: result.data.article };
}

const ArticlePage = () => {
  const { article } = useLoaderData() as { article: ArticleItem | null };
  return (
    <div className={styles.root}>
      <Card isForm={false}>
        {article && (
          <div className={styles.info}>
            <ArticleInfo isOpened={true} item={article} />
            <ArticleMessage body={article.body} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ArticlePage;
