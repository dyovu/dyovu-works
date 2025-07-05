'use client';

import React, { useEffect, useRef , useState} from 'react';
import p5 from 'p5';

import '@/styles/global.css';
import '@/styles/PascalesTriangle.css';
import setup from './Setup';
import draw from './Draw';
import CustomSlider from 'src/components/CustomSlider';
import { stopDrawing, reStartDrawing } from '@/utils/drawingControls';
import {resetDrawing} from './controls';

const PascalesTriangle = () => {
  const isStoped = useRef(false); 
  const p5Instance = useRef<p5 | null>(null);

  const state = useRef<number[]>([1]);
  const generation = useRef<number>(0);
  const WIDTH = 500;

  // スライダーの表示をレンダリングするためのuseState
  const [limitDisplay, setLimitDisplay] = useState(100);
  const [modDisplay, setModDisplay] = useState(5);
  const [baseHueDisplay, setBaseHueDisplay] = useState(180);
  const [hueRangeDisplay, setHueRangeDisplay] = useState(80);

  // p5の描画を変更するためのuseRef
  const limit = useRef(100);
  const mod= useRef(5);
  const baseHue = useRef(180);
  const hueRange = useRef(80);

  
  const SCALOR = WIDTH/limit.current;
  
  useEffect(() => {
    const container = document.getElementById('p5-container');

    const sketch = (p: p5) => {
      p.setup = () => setup(p);
      p.draw = () => {
        draw(p, state, generation, SCALOR, limit.current, WIDTH, mod.current, baseHue.current, hueRange.current, isStoped);
        if (isStoped.current){
          p.noLoop();
        }else{
          p.loop();
        }
      };
    };

    p5Instance.current= new p5(
      sketch,
      container
    );

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);


  const handleLimit = (newValue) => {
    limit.current = newValue;        
    setLimitDisplay(newValue);       
  };
  
  const handleMod = (newValue) => {
    mod.current = newValue;
    setModDisplay(newValue);
  };
  
  const handleBaseHue = (newValue) => {
    baseHue.current = newValue;
    setBaseHueDisplay(newValue);
  };
  
  const handleHueRange = (newValue) => {
    hueRange.current = newValue;
    setHueRangeDisplay(newValue);
  };
  
  return (
    <div>
      <button onClick={ () => stopDrawing(isStoped)} style={{ marginTop: '10px', padding: '10px' }}>
        Stop
      </button>
      <button onClick={() => reStartDrawing(isStoped, p5Instance)} style={{ marginTop: '10px', padding: '10px' }}>
        Restart
      </button>
      <button onClick={() => resetDrawing(isStoped, p5Instance, state, generation)} style={{ marginTop: '10px', padding: '10px' }}>
        Reset
      </button>
      <CustomSlider
        value={limit.current}
        onChange={handleLimit}
        label='段数'
        min={30}
        max={400}
      />
      <CustomSlider
        value={mod.current}
        onChange={handleMod}
        label='剰余計算'
        min={2}
        max={20}
      />
      <CustomSlider
        value={baseHue.current}
        onChange={handleBaseHue}
        label='ベース色相'
        min={0}
        max={360}
      />
      <CustomSlider
        value={hueRange.current}
        onChange={handleHueRange}
        label='色相の変化量'
        min={0}
        max={360}
      />
      <div id='p5-container'></div>
    </div>
  );
};

export default PascalesTriangle;


