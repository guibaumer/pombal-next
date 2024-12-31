'use client';

import Header from '@/components/Header/Header';
import RegisterForm from '../../../components/RegisterForm/Form';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config/app-config';
import { type Pigeon, type Message } from '@/interfaces/types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Register({
  params,
}: {
  params: { anilha: string };
}): JSX.Element {
  const [pigeon, setPigeon] = useState<Pigeon>();
  const router = useRouter();

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const response = await fetch(`${API_URL}/pigeon/get-pigeon-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            anilha: params.anilha,
          }),
        });

        if (!response.ok) {
          const { message }: Message = await response.json();
          console.log(message);
          toast.error('Erro ao editar');
          router.push('/');
        } else {
          const { pigeon }: { pigeon: Pigeon } = await response.json();
          console.log(`AAAAAAAAAAAAAAAAAAAAA ${pigeon.description}`);
          setPigeon(pigeon);
        }
      } catch (err) {
        console.log(err);
        toast.error('Erro ao editar');
        router.push('/');
      }
    }

    // eslint-disable-next-line
    getData();
  }, []);

  if (!pigeon) return <p>Carregando...</p>;

  return (
    <>
      <Header />
      <h2>EDITAR</h2>
      <RegisterForm data={pigeon} />
    </>
  );
}
