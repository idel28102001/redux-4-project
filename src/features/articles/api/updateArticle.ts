import { putArticle, PutArticleInfo } from '@/features/articles/api/putArticle.ts';
import { postArticle, PostArticleInfo } from '@/features/articles/api/postArticle.ts';

export const updateArticle = async <I extends PutArticleInfo | PostArticleInfo>(
  slug: string,
  body: I['body'],
  method: I['method'],
  signal?: AbortSignal
) => {
  switch (method) {
    case 'post':
      return await postArticle(body, signal);
    case 'put': {
      return await putArticle(slug, body, signal);
      break;
    }
    default:
      throw new Error('The method was not found');
  }
};
