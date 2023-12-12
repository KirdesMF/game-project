import type { BulletController } from "./BulletController";
import type { Point, Size } from "./types";

export class Ship {
  ctx: CanvasRenderingContext2D;
  coords: Point;
  size: Size = { width: 65, height: 65 };
  velocity: Point = { x: 0, y: 0 };
  acceleration = 0.5;
  maxSpeed = 20;
  bullets: BulletController;
  keys: Record<string, boolean> = {};
  image: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, bullets: BulletController) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.coords = {
      x: canvas.width / 2 - this.size.width / 2,
      y: canvas.height - this.size.height - 10,
    };
    this.bullets = bullets;
    this.image = new Image();
    this.image.src = "/img/ship.png";

    document.addEventListener("keydown", (event) => {
      this.keys[event.key] = true;
    });
    document.addEventListener("keyup", (event) => {
      this.keys[event.key] = false;
    });
  }

  update() {
    this.move();
    this.shoot();
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.coords.x,
      this.coords.y,
      this.size.width,
      this.size.height,
    );
  }

  move() {
    // left and right
    if (this.keys["ArrowLeft"] || this.keys["q"]) {
      this.velocity.x -= this.acceleration;
    } else if (this.keys["ArrowRight"] || this.keys["d"]) {
      this.velocity.x += this.acceleration;
    } else {
      // slow down
      this.velocity.x *= 0.5;
    }

    // up and down
    if (this.keys["ArrowUp"] || this.keys["z"]) {
      this.velocity.y -= this.acceleration;
    } else if (this.keys["ArrowDown"] || this.keys["s"]) {
      this.velocity.y += this.acceleration;
    } else {
      // slow down
      this.velocity.y *= 0.5;
    }

    // limit the speed
    this.velocity.x = Math.max(
      -this.maxSpeed,
      Math.min(this.maxSpeed, this.velocity.x),
    );
    this.velocity.y = Math.max(
      -this.maxSpeed,
      Math.min(this.maxSpeed, this.velocity.y),
    );

    // move the ship
    this.coords.x += this.velocity.x;
    this.coords.y += this.velocity.y;

    // keep the ship in the canvas
    this.coords.x = Math.max(
      0,
      Math.min(this.coords.x, this.ctx.canvas.width - this.size.width),
    );
    this.coords.y = Math.max(
      0,
      Math.min(this.coords.y, this.ctx.canvas.height - this.size.height),
    );
  }

  shoot() {
    if (this.keys[" "]) {
      this.bullets.shoot(
        { x: this.coords.x + this.size.width / 2 - 2.5, y: this.coords.y },
        { x: 10, y: 10 },
        { width: 5, height: 25 },
      );
    }
  }
}
