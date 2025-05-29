'use client';

import p5 from 'p5';
import React, { useEffect, useRef, useState } from 'react';

import '@/styles/EuclidPattern.css';
import '@/styles/global.css';
import setup from './Setup';
import draw from './Draw';
import CustomSlider from 'src/components/CustomSlider';

const EuclidPattern = () => {
  const p5Instance = useRef(null);

  const [vertical, setVertical] = useState(1);
  const [horizontal, setHorizontal] = useState(2);
  const [threshold, setThreshold] = useState(50);

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => setup(p, vertical, horizontal, threshold);
      p.draw = () => draw(p);

      p.resetSketch = (v, h, t) => {
        setup(p, v, h, t);
      };
    };

    let newInstance = new p5(sketch, document.getElementById('p5-container')!);
    p5Instance.current = newInstance;

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  // 際描画する際はこっちの関数が呼ばれる
  useEffect(() => {
    if (p5Instance.current) {
      p5Instance.current.resetSketch(vertical, horizontal, threshold);
    }
  }, [vertical, horizontal, threshold]);

  // それぞれのスライダーの値が変わったときにuseStateを更新する
  const handleVerticalChange = (newValue) => {
    if (horizontal == newValue) {
      setVertical(newValue + 1);
    } else {
      setVertical(newValue);
    }
  };
  const handleHorizontalChange = (newValue) => {
    if (vertical == newValue) {
      setHorizontal(newValue + 1);
    } else {
      setHorizontal(newValue);
    }
  };
  const handleThresholdChange = (newValue) => {
    setThreshold(newValue);
  };

  return (
    <div>
      <CustomSlider
        value={vertical}
        onChange={handleVerticalChange}
        label='Vertical'
        min={1}
        max={30}
      />
      <CustomSlider
        value={horizontal}
        onChange={handleHorizontalChange}
        label='Horizontal'
        min={1}
        max={30}
      />
      <CustomSlider
        value={threshold}
        onChange={handleThresholdChange}
        label='Threshold'
        min={30}
        max={100}
      />

      <div id='p5-container' className='left-aligned'></div>
    </div>
  );
};

export default EuclidPattern;
