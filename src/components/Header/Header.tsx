import Link from 'next/link';
import styles from './styles.module.css';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <img className={styles.image} src="/pombo-desenhado.png" alt="pombo" />
      </Link>

      <nav>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link className={styles.a} href={'/register'}>
              REGISTRAR
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.a} href={'/search'}>
              BUSCAR
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
