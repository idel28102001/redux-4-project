import styles from './PaginationEl.module.scss';
import { Pagination } from 'antd';

export type SetPage = (page: number) => void;

interface PaginationElProps {
  setPage: SetPage;
  page: number;
  total: number;
}

const PaginationEl = ({ setPage, page, total }: PaginationElProps) => {
  return (
    <div className={styles.root}>
      <Pagination current={page} total={total} onChange={(page) => setPage(page)} />
    </div>
  );
};

export default PaginationEl;
