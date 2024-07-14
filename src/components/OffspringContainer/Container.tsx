import { useEffect, useState } from 'react';
import { type Pigeon } from '../../interfaces/types';
import Photo from '../ParentsPhoto/Photo';
import styles from './styles.module.css';

type ContainerProps = {
  pigeon: Pigeon;
  sex: string;
};

export default function Container({
  pigeon,
  sex,
}: ContainerProps): JSX.Element {
  const [parentAnilha, setParentAnilha] = useState<string>('');

  useEffect(() => {
    if (sex === 'M') {
      setParentAnilha(pigeon.mother_anilha);
    } else {
      setParentAnilha(pigeon.father_anilha);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <img src={pigeon.foto_path} alt="pombo" className={styles.image} />
        <div>
          <h4>Anilha:</h4>
          <p>{pigeon.anilha}</p>
        </div>
      </div>
      <img
        src="/seta-esquerda.png"
        className={styles.arrow}
        alt="seta para a esquerda"
      />

      {!parentAnilha ? (
        <p>Não consta</p>
      ) : (
        <div className={styles.container}>
          <Photo anilha={parentAnilha} />
          <div>
            <h4>Anilha:</h4>
            <p>{parentAnilha}</p>
            <p>{sex === 'M' ? '(Mãe)' : '(Pai)'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
