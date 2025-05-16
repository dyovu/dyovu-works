import p5 from 'p5';

export const recurDivideSquare = (
  p: p5,
  thr: number,
  size: number,
  ratio: number,
  xPos: number,
  yPos: number
) => {
  let ittr = 0;
  let xEndPos = size + xPos;
  let yEndPos = size + yPos;
  let rem = size;

  if (ratio < 1) {
    ittr = 0;
  } else {
    ittr = 1;
  }
  p.fill(p.color(p.random(1), 0.4, 1));
  p.rect(xPos, yPos, rem, rem);

  while (rem > thr) {
    ittr++;
    if (ittr % 2 == 1) {
      while (xPos + rem * ratio < xEndPos + 0.1) {
        ratio > 1
          ? recurDivideRectangle(p, thr, rem * ratio, ratio, xPos, yPos)
          : recurDivideRectangle(p, thr, rem, ratio, xPos, yPos);
        xPos += rem * ratio;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem / ratio < yEndPos + 0.1) {
        ratio > 1
          ? recurDivideRectangle(p, thr, rem, ratio, xPos, yPos)
          : recurDivideRectangle(p, thr, rem / ratio, ratio, xPos, yPos);
        yPos += rem / ratio;
      }
      rem = yEndPos - yPos;
    }
  }
};

export const recurDivideRectangle = (
  p: p5,
  thr: number,
  wd: number,
  ratio: number,
  xPos: number,
  yPos: number
) => {
  let ittr = 0;
  let rem;
  let xEndPos;
  let yEndPos;

  if (ratio < 1) {
    xEndPos = wd * ratio + xPos;
    yEndPos = wd + yPos;
    rem = wd * ratio;
    ittr = 0;
    p.fill(p.color(p.random(1), 0.4, 1));
    p.rect(xPos, yPos, wd * ratio, wd);
  } else {
    xEndPos = wd + xPos;
    yEndPos = wd / ratio + yPos;
    rem = wd / ratio;
    ittr = 1;
    p.fill(p.color(p.random(1), 0.4, 1));
    p.rect(xPos, yPos, wd, wd / ratio);
  }

  while (rem > thr) {
    ittr++;
    if (ittr % 2 == 0) {
      while (xPos + rem <= xEndPos + 0.1) {
        recurDivideSquare(p, thr, rem, ratio, xPos, yPos);
        xPos += rem;
      }
      rem = xEndPos - xPos;
    } else {
      while (yPos + rem <= yEndPos + 0.1) {
        recurDivideSquare(p, thr, rem, ratio, xPos, yPos);
        yPos += rem;
      }
      rem = yEndPos - yPos;
    }
  }
};
