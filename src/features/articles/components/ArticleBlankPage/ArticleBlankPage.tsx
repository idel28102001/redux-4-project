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
import { ErrorDataTypes, handleValidateError } from '@/utils/formHandlerHeplers.ts';
import { arrayToJSON } from '@/utils/arrayToJSON.ts';
import { Article } from '@/features/articles/api/types.ts';
import { getArticle } from '@/features/articles/api/getArticle.ts';
import { updateArticle } from '@/features/articles/api/updateArticle.ts';

function doFormatData(formData: FormData) {
  const parsedFormData = Object.fromEntries(formData) as never as Article;
  parsedFormData['tagList'] = JSON.parse(parsedFormData['tagList'] as never as string);
  return parsedFormData;
}

export async function action({ request, params }: ActionFunctionArgs): Promise<ErrorDataTypes | Response> {
  const formData = await request.formData();
  const parsedFormData = doFormatData(formData) as Article;
  const method = request.method.toLowerCase() as 'put' | 'post';
  const slug = params.slug || '';
  try {
    const result = await updateArticle(slug, { article: parsedFormData }, method);
    const url = `/articles/${result.data.article.slug}`;
    return redirect(url);
  } catch (e) {
    return handleValidateError(e);
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
  const errors = fetcher.data as ErrorDataTypes | undefined;

  return (
    <div className={styles.root}>
      <Card isForm={true}>
        <ArticleBlank
          defaultData={initialData}
          errors={errors || {}}
          isSubmitting={fetcher.state === 'submitting'}
          onFinish={infoSubmit(fetcher, initialData)}
        />
      </Card>
    </div>
  );
};

export default ArticleBlankPage;
