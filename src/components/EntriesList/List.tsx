'use client';

import { type PigeonArray } from '@/interfaces/types';
import styles from './styles.module.css';
import { useState } from 'react';
import Link from 'next/link';

type ListProps = {
  pigeons: PigeonArray;
};

export default function List({ pigeons }: ListProps): JSX.Element {
  const [imageToShow, setImageToShow] = useState<string>('');

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>N° ANILHA</th>
            <th>SEXO</th>
            <th>FOTO</th>
          </tr>
        </thead>
        <tbody>
          {pigeons.map((pigeon) => (
            <tr key={pigeon.anilha}>
              <td>
                <div className={styles.td}>
                  <Link className={styles.a} href={'pigeon/' + pigeon.anilha}>
                    {pigeon.anilha}
                  </Link>
                </div>
              </td>

              <td className={styles.td_sex}>
                {(pigeon.sex === 'F' && 'Fêmea') ||
                  (pigeon.sex === 'M' && 'Macho') ||
                  'Não Registrado'}
              </td>

              <td className={styles.td_img}>
                <img
                  src={pigeon.foto_path || '/default-image.jpg'}
                  className={styles.pigeon_img}
                  alt="imagem de um pombo"
                  onClick={() => {
                    setImageToShow(pigeon.foto_path);
                  }}
                />
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>

      {imageToShow && (
        <section className={styles.image_section}>
          <span
            className={styles.close}
            onClick={() => {
              setImageToShow('');
            }}
          >
            X
          </span>
          <img className={styles.big_image} src={imageToShow} alt="pombo" />
        </section>
      )}
    </>
  );
}
