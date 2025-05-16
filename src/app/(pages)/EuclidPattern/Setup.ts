import p5 from 'p5';
import { recurDivideRectangle, recurDivideSquare } from './Recursion';

const setup = (p: p5, v: number = 2, h: number = 1, Thr: number = 50) => {
  p.createCanvas(550, 550);
  p.frameRate(1);

  // canvasの外枠に黒い縁を描く
  p.noStroke();
  p.fill(255);
  p.rect(0, 0, p.width, p.height);

  const LENGTH: number = 500;
  const HORIZONTAL: number = h;
  const VERTICAL: number = v;
  console.log(HORIZONTAL, VERTICAL);
  const thr: number = Thr;
  // ratioは横/縦, ration > 1は横長, ratio < 1は縦長
  const ratio = HORIZONTAL / VERTICAL;

  let size = LENGTH;
  let xPos = 25;
  let yPos = 25;

  p.colorMode(p.HSB, 1);
  p.noStroke();

  // divSquareのremには長方形の横, horizontalを引数に渡す
  // divideSquare(p, rem, ratio, xPos, yPos);
  recurDivideSquare(p, thr, size, ratio, xPos, yPos);
};

export default setup;
