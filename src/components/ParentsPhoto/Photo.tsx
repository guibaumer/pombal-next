'use client';

import { API_URL } from '@/config/app-config';
import { type Message } from '@/interfaces/types';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { toast } from 'react-toastify';

type PhotoProps = {
  anilha: string;
};

export default function Photo({ anilha }: PhotoProps): JSX.Element {
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function getPhoto(): Promise<void> {
      try {
        const response = await fetch(`${API_URL}/pigeon/get-photo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            anilha,
          }),
        });

        if (!response.ok) {
          const { message }: Message = await response.json();

          if (response.status === 500) {
            toast.error(message);
            return;
          }

          console.log(message);
        } else {
          const { path }: { path: { foto_path: string } } =
            await response.json();
          setUrl(path.foto_path);
        }
      } catch (err) {
        console.log('HERREeeee');
        console.log(err);
      }
    }

    // eslint-disable-next-line
    getPhoto();
  }, []);

  return (
    <img
      className={styles.img}
      src={url || '/default-image.jpg'}
      alt="foto de pombo"
    />
  );
}
