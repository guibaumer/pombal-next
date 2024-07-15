'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { API_URL } from '@/config/app-config';
import { type PigeonArray } from '@/interfaces/types';
import Container from '../OffspringContainer/Container';

type OffspringType = {
  parentAnilha: string;
  sex: string;
};

export default function Offspring({
  parentAnilha,
  sex,
}: OffspringType): JSX.Element {
  // const [loading, setLoading] = useState<boolean>(false);
  const [offspring, setOffspring] = useState<PigeonArray>();

  useEffect(() => {
    console.log(parentAnilha, sex);
    // setLoading(true);
    async function getOffspring(): Promise<void> {
      try {
        const res = await fetch(API_URL + '/pigeon/get-offspring', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ parentAnilha, sex }),
        });
        const data = await res.json();

        if (!res.ok) {
          const { error }: { error: string } = data;
          console.log(error);
          // setLoading(false);
        }

        const { entries }: { entries: { rows: PigeonArray } } = data;
        console.log(entries);
        setOffspring(entries.rows);
        // setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    // eslint-disable-next-line
    getOffspring();
  }, []);

  return (
    <>
      <h2>FILHOS</h2>
      <section className={styles.section}>
        {offspring?.length ? (
          offspring.map((pigeon) => (
            <Container key={pigeon.anilha} sex={sex} pigeon={pigeon} />
          ))
        ) : (
          <p className="text_align">Nenhum filho registrado.</p>
        )}
      </section>
    </>
  );
}
