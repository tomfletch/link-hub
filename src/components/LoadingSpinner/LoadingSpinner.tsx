import { VscLoading } from 'react-icons/vsc';
import styles from './LoadingSpinner.module.css';

export function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      <VscLoading size={75} className={styles.spinnerIcon} />
    </div>
  );
}