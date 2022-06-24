class Fish {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 50;
    this.y = 300;

    this.w = 50;
    this.h = 50;
    
    this.color = 'purple';

  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x,
      this.y,
      this.w,
      this.h,
      
    );
    this.ctx.closePath();
  }
}