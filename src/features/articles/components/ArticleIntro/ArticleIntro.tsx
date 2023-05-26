import styles from './ArticleIntro.module.scss';
import LikeCounter from '../../../favorites/components/LikeCounter';
import { Link } from 'react-router-dom';
import Tags from '@/components/Elements/Tags/Tags.tsx';
import clsx from 'clsx';

interface ArticleHeadProps {
  title: string;
  likesAmount: number;
  isFavorited: boolean;
  slug: string;
  isNonActive: boolean;
}

const ArticleHead = ({ isNonActive, slug, title, likesAmount, isFavorited }: ArticleHeadProps) => {
  return (
    <>
      <Link to={`/articles/${slug}`} className={clsx(styles.link, { [styles.linkNonActive]: isNonActive })}>
        {title}
      </Link>
      <LikeCounter slug={slug} isFavorited={isFavorited} amount={likesAmount} />
    </>
  );
};

interface ArticleInfoProps {
  title: string;
  likesAmount: number;
  isOpened: boolean;
  isFavorited: boolean;
  description: string;
  tags: string[];
  slug: string;
}

const ArticleIntro = ({ slug, likesAmount, title, tags, description, isOpened, isFavorited }: ArticleInfoProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <ArticleHead
          isFavorited={isFavorited}
          isNonActive={isOpened}
          slug={slug}
          title={title}
          likesAmount={likesAmount}
        />
      </div>
      <Tags tags={tags} classStyle={clsx({ [styles.isOpened]: isOpened })} />
      <p className={clsx(styles.description, { [styles.isOpened]: isOpened })}>{description}</p>
    </div>
  );
};

export default ArticleIntro;
