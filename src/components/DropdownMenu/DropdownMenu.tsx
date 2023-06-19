import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from 'react';
import Button from '../Button/Button';
import styles from './DropdownMenu.module.css';

type DropdownMenuProps = {
  label: React.ReactNode;
  iconOnly?: boolean;
  children: React.ReactNode;
}

function DropdownMenu({ label, iconOnly = false, children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      if (!isOpen) return;

      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
    }
  })

  const toggleOpen = (e: ReactMouseEvent) => {
    e.preventDefault();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <div ref={dropdownRef} className={styles.dropdownMenuContainer}>
      <Button kind="tertiary" onClick={(e) => toggleOpen(e)} iconOnly={iconOnly}>{label}</Button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {children}
        </div>
      )}
    </div>
  );
}

type DropdownMenuItemProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

DropdownMenu.Item = function DropdownMenuItem({ onClick, children }: DropdownMenuItemProps) {
  const handleClick = (e: ReactMouseEvent) => {
    e.preventDefault();
    onClick && onClick();
  };

  return (
    <Button
      className={styles.dropdownMenuItem}
      kind="secondary"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

export default DropdownMenu;