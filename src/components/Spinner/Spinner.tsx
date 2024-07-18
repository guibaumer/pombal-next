'use client';

import { ClipLoader } from 'react-spinners';

export default function Spinner(): JSX.Element {
  return (
    <div className="loading_div">
      <ClipLoader />
    </div>
  );
}
