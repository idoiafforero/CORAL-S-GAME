class Jellyfish {
  constructor(ctx) {
    this.ctx = ctx;
    this.radio = 20;
    this.w = 30;
    this.x = this.ctx.canvas.width;
    this.y = Math.random() * (FLOOR - WATERLIMIT) + WATERLIMIT;
    this.vx = -4;
    this.h = 30;
    this.vy = 0;

    this.color = "blue";

    this.img = new Image();
    this.img.src = "/img/JELLYFISH.png";
    this.img.frames = 5;
    this.img.frameIndex = 0;
    this.tick = 0;
  }
  draw() {
    this.ctx.drawImage(
      this.img,
      (this.img.frameIndex * this.img.width) / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animate();
  }

  animate() {
    this.tick++;

    if (this.tick > 10) {
      this.tick = 0;
      this.img.frameIndex++;
    }

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0;
    }
  }

  collide(fish) {
    const collideX = fish.x + fish.w > this.x && fish.x < this.x + this.w;
    const collideY = fish.y < this.y + this.h && fish.y + fish.h > this.y;

    return collideX && collideY;
  }

  move() {
    this.y += this.vy;
    this.x += this.vx;
  }
}
