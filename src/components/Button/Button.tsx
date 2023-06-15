import { ReactNode } from 'react';
import styles from './Button.module.css';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
  kind?: 'primary' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
};

export default function Button({ children, onClick, type = 'button', kind = 'primary', disabled = false, isLoading = false, loadingText }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[kind]}`}
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <LoadingSpinner size="small" text={loadingText} />
      ) : children}
    </button>
  )
}