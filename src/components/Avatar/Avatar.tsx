import Image from 'next/image';
import { BiUser } from 'react-icons/bi';
import styles from './Avatar.module.css';

type AvatarProps = {
  src: string | null;
};

export default function Avatar({ src }: AvatarProps) {
  return (
    <div className={styles.avatar}>
      {src !== null ? (
        <Image src={src} alt="" quality={100} fill />
      ) : (
        <BiUser />
      )}
    </div>
  );
}