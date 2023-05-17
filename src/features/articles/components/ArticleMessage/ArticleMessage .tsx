import styles from './ArticleMessage .module.scss';
import Markdown from 'markdown-to-jsx';

interface ArticleMessageProps {
  body: string;
}

const ArticleMessage = ({ body }: ArticleMessageProps) => {
  return (
    <div className={styles.root}>
      <Markdown>{body}</Markdown>
    </div>
  );
};

export default ArticleMessage;
