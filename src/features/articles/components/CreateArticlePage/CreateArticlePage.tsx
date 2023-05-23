import styles from './CreateArticlePage.module.scss';
import Card from '@/components/Elements/Card';
import ArticleBlank from '@/features/articles/components/ArticleBlank/ArticleBlank.tsx';

const CreateArticlePage = () => {
  return (
    <div className={styles.root}>
      <Card isForm={true}>
        <ArticleBlank onFinish={(e) => console.log(e)} />
      </Card>
    </div>
  );
};

export default CreateArticlePage;
