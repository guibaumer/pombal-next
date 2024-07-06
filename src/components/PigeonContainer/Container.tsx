import { type Pigeon } from '@/interfaces/types';
import Photo from '../ParentsPhoto/Photo';
import styles from './styles.module.css';
import Link from 'next/link';

type ContainerProps = {
  pigeon: Pigeon;
};

export default function Container({ pigeon }: ContainerProps): JSX.Element {
  return (
    <section className={styles.container}>
      <p className={styles.p}>
        <img
          src={pigeon.foto_path}
          className={styles.img}
          alt="imagem de um pombo"
        />
      </p>
      <p className={styles.p}>ANILHA: {pigeon.anilha}</p>
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
    </section>
  );
}
