import styles from './ArticleInfo.module.scss';
import UserInfo from '../../../../components/Elements/UserInfo';
import ArticleIntro from '@/features/articles/components/ArticleIntro';
import { ArticleItem } from '@/features/articles/api/getArticle.ts';

interface ArticleInfoProps {
  isOpened: boolean;
  item: ArticleItem;
}

const ArticleInfo = ({ item, isOpened }: ArticleInfoProps) => {
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
      <UserInfo extraInfo={{ slug: item.slug, createdAt: item.createdAt }} author={item.author} />
    </div>
  );
};

export default ArticleInfo;
