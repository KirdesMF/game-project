import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Ship } from "./Ship";
import { css } from "../../../styled-system/css";
import { BulletController } from "./BulletController";
import { MobsController } from "./MobsController";
import { StarField } from "./StarField";

export const SpaceInvaders = component$(() => {
  const canvas = useSignal<HTMLCanvasElement>();

  useVisibleTask$(() => {
    if (!canvas.value) return;

    const ctx = canvas.value.getContext("2d") as CanvasRenderingContext2D;

    canvas.value.width = canvas.value.offsetWidth;
    canvas.value.height = canvas.value.offsetHeight;

    const playerBullets = new BulletController(canvas.value, 5, "blue");
    const ship = new Ship(canvas.value, playerBullets);
    const mobs = new MobsController(canvas.value, playerBullets);
    const stars = new StarField(canvas.value);

    function gameLoop() {
      if (!canvas.value) return;

      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

      // stars.update();
      // stars.draw(ctx);

      playerBullets.update();
      playerBullets.draw();

      ship.update();
      ship.draw();

      mobs.update(ctx);
      mobs.draw(ctx);

      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(gameLoop);
    }

    gameLoop();
  });

  return (
    <canvas
      ref={canvas}
      class={css({
        width: 600,
        height: 800,
        bgImage: `url(/img/bg.png)`,
      })}
    />
  );
});
