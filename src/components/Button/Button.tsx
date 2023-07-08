import { ReactNode, MouseEvent } from 'react';
import styles from './Button.module.css';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

type ButtonProps = {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'button';
  kind?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  iconOnly?: boolean;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
};

export default function Button({ children, onClick, type = 'button', kind = 'primary', iconOnly = false, className = '', disabled = false, isLoading = false, loadingText }: ButtonProps) {
  const classNames = [
    styles.button,
    styles[kind],
    className
  ];

  if (iconOnly) {
    classNames.push(styles.iconOnly);
  }

  return (
    <button
      className={classNames.join(' ')}
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