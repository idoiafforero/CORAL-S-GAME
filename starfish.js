class Starfish {
  constructor(ctx) {
    this.ctx = ctx;
    this.radio = 20;
    this.w = 30;
    this.x = this.ctx.canvas.width;
    this.y = Math.random() * (FLOOR - WATERLIMIT) + WATERLIMIT;
    this.vx = -4;
    this.h = 30;
    this.vy = 0;

    this.color = "yellow";
  }

  collide(fish) {
    const collideX = fish.x + fish.w > this.x && fish.x < this.x + this.w;
    const collideY = fish.y < this.y + this.h && fish.y + fish.h > this.y;
    //console.table({ collidex: collideX, collideY: collideY });

    return collideX && collideY;
  }

  move() {
    this.y += this.vy;
    this.x += this.vx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.closePath();
  }
}
