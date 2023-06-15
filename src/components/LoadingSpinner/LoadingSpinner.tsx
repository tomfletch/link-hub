import { VscLoading } from 'react-icons/vsc';
import styles from './LoadingSpinner.module.css';

type LoadingSpinnerProps = {
  size?: 'small' | 'large';
  text?: string;
};

export function LoadingSpinner({ size = 'large', text }: LoadingSpinnerProps) {
  return (
    <div className={`${styles.spinnerContainer} ${styles[size]}`}>
      <VscLoading size={size === 'large' ? 75 : 15} className={styles.spinnerIcon} />
      {text && (
        <span className={styles.text}>{text}</span>
      )}
    </div>
  );
}