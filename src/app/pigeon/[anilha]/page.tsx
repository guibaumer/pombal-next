// 'use client';

// import Header from '@/components/Header/Header';
// import Container from '@/components/PigeonContainer/Container';
// import { API_URL } from '@/config/app-config';
// import { type Pigeon, type Message } from '@/interfaces/types';
// import { useEffect, useState } from 'react';
// import { ClipLoader } from 'react-spinners';
// import { toast } from 'react-toastify';

// export default function Page({
//   params,
// }: {
//   params: { anilha: string };
// }): JSX.Element {
//   const [pigeon, setPigeon] = useState<Pigeon>();
//   const [loading, setLoading] = useState<boolean>(true);

//   /*
//     THE PIGEON DATA WILL BE FETCHED HERE AND
//     PASSED TO THE COMPONENT. THERE THE FATHER AND MOTHER
//     PHOTOS WILL BE FETCHED.
//   */

//   useEffect(() => {
//     async function getData(): Promise<void> {
//       setLoading(true);
//       console.log(params.anilha);
//       try {
//         const response = await fetch(`${API_URL}/pigeon/get-pigeon-data`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ anilha: params.anilha }),
//         });

//         if (!response.ok) {
//           const { message }: Message = await response.json();
//           toast.error(message);
//         } else {
//           const { pigeon }: { pigeon: Pigeon } = await response.json();
//           console.log(pigeon);
//           setPigeon(pigeon);
//         }
//       } catch (err) {
//         toast.error('Erro. Tente novamente mais tarde.');
//         console.log(err);
//       }

//       setLoading(false);
//     }

//     // eslint-disable-next-line
//     getData();
//   }, []);

//   if (loading)
//     return (
//       <p className="loading">
//         <ClipLoader loading={loading} />
//       </p>
//     );

//   if (pigeon) {
//     return (
//       <>
//         <Header />
//         <Container pigeon={pigeon} />
//       </>
//     );
//   } else {
//     return <p>Não foi possível recuperar estes dados.</p>;
//   }
// }

import Error from '@/components/Error/Error';
import Header from '@/components/Header/Header';
import Container from '@/components/PigeonContainer/Container';
import { API_URL } from '@/config/app-config';
import { type Pigeon, type Message } from '@/interfaces/types';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import styles from './styles.module.css';

export default async function Page({
  params,
}: {
  params: { anilha: string };
}): Promise<JSX.Element> {
  /*
    THE PIGEON DATA WILL BE FETCHED HERE AND
    PASSED TO THE COMPONENT. THERE THE FATHER AND MOTHER
    PHOTOS WILL BE FETCHED.
  */

  let data;
  let error;
  let loading = true;
  try {
    const response = await fetch(`${API_URL}/pigeon/get-pigeon-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ anilha: params.anilha }),
      cache: 'no-cache', // This forces the fetch to not use cache
    });

    if (!response.ok) {
      const { message }: Message = await response.json();
      error = message;
    } else {
      const { pigeon }: { pigeon: Pigeon } = await response.json();
      data = pigeon;
    }

    loading = false;
  } catch (err) {
    error = 'Erro. Tente novamente mais tarde.';
    console.log(err);
    loading = false;
  }

  if (loading)
    return (
      <p className="loading">
        <ClipLoader loading={loading} />
      </p>
    );

  if (data) {
    return (
      <>
        <Header />
        <Container pigeon={data} />
        {error && <Error err={error} />}
      </>
    );
  } else {
    return (
      <>
        <p className={styles.centralized_error}>{error}</p>
        <Link href={'/'} className={styles.link}>
          VOLTAR
        </Link>
      </>
    );
  }
}
