import type { BulletController } from "./BulletController";
import { Explosion } from "./Explosion";
import { Mob } from "./Mob";

export class MobsController {
  canvas: HTMLCanvasElement;
  mobs: Mob[] = [];
  shipBulletsController: BulletController;
  explosions: Explosion[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    shipBulletsController: BulletController,
  ) {
    this.canvas = canvas;
    this.shipBulletsController = shipBulletsController;
    this.createMobs();
  }

  update(ctx: CanvasRenderingContext2D) {
    this.explosions.forEach((explosion, index) => {
      explosion.draw();

      if (explosion.isFinished) {
        this.explosions.splice(index, 1);
      }
    });
    this.removeShootMobs();
    this.refillMobs();

    this.mobs.forEach((mob) => {
      mob.update(ctx);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.mobs.forEach((mob) => {
      mob.draw(ctx);
    });
  }

  createMobs() {
    const pattern = Math.random() > 0.5 ? "circular" : "sin-wave";
    const randomX = Math.random() * this.canvas.width;

    // Create mobs
    for (let i = 0; i < 10; i++) {
      this.mobs.push(
        new Mob({ x: randomX, y: 25 * -i }, { width: 40, height: 40 }, pattern),
      );
    }
  }

  refillMobs() {
    if (this.mobs.length === 0) {
      this.createMobs();
    }
  }

  removeShootMobs() {
    this.mobs.forEach((mob, index) => {
      if (
        this.shipBulletsController.isCollidingWith({
          x: mob.coords.x,
          y: mob.coords.y,
          width: mob.size.width,
          height: mob.size.height,
        })
      ) {
        this.mobs.splice(index, 1);
        this.explosions.push(new Explosion(this.canvas, mob.coords));
      }
    });
  }
}
