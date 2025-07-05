
import p5 from 'p5';
import { MutableRefObject } from 'react';


export const updateState = (newState: number[], state: MutableRefObject<number[]>) => {
  state.current = newState;
}


export const resetDrawing = (
  isStoped: MutableRefObject<boolean>, 
  p5Instance: MutableRefObject<p5 | null>,
  state: MutableRefObject<number[]>,
  generation: MutableRefObject<number>
) => {
  isStoped.current = false;
  state.current = [1];
  generation.current = 0;

  console.log('リセット');
  
  if (p5Instance.current) {
      // キャンバスをクリア（背景色で塗りつぶし）
      // P5_INSTANCE.current.background(255); // 白で塗りつぶし、または適切な背景色
      p5Instance.current.clear();
      
      // 描画を再開
      p5Instance.current.loop();
  }
};





