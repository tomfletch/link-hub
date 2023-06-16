import { useEffect, useRef, useState } from 'react';
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

  const toggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <div ref={dropdownRef} className={styles.dropdownMenuContainer}>
      <Button kind="tertiary" onClick={() => toggleOpen()} iconOnly={iconOnly}>{label}</Button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {children}
        </div>
      )}
    </div>
  );
}

type DropdownMenuItemProps = {
  children: React.ReactNode;
};

DropdownMenu.Item = function DropdownMenuItem({ children }: DropdownMenuItemProps) {
  return (
    <Button className={styles.dropdownMenuItem} kind="secondary">{children}</Button>
  );
}

export default DropdownMenu;