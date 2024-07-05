'use client';

import path from 'path';
import styles from './styles.module.css';
import { type FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../config/app-config';
import { type Response, type Message, type ReqData } from '@/interfaces/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Form(): JSX.Element {
  const [anilha, setAnilha] = useState('');
  const [photo, setPhoto] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [anilhaFather, setAnilhaFather] = useState('');
  const [anilhaMother, setAnilhaMother] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    if (anilha && photo) {
      if (validateValues({ anilha, photo, anilhaFather, anilhaMother })) {
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('anilha', anilha);

        if (anilhaFather) formData.append('anilhaFather', anilhaFather);
        if (anilhaMother) formData.append('anilhaMother', anilhaMother);

        try {
          const response = await fetch(`${API_URL}/pigeon`, {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            const { errors, message }: Response = await response.json();

            if (response.status === 400) {
              errors.forEach((error: string) => {
                toast.error(error);
              });
              return;
            }

            toast.error(message);
          } else {
            const { message }: Message = await response.json();
            console.log(response);
            console.log(message);
            toast.success(message);
            router.push('/');
          }
        } catch (err) {
          toast.error('Erro. Tente novamente mais tarde.');
          console.log(err);
        }
      }
    } else {
      toast.error('Campos não preenchidos.');
    }

    setLoading(false);
  };

  const validateValues = ({
    anilha,
    photo,
    anilhaFather,
    anilhaMother,
  }: ReqData): boolean => {
    const allowedExt = ['.jpg', '.jpeg', '.png'];
    const errors = [];

    if (anilha.length < 3 || anilha.length > 15) {
      errors.push('Anilha deve ter entre 3 caracteres e 15 caracteres');
    }

    if (anilhaFather && anilhaFather.length > 15)
      errors.push('Anilha não pode ter mais de 15 caracteres');
    if (anilhaMother && anilhaMother.length > 15)
      errors.push('Anilha não pode ter mais de 15 caracteres');

    if (!allowedExt.includes(path.extname(photo.name))) {
      errors.push('Tipo de arquivo não suportado');
    }

    if (errors[0]) {
      toast.error(errors[0]);
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e).catch((err) => {
            console.error(err);
          });
        }}
      >
        <p className={styles.form_p}>
          <input
            type="text"
            placeholder="Número da anilha"
            className={styles.input}
            value={anilha}
            onChange={(e) => {
              setAnilha(e.target.value);
            }}
          />
        </p>
        <p className={styles.form_p}>
          <input
            type="text"
            placeholder="Anilha do pai"
            className={styles.input}
            value={anilhaFather}
            onChange={(e) => {
              setAnilhaFather(e.target.value);
            }}
          />
        </p>
        <p className={styles.form_p}>
          <input
            type="text"
            placeholder="Anilha da mãe"
            className={styles.input}
            value={anilhaMother}
            onChange={(e) => {
              setAnilhaMother(e.target.value);
            }}
          />
        </p>
        <p className={styles.form_p}>
          <label htmlFor="photo_input" className={styles.label_upload}>
            Escolher foto
          </label>
          <input
            id="photo_input"
            className={styles.photo_input}
            type="file"
            onChange={(e) => {
              setPhoto(e.target?.files?.[0]);
            }}
          />
        </p>
        {photo && (
          <>
            <p className={styles.form_p}>
              <Image
                src={URL.createObjectURL(photo)}
                width={200}
                height={200}
                alt="Selected"
              />
            </p>
          </>
        )}
        <p className={styles.form_p}>
          <button
            type="submit"
            className={`${styles.input} ${styles.submit}`}
            disabled={loading}
          >
            ENVIAR
          </button>
        </p>
      </form>
    </>
  );
}
