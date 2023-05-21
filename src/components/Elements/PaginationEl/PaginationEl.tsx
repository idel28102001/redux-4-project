import styles from './PaginationEl.module.scss';
import { Pagination } from 'antd';

export type OnChangePag = (page: number) => void;

interface PaginationElProps {
  page: number;
  total: number;
  onChange: OnChangePag;
}

const PaginationEl = ({ page, total, onChange }: PaginationElProps) => {
  return (
    <div className={styles.root}>
      <Pagination showSizeChanger={false} current={page} total={total} onChange={(page) => onChange(page)} />
    </div>
  );
};

export default PaginationEl;
