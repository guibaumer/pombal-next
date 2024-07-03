'use client';

import Header from '@/components/Header/Header';
import List from '@/components/EntriesList/List';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config/app-config';
import { type PigeonArray } from '@/interfaces/types';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import styles from './styles.module.css';

export default function Homepage(): JSX.Element {
  const [pigeons, setPigeons] = useState<PigeonArray>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getEntries(): Promise<void> {
      setLoading(true);
      const res = await fetch(`${API_URL}/pigeon/`);
      const data = await res.json();

      if (!res.ok) {
        const { error }: { error: string } = data;
        toast.error(error);
        setLoading(false);
      }

      const { entries }: { entries: PigeonArray } = data;
      console.log(entries);
      setPigeons(entries);
      setLoading(false);
    }

    // eslint-disable-next-line
    getEntries();
  }, []);

  return (
    <>
      <Header />
      <h1>POMBAL - REGISTROS</h1>
      {loading && (
        <div className={styles.center_div}>
          <ClipLoader
            // color={color}
            loading={loading}
            // cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {!loading &&
        (pigeons ? (
          <List pigeons={pigeons} />
        ) : (
          <p className={styles.text_align}>Adicione registros.</p>
        ))}
    </>
  );
}