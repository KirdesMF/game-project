import type { Point, Size } from "./types";

export class Mob {
  coords: Point;
  size: Size;
  velocity: Point;
  rotation: number;
  pattern: "circular" | "sin-wave";
  image: HTMLImageElement;

  constructor(coords: Point, size: Size, pattern: "circular" | "sin-wave") {
    this.coords = coords;
    this.size = size;
    this.velocity = { x: 0.5, y: 1 };
    this.rotation = 0;
    this.pattern = pattern;
    this.image = new Image();
    this.image.src = "/img/mob.png";
  }

  update(ctx: CanvasRenderingContext2D) {
    switch (this.pattern) {
      case "circular":
        this.circular(ctx);
        break;
      case "sin-wave":
        this.sinWave(ctx);
        break;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.coords.x, this.coords.y);
    ctx.rotate(this.rotation);

    ctx.filter = "invert(1)";

    ctx.drawImage(
      this.image,

      0,
      0,
      this.size.width,
      this.size.height,
    );

    ctx.restore();
  }

  circular(ctx: CanvasRenderingContext2D) {
    const height = ctx.canvas.height;

    this.coords.y += this.velocity.y;
    // Perform circular motion
    this.rotation += this.velocity.x / 10; // Adjust the divisor to control the speed of the circle
    this.coords.x += Math.cos(this.rotation) * 5; // The '20' controls the radius of the circle
    this.coords.y += Math.sin(this.rotation) * 5;

    if (this.coords.y > height) {
      this.coords.y = 0;
    }
  }

  sinWave(ctx: CanvasRenderingContext2D) {
    const height = ctx.canvas.height;

    this.coords.y += this.velocity.y;
    // Perform sinusoidal motion
    this.coords.x += Math.sin(this.coords.y / 20) * 2; // The '50' controls the frequency of the wave

    if (this.coords.y > height) {
      this.coords.y = 0;
      this.coords.x = ctx.canvas.width / 2;
    }

    if (this.coords.x > ctx.canvas.width) {
      this.coords.x = 0;
    }
  }
}
