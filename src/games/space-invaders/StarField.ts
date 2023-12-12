export class StarField {
  img: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement) {
    this.img = new Image();
    this.img.src = "";
  }

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
    );
  }
}
