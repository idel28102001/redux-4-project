import styles from './ArticleIntro.module.scss';
import LikeCounter from '@/components/Elements/Counters/LikeCounter';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';
import Tags from '@/components/Elements/Tags/Tags.tsx';

interface ArticleHeadProps {
  title: string;
  likesAmount: number;
  slug: string;
}

const ArticleHead = ({ slug, title, likesAmount }: ArticleHeadProps) => {
  return (
    <>
      <Link to={`/articles/${slug}`} className={styles.link}>
        {title}
      </Link>
      <LikeCounter amount={likesAmount} />
    </>
  );
};

interface ArticleInfoProps {
  title: string;
  likesAmount: number;
  isOpened: boolean;
  description: string;
  tags: string[];
  slug: string;
}

const ArticleIntro = ({ slug, likesAmount, title, tags, description, isOpened }: ArticleInfoProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <ArticleHead slug={slug} title={title} likesAmount={likesAmount} />
      </div>
      <Tags tags={tags} classStyle={classNames({ [styles.isOpened]: isOpened })} />
      <p className={classNames(styles.description, { [styles.isOpened]: isOpened })}>{description}</p>
    </div>
  );
};

export default ArticleIntro;
