
import p5 from 'p5';
import {recurDivideRectangle, recurDivideSquare} from './Recursion';

const setup = (p: p5, v:number=2, h:number=1) => {
  p.createCanvas(600, 600);
  p.frameRate(1);

  const WIDTH: number = p.width;
  const horizontal:number = h;
  const vertical:number = v;
  console.log(horizontal, vertical);
  const thr:number = 10;
  // ratioは横/縦, ration > 1は横長, ratio < 1は縦長
  const ratio =  horizontal/vertical;

  let wd = WIDTH;
  let xPos = 0;
  let yPos = 0;

  p.colorMode(p.HSB, 1);
  p.noStroke();

  // divSquareのremには長方形の横, horizontalを引数に渡す
  // divideSquare(p, rem, ratio, xPos, yPos);
  recurDivideSquare(p, thr, wd, ratio, xPos, yPos);

}

export default setup;








