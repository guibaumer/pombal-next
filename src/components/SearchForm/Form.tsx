'use client';

import { useState, type FormEvent } from 'react';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Form(): JSX.Element {
  const [anilha, setAnilha] = useState<string>('');
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!anilha) return;
    router.push('/pigeon/' + anilha);
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          handleSearch(e).catch((err) => {
            console.error(err);
            toast.error('Erro ao buscar');
          });
        }}
      >
        <p className={styles.form_p}>
          <input
            type="text"
            className={styles.input}
            placeholder="Anilha para buscar"
            onChange={(e) => {
              setAnilha(e.target.value);
            }}
          />
        </p>
        <p className={styles.form_p}>
          <button type="submit" className={`${styles.input} ${styles.submit}`}>
            BUSCAR
          </button>
        </p>
      </form>
    </>
  );
}
