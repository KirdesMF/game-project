import { Bullet } from "./Bullet";
import type { Point, Size, Sprite } from "./types";

export class BulletController {
  bullets: Bullet[] = [];
  maxBullets = 10;
  fireRate = 0;
  color: string = "#0095DD";
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, maxBullets: number, color: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.maxBullets = maxBullets;
    this.color = color;
  }

  update() {
    // filter offscreen bullets
    this.bullets = this.bullets.filter(
      (bullet) => !bullet.isOffScreen(this.canvas),
    );

    // decrease fire rate
    if (this.fireRate > 0) {
      this.fireRate--;
    }
  }

  draw() {
    // draw bullets
    this.bullets.forEach((bullet) => {
      bullet.update();
      bullet.draw(this.ctx);
    });
  }

  shoot(coords: Point, velocity: Point, size: Size) {
    if (this.fireRate > 0 || this.bullets.length >= this.maxBullets) return;

    // add bullet to bullets array
    this.bullets.push(new Bullet(coords, size, velocity, this.color));

    // reset fire rate
    this.fireRate = 10;
  }

  isCollidingWith(sprite: Sprite) {
    // find colliding bullet index
    const collidingBullet = this.bullets.findIndex((bullet) =>
      bullet.isCollidingWith(sprite),
    );

    // if colliding bullet exists, remove it from bullets array
    if (collidingBullet >= 0) {
      this.bullets.splice(collidingBullet, 1);
      return true;
    }

    return false;
  }
}
