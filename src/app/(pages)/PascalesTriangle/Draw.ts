
import { Dispatch, SetStateAction, MutableRefObject } from 'react';

import p5 from 'p5';

import { stopDrawing } from '@/utils/drawingControls';
import { updateState } from './controls';

const draw = (
  p:p5, 
  state: MutableRefObject<number[]>,
  generation: MutableRefObject<number>,
  SCALOR: number,
  LIMIT: number,
  WIDTH: number,
  mod: number,
	baseHue: number,
	hueRange: number,
  isStoped: MutableRefObject<boolean>
) => {
  p.noStroke();
  if (generation.current < LIMIT) {
    drawCell(p, generation.current, WIDTH, SCALOR, state.current, mod, baseHue, hueRange);
    update(state, mod);
  }else{
    stopDrawing(isStoped);
  }
  generation.current++;
};

export default draw;


const drawCell = (p: p5, generation: number, width:number, scalar:number, state: number[], mod:number, baseHue:number, hueRange: number) => {
  let x = (width - state.length*scalar)*0.5;
  let y = generation*scalar;

  for (let i=0; i < state.length; i++) {
    const value = state[i];

    if (value === 0) {
      // 透明に近い白っぽいセル（alphaを落とす）
      p.fill(0, 0, 100, 20);
    } else {
      const hue = (baseHue + hueRange*Math.sin(Math.PI*(2*value-1)/2)/value ) % 360;
      const alpha = 60 + 40 * (Math.log(value + 1) / Math.log(mod)); 
      p.fill(hue, 80, 70, alpha); // 彩度・明度は固定
    }

    p.rect(x, y, scalar, scalar);
    x += scalar;
  }
};


// パスカルの三角形の計算をする
// 前の行を受け取り次の行を返す
const update = (state: MutableRefObject<number[]>, mod: number) => {
  let newState: number[] = [];
  newState.push(1);
  for (let i = 0; i < state.current.length-1; i++) {
    // 足し算の段階で剰余計算を行う
    newState.push((state.current[i] + state.current[i+1]) % mod);
  }
  newState.push(1);
  updateState(newState, state);
}



