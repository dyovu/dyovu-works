'use client';

import React, { useEffect } from 'react';
import p5 from 'p5';

import '@/styles/EuclidPattern.css';
import setup from './Setup';
import draw from './Draw';

const EuclidPattern = () => {
  let p5Instance: p5;

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => setup(p);
      p.draw = () => draw(p);
    };
     p5Instance = new p5(
      sketch,
      document.getElementById('p5-container')!
    );

    return () => {
      p5Instance.remove();
    };
  }, []);

  
  const rerender = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    p5Instance?.remove();
    const container = document.getElementById('p5-container');
    const vertical = Number((e.currentTarget[0] as HTMLInputElement).value);
    const horizontal = Number((e.currentTarget[1] as HTMLInputElement).value);

    const sketch = (p: p5) => {
      p.setup = () => setup(p, vertical, horizontal);
      p.draw = () => draw(p);
    };

    p5Instance = new p5(sketch, container!);
  };


  return (
    <div>
      <form onSubmit={rerender} >
        <div>
          <label>vetical: <input type='number'/> </label>
          <label>Horizontal: <input /> </label>
          <label>threshold: <input /> </label>
        </div>
        <div>
          <button type="submit"> render </button>
        </div>
      </form>
      <div id='p5-container'></div>
    </div>
  );
};

export default EuclidPattern;
