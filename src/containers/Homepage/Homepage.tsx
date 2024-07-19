// 'use client';

// import Header from '@/components/Header/Header';
// import List from '@/components/EntriesList/List';
// import { useEffect, useState } from 'react';
// import { API_URL } from '@/config/app-config';
// import { type PigeonArray } from '@/interfaces/types';
// import { toast } from 'react-toastify';
// import { ClipLoader } from 'react-spinners';
// import styles from './styles.module.css';

// export default function Homepage(): JSX.Element {
//   const [pigeons, setPigeons] = useState<PigeonArray>();
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     async function getEntries(): Promise<void> {
//       setLoading(true);
//       try {
//         const res = await fetch(`${API_URL}/pigeon`);
//         const data = await res.json();

//         if (!res.ok) {
//           const { error }: { error: string } = data;
//           toast.error(error);
//           setLoading(false);
//         }

//         const { entries }: { entries: PigeonArray } = data;
//         console.log(entries);
//         setPigeons(entries);
//         setLoading(false);
//       } catch (err) {
//         console.log(err);
//         toast.error('Erro');
//       }
//     }

//     // eslint-disable-next-line
//     getEntries();
//   }, []);

//   return (
//     <>
//       <Header />
//       <h1>POMBAL - REGISTROS</h1>
//       {loading && (
//         <div className={styles.center_div}>
//           <ClipLoader
//             // color={color}
//             loading={loading}
//             // cssOverride={override}
//             size={50}
//             aria-label="Loading Spinner"
//             data-testid="loader"
//           />
//         </div>
//       )}
//       {!loading &&
//         (pigeons ? (
//           <List pigeons={pigeons} />
//         ) : (
//           <p className={styles.text_align}>Adicione registros.</p>
//         ))}
//     </>
//   );
// }

import Header from '@/components/Header/Header';
import List from '@/components/EntriesList/List';
import { API_URL } from '@/config/app-config';
import { type PigeonArray } from '@/interfaces/types';
import styles from './styles.module.css';
import Error from '@/components/Error/Error';
import ReloadButton from '@/components/ReloadButton/Button';

export default async function Homepage(): Promise<JSX.Element> {
  let list;
  let error;

  try {
    console.log('FETCHING DATA');
    const res = await fetch(`${API_URL}/pigeon`, {
      next: { tags: ['pigeons_data'] },
    });
    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      const { error: er }: { error: string } = data;
      error = er;
    }

    const { entries }: { entries: PigeonArray } = data;
    list = entries;
  } catch (err) {
    console.log(err);
    error = 'Erro ao buscar dados';
  }

  return (
    <>
      <Header />
      <h1>POMBAL - REGISTROS</h1>
      {!error &&
        (list ? (
          <>
            <ReloadButton />
            <List pigeons={list} />
          </>
        ) : (
          <p className={styles.text_align}>Adicione registros.</p>
        ))}

      {error && <Error err={error} />}
    </>
  );
}
