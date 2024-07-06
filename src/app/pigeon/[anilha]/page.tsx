'use client';

import Header from '@/components/Header/Header';
import Container from '@/components/PigeonContainer/Container';
import { API_URL } from '@/config/app-config';
import { type Pigeon, type Message } from '@/interfaces/types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Page({
  params,
}: {
  params: { anilha: string };
}): JSX.Element {
  const [pigeon, setPigeon] = useState<Pigeon>();
  const [loading, setLoading] = useState<boolean>(true);

  /*
    THE PIGEON DATA WILL BE FETCHED HERE AND
    PASSED TO THE COMPONENT. THERE THE FATHER AND MOTHER
    PHOTOS WILL BE FETCHED.
  */

  useEffect(() => {
    async function getData(): Promise<void> {
      setLoading(true);
      console.log(params.anilha);
      try {
        const response = await fetch(`${API_URL}/pigeon/get-pigeon-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ anilha: params.anilha }),
        });

        if (!response.ok) {
          const { message }: Message = await response.json();
          toast.error(message);
        } else {
          const { pigeon }: { pigeon: Pigeon } = await response.json();
          console.log(pigeon);
          setPigeon(pigeon);
        }
      } catch (err) {
        toast.error('Erro. Tente novamente mais tarde.');
        console.log(err);
      }

      setLoading(false);
    }

    // eslint-disable-next-line
    getData();
  }, []);

  if (loading) return <p>Carregando...</p>;

  if (pigeon) {
    return (
      <>
        <Header />
        <Container pigeon={pigeon} />
      </>
    );
  } else {
    return <p>Não foi possível recuperar estes dados.</p>;
  }
}
