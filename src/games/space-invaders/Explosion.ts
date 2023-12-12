import type { Point } from "./types";

const EXPLOSION_1 = [
  "              ",
  "              ",
  "     ZZZZ     ",
  "   ZZZZZZZZ   ",
  "     ZZZZ     ",
  "              ",
  "              ",
];

const EXPLOSION_2 = [
  "              ",
  "  Z  Z  Z  Z  ",
  "   Z  ZZ  Z   ",
  " ZZ Z    Z ZZ ",
  "   Z  ZZ  Z   ",
  "  Z  Z  Z  Z  ",
  "              ",
];

const EXPLOSION_3 = [
  " Z  Z    Z  Z ",
  "  Z  Z  Z  Z  ",
  "   Z      Z   ",
  "ZZ          ZZ",
  "   Z      Z   ",
  "  Z  Z  Z  Z  ",
  " Z  Z    Z  Z ",
];

const EXPLOSION_4 = [
  " Z  Z    Z  Z ",
  "  Z        Z  ",
  "              ",
  "Z            Z",
  "              ",
  "  Z        Z  ",
  " Z  Z    Z  Z ",
];

const EXPLOSION_5 = [
  " Z          Z ",
  "              ",
  "              ",
  "              ",
  "              ",
  "              ",
  " Z          Z ",
];

const COLOR_MAP = ["#FFFF00", "#FFA500", "#FF4500", "#8B0000", "#800000"];

export class Explosion {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  speed = 200; // ms
  pixelSize = 3; // px
  frames = [EXPLOSION_1, EXPLOSION_2, EXPLOSION_3, EXPLOSION_4, EXPLOSION_5];
  currentFrame = 0;
  lastUpdateTime = Date.now();
  isFinished = false;
  coords: Point;

  constructor(canvas: HTMLCanvasElement, coord: Point) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.coords = coord;
  }

  draw() {
    const currentTime = Date.now();

    this.drawFrame(
      this.frames[this.currentFrame],
      this.coords.x - this.pixelSize * 4,
      this.coords.y - this.pixelSize * 4,
    );

    if (currentTime - this.lastUpdateTime > this.speed && !this.isFinished) {
      this.currentFrame++;
      if (this.currentFrame >= this.frames.length) {
        this.currentFrame = 0;
      }

      this.lastUpdateTime = currentTime;
    }

    if (this.currentFrame === this.frames.length - 1) {
      this.isFinished = true;
    }
  }
  drawFrame(frame: string[], x: number, y: number) {
    const color = COLOR_MAP[this.currentFrame];

    frame.forEach((row, rowIndex) => {
      row.split("").forEach((pixel, pixelIndex) => {
        if (pixel === "Z") {
          this.ctx.fillStyle = color;
          this.ctx.fillRect(
            x + pixelIndex * this.pixelSize,
            y + rowIndex * this.pixelSize,
            this.pixelSize,
            this.pixelSize,
          );
        }
      });
    });
  }
}
