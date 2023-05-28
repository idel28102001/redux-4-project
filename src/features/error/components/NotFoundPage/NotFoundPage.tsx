import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.root}>
      <h1>Oops!</h1>
      <p>Sorry, but this page is not found</p>
    </div>
  );
}
