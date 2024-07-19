'use client';

import { revalidatePigeons } from '@/actions/actions';
import styles from './styles.module.css';

export default function ReloadButton(): JSX.Element {
  const handleClick = async (): Promise<void> => {
    await revalidatePigeons();
  };

  return (
    // eslint-disable-next-line
    <form className={styles.form} action={handleClick}>
      <button className={styles.button} type="submit">
        <img
          className={styles.rotate}
          src="/rotate.png"
          alt="seta de atualização"
        />
      </button>
    </form>
  );
}
