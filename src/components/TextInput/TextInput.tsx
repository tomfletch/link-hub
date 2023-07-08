import { useId } from 'react';
import styles from './TextInput.module.css';

type TextInputProps = {
  label: string;
  value: string;
  setValue: (newValue: string) => void;
  isDisabled?: boolean;
  autoFocus?: boolean;
};

export default function TextInput({ label, value, setValue, isDisabled = false, autoFocus = false }: TextInputProps) {
  const id = useId();

  return (
    <label className={styles.textInputContainer} htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        disabled={isDisabled}
        autoFocus={autoFocus}
      />
    </label>
  );
}
