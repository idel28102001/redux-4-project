import styles from './ArticleInfo.module.scss';
import UserPreview from '../../../../components/Elements/UserPreview';
import ArticleIntro from '@/features/articles/components/ArticleIntro';
import { ArticleItem } from '@/features/articles/api/types.ts';
import ArticleButtonGroup from '@/features/articles/components/ArticleButtonGroup';
import { useIsAuthor } from '@/hooks/useIsAuthor.ts';

interface ArticleInfoProps {
  isOpened: boolean;
  item: ArticleItem;
}

const ArticleInfo = ({ item, isOpened }: ArticleInfoProps) => {
  const isAuthor = useIsAuthor(item.author.username);
  const buttons = isAuthor && isOpened && <ArticleButtonGroup />;
  return (
    <div className={styles.root}>
      <ArticleIntro
        slug={item.slug}
        tags={item.tagList}
        isOpened={isOpened}
        description={item.description}
        title={item.title}
        likesAmount={item.favoritesCount}
      />
      <UserPreview extraInfo={{ slug: item.slug, createdAt: item.createdAt }} author={item.author} />
      {buttons}
    </div>
  );
};

export default ArticleInfo;
