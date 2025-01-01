'use client';

import path from 'path';
import styles from './styles.module.css';
import { type FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../config/app-config';
import {
  type Response,
  type Message,
  type ReqData,
  type Pigeon,
} from '@/interfaces/types';
import Image from 'next/image';
import { revalidatePigeonsAndReturn } from '@/actions/actions';
// import { deserialize } from 'v8';

type FormParams = {
  data?: Pigeon;
};

export default function Form({ data }: FormParams): JSX.Element {
  const [anilha, setAnilha] = useState('');
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const [actualPhoto, setActualPhoto] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [anilhaFather, setAnilhaFather] = useState('');
  const [anilhaMother, setAnilhaMother] = useState('');
  const [sex, setSex] = useState<string>('M');
  const [id, setId] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (data) {
      setAnilha(data.anilha);
      setActualPhoto(data.foto_path);
      setAnilhaFather(data.father_anilha);
      setAnilhaMother(data.mother_anilha);
      setSex(data.sex);
      setId(data.id);
      setDescription(data.description);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    if (anilha && sex) {
      if (
        validateValues({
          anilha,
          photo,
          anilhaFather,
          anilhaMother,
          sex,
          description,
        })
      ) {
        const formData = new FormData();
        formData.append('anilha', anilha);
        formData.append('sex', sex);
        if (id) formData.append('id', id);
        if (photo) formData.append('photo', photo);
        if (anilhaFather) formData.append('anilhaFather', anilhaFather);
        if (anilhaMother) formData.append('anilhaMother', anilhaMother);
        // formData.append('anilhaFather', anilhaFather);
        // formData.append('anilhaMother', anilhaMother);

        formData.append('description', description);

        try {
          const response = await fetch(`${API_URL}/pigeon`, {
            method: data ? 'PUT' : 'POST',
            body: formData,
          });

          if (!response.ok) {
            const { errors, message }: Response = await response.json();

            if (response.status === 400) {
              errors.forEach((error: string) => {
                toast.error(error);
              });
            } else if (response.status === 500) {
              toast.error(message);
            }
          } else {
            const { message }: Message = await response.json();
            toast.success(message);
            await revalidatePigeonsAndReturn();
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
    sex,
    description,
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

    if (photo && !allowedExt.includes(path.extname(photo.name))) {
      errors.push('Tipo de arquivo não suportado');
    }

    if (sex !== 'M' && sex !== 'F') {
      errors.push('Indique se o pombo é macho ou fêmea');
    }

    if (description) {
      if (typeof description !== 'string') {
        errors.push('Descrição deve ser um texto');
      } else {
        if (description.length > 90) {
          errors.push('Descrição muito grande');
        }
      }
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
            value={anilha || ''}
            onChange={(e) => {
              setAnilha(e.target.value);
            }}
          />
        </p>
        <p className={styles.form_p}>
          <select
            title="male_female"
            className={styles.input}
            onChange={(e) => {
              setSex(e.target.value);
            }}
            value={sex || ''}
          >
            <option value="M">Macho</option>
            <option value="F">Fêmea</option>
          </select>
        </p>
        <p className={styles.form_p}>
          <input
            type="text"
            placeholder="Anilha do pai (opcional)"
            className={styles.input}
            value={anilhaFather || ''}
            onChange={(e) => {
              setAnilhaFather(e.target.value);
            }}
          />
        </p>
        <p className={styles.form_p}>
          <input
            type="text"
            placeholder="Anilha da mãe (opcional)"
            className={styles.input}
            value={anilhaMother || ''}
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
            <p>FOTO SELECIONADA:</p>
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
        {actualPhoto && (
          <>
            <p>FOTO UTILIZADA:</p>
            <p className={styles.form_p}>
              <img src={actualPhoto} width={200} height={200} alt="Selected" />
            </p>
          </>
        )}
        <p className={styles.form_p}>
          <textarea
            placeholder="Anotação (opcional)"
            className={styles.text_area}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          ></textarea>
        </p>
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
