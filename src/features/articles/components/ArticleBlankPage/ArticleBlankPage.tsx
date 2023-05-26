import styles from './ArticleBlankPage.module.scss';
import Card from '@/components/Elements/Card';
import ArticleBlank from '@/features/articles/components/ArticleBlank/ArticleBlank.tsx';
import {
  ActionFunctionArgs,
  FetcherWithComponents,
  LoaderFunctionArgs,
  redirect,
  useFetcher,
  useLoaderData,
} from 'react-router-dom';
import { HandleValidateError } from '@/utils/formHandlerHeplers.ts';
import { arrayToJSON } from '@/utils/arrayToJSON.ts';
import { Article, ArticleItem } from '@/features/articles/api/types.ts';
import { getArticle } from '@/features/articles/api/getArticle.ts';
import { updateArticle } from '@/features/articles/api/updateArticle.ts';
import { ErrorBody } from '@/utils/axiosErrorHandler.ts';

function doFormatData(formData: FormData) {
  const parsedFormData = Object.fromEntries(formData) as never as Article;
  parsedFormData['tagList'] = JSON.parse(parsedFormData['tagList'] as never as string);
  return parsedFormData;
}

export async function action({ request, params }: ActionFunctionArgs): Promise<ErrorBody | Response> {
  const formData = await request.formData();
  const parsedFormData = doFormatData(formData) as Article;
  const method = request.method.toLowerCase() as 'put' | 'post';
  const slug = params.slug || '';
  try {
    const result = await updateArticle(slug, { article: parsedFormData }, method);
    const url = `/articles/${result.data.article.slug}`;
    return redirect(url);
  } catch (e) {
    return HandleValidateError(e);
  }
}

export function loader(author: null | string) {
  return async function loader({ params }: LoaderFunctionArgs) {
    const slug = params.slug || '';
    const result = await getArticle(slug);
    const article = result.data.article;
    if (article.author.username !== author) throw new Error('Access error - 403');
    return article;
  };
}

const infoSubmit = (fetcher: FetcherWithComponents<any>, data?: Article) => {
  return (e: Record<string, string | string[]>) => {
    const method = !data ? 'post' : 'put';
    e['tagList'] = arrayToJSON(e['tagList']);
    fetcher.submit(e as never as HTMLInputElement, { method });
  };
};

const ArticleBlankPage = () => {
  const fetcher = useFetcher();
  const initialData = useLoaderData() as Article | undefined;
  const errorInfo = fetcher.data as ErrorBody<ArticleItem> | undefined;
  const errors = errorInfo ? (errorInfo.status === 'error' ? errorInfo.data || {} : {}) : {};

  return (
    <div className={styles.root}>
      <Card isForm={true}>
        <ArticleBlank
          dataInfo={errorInfo}
          defaultData={initialData}
          errors={errors}
          isSubmitting={fetcher.state === 'submitting'}
          onFinish={infoSubmit(fetcher, initialData)}
        />
      </Card>
    </div>
  );
};

export default ArticleBlankPage;
