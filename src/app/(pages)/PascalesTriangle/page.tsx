'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const PascalesTriangle = dynamic(() => import('./PascalesTriangle'), {
  ssr: false,
});

const DrawPascalesTriangle = () => {
  return (
    <div> 
      <h1> パスカルの三角形 </h1>
      <PascalesTriangle />
    </div>
  );
}

export default DrawPascalesTriangle;
