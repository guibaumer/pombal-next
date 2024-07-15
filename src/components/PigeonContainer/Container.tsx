import { type Error, type Message, type Pigeon } from '@/interfaces/types';
import Photo from '../ParentsPhoto/Photo';
import styles from './styles.module.css';
import Link from 'next/link';
import Offspring from '../Offspring/Offspring';
import { toast } from 'react-toastify';
import { API_URL } from '@/config/app-config';
import { useRouter } from 'next/navigation';

type ContainerProps = {
  pigeon: Pigeon;
};

export default function Container({ pigeon }: ContainerProps): JSX.Element {
  const router = useRouter();

  const handleDeletePigeon = async (anilha: string): Promise<void> => {
    try {
      const response = await fetch(API_URL + '/pigeon/delete-pigeon', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ anilha }),
      });
      const data = await response.json();

      if (!response.ok) {
        const { error }: Error = data;
        toast.error(error);
        return;
      }

      const { message }: Message = data;
      toast.success(message);
      router.push('/');
    } catch (err) {
      console.log(err);
      toast.error('Não foi possível deletar');
    }
  };

  return (
    <section className={styles.container}>
      <p className={styles.p}>
        <img
          src={pigeon.foto_path || '/default-image.jpg'}
          className={styles.img}
          alt="imagem de um pombo"
        />
      </p>
      <p className={styles.div}>
        <p>ANILHA: {pigeon.anilha}</p>
        <p>{pigeon.sex === 'F' ? 'Fêmea' : 'Macho'}</p>
      </p>
      <p className={styles.p}>
        <div className={styles.parent}>
          <Photo anilha={pigeon.father_anilha} />
          <div className={styles.inner_div}>
            <h4>PAI</h4>
            <p>
              Anilha:{' '}
              {pigeon.father_anilha ? (
                <Link href={pigeon.father_anilha}>{pigeon.father_anilha}</Link>
              ) : (
                'Não registrada'
              )}
            </p>
          </div>
        </div>
        <div className={styles.parent}>
          <Photo anilha={pigeon.mother_anilha} />
          <div className={styles.inner_div}>
            <h4>MÃE</h4>
            <p>
              Anilha:{' '}
              {pigeon.mother_anilha ? (
                <Link href={pigeon.mother_anilha}>{pigeon.mother_anilha}</Link>
              ) : (
                'Não registrada'
              )}
            </p>
          </div>
        </div>
      </p>
      <p className={styles.p}>
        <Offspring parentAnilha={pigeon.anilha} sex={pigeon.sex} />
      </p>
      <p className={styles.div}>
        <button className={`${styles.button} ${styles.edit}`} type="button">
          <Link href={'/edit/' + pigeon.anilha}>EDITAR</Link>
        </button>
        <button
          className={`${styles.button} ${styles.delete}`}
          type="button"
          onClick={() => {
            // eslint-disable-next-line
            handleDeletePigeon(pigeon.anilha);
          }}
        >
          DELETAR
        </button>
      </p>
    </section>
  );
}
