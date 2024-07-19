'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function revalidatePigeons(): Promise<void> {
  revalidateTag('pigeons_data');
}
export async function revalidatePigeonsAndReturn(): Promise<void> {
  revalidateTag('pigeons_data');
  redirect('/');
}
