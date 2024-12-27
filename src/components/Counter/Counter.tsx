'use client';

import styles from './styles.module.css';

export default function Counter({ length }: { length: number }): JSX.Element {
  return (
    // eslint-disable-next-line
   <div className={styles.div}>
    Total: {length}
   </div>
  );
}
