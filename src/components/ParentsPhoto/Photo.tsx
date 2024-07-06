'use client';

import { API_URL } from '@/config/app-config';
import { type Message } from '@/interfaces/types';
import { useEffect, useState } from 'react';

type PhotoProps = {
  anilha: string;
};

export default function Photo({ anilha }: PhotoProps): JSX.Element {
  const [url, setUrl] = useState('');

  console.log('ANILHA ' + anilha);

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
          console.log(message);
        } else {
          const { path }: { path: { foto_path: string } } =
            await response.json();
          setUrl(path.foto_path);
        }
      } catch (err) {
        console.log(err);
      }
    }

    // eslint-disable-next-line
    getPhoto();
  }, []);

  console.log(url);

  return (
    <img
      style={{ width: '80px', height: '80px', borderRadius: '50%' }}
      src={url || '/default-image.jpg'}
      alt="foto de pombo"
    />
  );
  // return <p>dd</p>;
}
