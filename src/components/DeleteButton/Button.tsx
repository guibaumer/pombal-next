'use client';

import { revalidatePigeonsAndReturn } from '@/actions/actions';
import styles from './styles.module.css';
import { API_URL } from '@/config/app-config';
import { type Error, type Message } from '@/interfaces/types';
import { toast } from 'react-toastify';
import { type FormEvent, useState } from 'react';

type ButtonProps = {
  anilha: string;
};

export default function DeleteButton({ anilha }: ButtonProps): JSX.Element {
  const [hidden, setHidden] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');

  const showDiv = (): void => {
    hidden ? setHidden(false) : setHidden(true);
  };
  const handleDeletePigeon = async (
    anilha: string,
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!password || password.length > 8) return;

    try {
      const response = await fetch(API_URL + '/pigeon/delete-pigeon', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ anilha, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        const { error }: Error = data;
        showDiv();
        toast.error(error);
        return;
      }

      const { message }: Message = data;
      toast.success(message);
      await revalidatePigeonsAndReturn();
    } catch (err) {
      console.log(err);
      showDiv();
      toast.error('Não foi possível deletar');
    }
  };

  return (
    <>
      <button
        className={styles.delete_button}
        type="button"
        onClick={() => {
          showDiv();
        }}
      >
        DELETAR
      </button>

      {!hidden && (
        <div id="hidden_password_div" className={`${styles.hidden_div}`}>
          <form
            onSubmit={(e) => {
              // eslint-disable-next-line
              handleDeletePigeon(anilha, e)}}
          >
            <label className={styles.label} htmlFor="input">
              Insira a senha excluir o registro:
            </label>
            <input
              type="password"
              id="input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={styles.input}
            />
            <input type="submit" value="ENVIAR" className={styles.button} />
          </form>
        </div>
      )}
    </>
  );
}
