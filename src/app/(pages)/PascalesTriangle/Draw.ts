
import { Dispatch, SetStateAction, MutableRefObject } from 'react';

import p5 from 'p5';

type stopDrawingFn = () => void;
type updateStateFn = (list : number[]) => void;

const draw = (
  p:p5, 
  stopDrawing: stopDrawingFn,
  updateState: updateStateFn,
  state: number[],
  GEN: MutableRefObject<number>,
  SCALOR: number,
  LIMIT: number,
  WIDTH: number,
  mod: number,
	baseHue: number,
	hueRange: number
) => {
  p.noStroke();
  if (GEN.current < LIMIT) {
    drawCell(p, GEN.current, WIDTH, SCALOR, state, mod, baseHue, hueRange);
    update(updateState, state, mod);
  }else{
    stopDrawing();
  }
  GEN.current++;
};

export default draw;


const drawCell = (p: p5, gen: number, width:number, scalar:number, state: number[], mod:number, baseHue:number, hueRange: number) => {
  let x = (width - state.length*scalar)*0.5;
  let y = gen*scalar;

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
const update = (updateState: updateStateFn, state: number[], mod: number) => {
  let newState: number[] = [];
  newState.push(1);
  for (let i = 0; i < state.length-1; i++) {
    // 足し算の段階で剰余計算を行う
    newState.push((state[i] + state[i+1]) % mod);
  }
  newState.push(1);
  updateState(newState);
}



