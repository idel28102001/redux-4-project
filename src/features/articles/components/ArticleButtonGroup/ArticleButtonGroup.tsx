import styles from './ArticleButtonGroup.module.scss';
import GreenButton from '@/components/Elements/Buttons/GreenButton';
import DeleteConfirmButton from '@/features/articles/components/DeleteConfirmButton';
import { Link } from 'react-router-dom';

const ArticleButtonGroup = () => {
  return (
    <div className={styles.root}>
      <DeleteConfirmButton>Delete</DeleteConfirmButton>
      <GreenButton isBig={true}>
        <Link to="edit">Edit</Link>
      </GreenButton>
    </div>
  );
};

export default ArticleButtonGroup;
