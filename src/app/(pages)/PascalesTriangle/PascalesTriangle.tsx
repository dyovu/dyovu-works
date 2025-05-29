'use client';

import React, { useEffect, useRef , useState} from 'react';
import p5 from 'p5';

import '@/styles/global.css';
import '@/styles/PascalesTriangle.css';
import setup from './Setup';
import draw from './Draw';
import CustomSlider from 'src/components/CustomSlider';

const PascalesTriangle = () => {
  const isSTOPED = useRef(false); 
  const P5_INSTANCE = useRef<p5 | null>(null);

  const state2 = useRef<number[]>([1]);
  const GEN = useRef<number>(0);
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
        const currentScalor = WIDTH / limit.current;
        draw(p, stopDrawing, updateState, state2.current, GEN, SCALOR, limit.current, WIDTH, mod.current, baseHue.current, hueRange.current);
        if (isSTOPED.current){
          p.noLoop();
        }else{
          p.loop();
        }
      };
    };

    P5_INSTANCE.current= new p5(
      sketch,
      container
    );

    return () => {
      if (P5_INSTANCE.current) {
        P5_INSTANCE.current.remove();
      }
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);


  const updateState = (newState: number[]) => {
    state2.current = newState;
  }

  // Draw関数を停止するための関数
  const stopDrawing = () => {
    console.log('停止')
    isSTOPED.current = true;
  };
  // Draw関数を再開するための関数
  const reStartDrawing = () => {
    console.log('再開')
    // drawは停止状態だからdrawの中でloopを呼んでも意味ない、そのためここでloopを呼ぶ
    isSTOPED.current = false;
    P5_INSTANCE.current?.loop();
  };

  // キャンバスをリセットするための関数
  const resetDrawing = () => {
    isSTOPED.current = false;
    state2.current = [1];
    GEN.current = 0;

    console.log('リセット');
    
    if (P5_INSTANCE.current) {
        // キャンバスをクリア（背景色で塗りつぶし）
        // P5_INSTANCE.current.background(255); // 白で塗りつぶし、または適切な背景色
        P5_INSTANCE.current.clear();
        
        // 描画を再開
        P5_INSTANCE.current.loop();
    }
  };

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
      <button onClick={stopDrawing} style={{ marginTop: '10px', padding: '10px' }}>
        Stop
      </button>
      <button onClick={reStartDrawing} style={{ marginTop: '10px', padding: '10px' }}>
        Restart
      </button>
      <button onClick={resetDrawing} style={{ marginTop: '10px', padding: '10px' }}>
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


