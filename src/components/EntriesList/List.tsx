'use client';

import { type PigeonArray } from '@/interfaces/types';
import styles from './styles.module.css';
import { useState } from 'react';

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
            <th>FOTO</th>
          </tr>
        </thead>
        <tbody>
          {pigeons.map((pigeon) => (
            <tr key={pigeon.anilha}>
              <td>{pigeon.anilha}</td>
              <td>
                <img
                  src={pigeon.foto_path}
                  width={60}
                  height={60}
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
