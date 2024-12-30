import { type Pigeon } from '@/interfaces/types';
import Photo from '../ParentsPhoto/Photo';
import styles from './styles.module.css';
import Link from 'next/link';
import Offspring from '../Offspring/Offspring';
import DeleteButton from '../DeleteButton/Button';

type ContainerProps = {
  pigeon: Pigeon;
};

export default function Container({ pigeon }: ContainerProps): JSX.Element {
  return (
    <section className={styles.container}>
      <p className={styles.p}>
        <img
          src={pigeon.foto_path || '/default-image.jpg'}
          className={styles.img}
          alt="imagem de um pombo"
        />
      </p>
      <div className={styles.div}>
        <div>ANILHA: {pigeon.anilha}</div>
        <div>{pigeon.sex === 'F' ? 'Fêmea' : 'Macho'}</div>
      </div>

      {pigeon.description && (
        <div className={styles.div}>
          <p className={styles.description}>Anotação: {pigeon.description}</p>
        </div>
      )}

      <div className={styles.p}>
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
      </div>
      <div className={styles.p}>
        <Offspring parentAnilha={pigeon.anilha} sex={pigeon.sex} />
      </div>
      <div className={styles.div}>
        <button className={`${styles.button} ${styles.edit}`} type="button">
          <Link href={'/edit/' + pigeon.anilha}>EDITAR</Link>
        </button>

        <DeleteButton anilha={pigeon.anilha} />
      </div>
    </section>
  );
}
