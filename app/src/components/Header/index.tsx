import React, { useRef } from 'react';

function index() {

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
      />
    </>
  );
}

export default index;
