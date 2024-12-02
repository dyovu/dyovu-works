'use client';

import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

const EuclidPattern = dynamic(() => import('./DrawEuclidPattern'), {
  ssr: false,
});

const EuclidPatternPage = () =>  {
  return (
    <div>
      <h1>This Page Show Euclid Pattern!</h1>
      <EuclidPattern />
    </div>
  );
}

export default EuclidPatternPage;
