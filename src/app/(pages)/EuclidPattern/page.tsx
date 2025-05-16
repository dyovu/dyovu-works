'use client';

import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import '@/styles/EuclidPattern.css';

const EuclidPattern = dynamic(() => import('./DrawEuclidPattern'), {
  ssr: false,
});

const EuclidPatternPage = () => {
  return (
    <div>
      <h1 id='title'>ユークリッドパターン</h1>
      <EuclidPattern />
    </div>
  );
};

export default EuclidPatternPage;
