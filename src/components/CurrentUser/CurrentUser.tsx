"use client";
import { useSession, signIn, signOut } from 'next-auth/react';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import Button from '../Button/Button';
import Avatar from '../Avatar/Avatar';
import styles from './CurrentUser.module.css';

export default function CurrentUser() {
  const { data: session } = useSession();

  return (
    <div className={styles.currentUser}>
      {session?.user ? (
        <>
          <Button onClick={() => signOut()}>
            Sign out
            <VscSignOut size={18} />
          </Button>
          <Avatar src={session.user.image || null} />
        </>
      ): (
        <Button kind="secondary" onClick={() => signIn()}>
          Sign in
          <VscSignIn size={18} />
        </Button>
      )}
    </div>
  );
}
