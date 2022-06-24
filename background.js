class Background {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;
    //this.vx = -4

    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.img = new Image();
    this.img.src = "/img/IMG_4185.PNG";
}

draw() { 
    this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h 
  );

  this.ctx.drawImage(
    this.img,
    this.x + this.ctx.canvas.width,
    this.y,
    this.w,
    this.h
  );
  }

}

  