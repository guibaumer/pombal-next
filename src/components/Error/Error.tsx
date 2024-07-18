'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

type ErrorProps = {
  err: string;
};

export default function Error({ err }: ErrorProps): null {
  useEffect(() => {
    toast.error(err);
  }, []);
  return null;
}
