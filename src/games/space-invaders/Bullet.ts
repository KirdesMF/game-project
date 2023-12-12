import type { Point, Size, Sprite } from "./types";

export class Bullet {
  coords: Point;
  size: Size;
  velocity: Point;
  color: string;

  constructor(coords: Point, size: Size, velocity: Point, color: string) {
    this.coords = coords;
    this.size = size;
    this.velocity = velocity;
    this.color = color;
  }

  update() {
    this.coords.y -= this.velocity.y;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(
      this.coords.x,
      this.coords.y,
      this.size.width,
      this.size.height,
    );
  }

  isCollidingWith(sprite: Sprite) {
    return (
      this.coords.x < sprite.x + sprite.width &&
      this.coords.x + this.size.width > sprite.x &&
      this.coords.y < sprite.y + sprite.height &&
      this.coords.y + this.size.height > sprite.y
    );

    // return (
    //   this.coords.x + this.size.width > sprite.x &&
    //   this.coords.x < sprite.x + sprite.width &&
    //   this.coords.y + this.size.height > sprite.y &&
    //   this.coords.y < sprite.y + sprite.height
    // );
  }

  isOffScreen(canvas: HTMLCanvasElement) {
    return (
      this.coords.x < 0 ||
      this.coords.x > canvas.width ||
      this.coords.y < 0 ||
      this.coords.y > canvas.height
    );
  }
}
