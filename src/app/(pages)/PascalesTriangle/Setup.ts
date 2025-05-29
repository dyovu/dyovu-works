import p5 from 'p5';

const setup = (p: p5) => {
  p.createCanvas(500, 500);
  p.frameRate(30);
  p.colorMode(p.HSB);
};

export default setup;