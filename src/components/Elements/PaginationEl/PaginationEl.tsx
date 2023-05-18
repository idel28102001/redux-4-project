import styles from './PaginationEl.module.scss';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

interface PaginationElProps {
  page: number;
  total: number;
}

const PaginationEl = ({ page, total }: PaginationElProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <Pagination
        showSizeChanger={false}
        current={page}
        total={total}
        onChange={(page) => navigate(`/articles?page=${page}`)}
      />
    </div>
  );
};

export default PaginationEl;
