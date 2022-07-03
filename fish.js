class Fish {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 50;
    this.y = 300;
    this.vy = 0;
    this.vx = 0;

    this.invincible = false;

    this.w = 50;
    this.h = 50;
    this.life = 100;
    this.color = "purple";
    this.img = new Image();
    this.img.src = "./img/FISH.png";
    this.img.frames = 4;
    this.img.frameIndex = 0;
    this.tick = 0;
    this.debugTick = 0;

    this.actions = {
      up: false,
      down: false,
      right: false,
      left: false,
    };

    this._setListeners();

    this.redFishImg = new Image();
    this.redFishImg.src = "./img/red_fish.png";

    this.greenFishImg = new Image();
    this.greenFishImg.src = "./img/green_fish.png";
  }

  draw() {
    this.debugTick++;

    if (this.color === "green") {
      this.ctx.drawImage(
        this.greenFishImg,
        (this.img.frameIndex * this.img.width) / this.img.frames,
        0,
        this.img.width / this.img.frames,
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
      );
    } else if (this.color === "red") {
      this.ctx.drawImage(
        this.redFishImg,
        (this.img.frameIndex * this.img.width) / this.img.frames,
        0,
        this.img.width / this.img.frames,
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
      );
    } else {
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
    }
    if (this.debugTick % 60 === 0) {
      console.log(this.img);
      this.debugTick = 0;
    }
    this.animate();
  }

  move() {
    this._applyActions();
    this.y += this.vy;
    this.x += this.vx;

    if (this.y < WATERLIMIT) {
      this.y = WATERLIMIT;
    }
    if (this.y + this.h > FLOOR) {
      this.y = FLOOR - this.h;
    }

    if (this.x <= LEFTLIMIT) {
      this.x = LEFTLIMIT;
    }

    if (this.x >= RIGHTLIMIT) {
      this.x = RIGHTLIMIT;
    }
  }
  _setListeners() {
    document.onkeydown = (e) => this._switchAction(e.code, true);
    document.onkeyup = (e) => this._switchAction(e.code, false);
  }

  _applyActions() {
    if (this.actions.up) {
      this.vy += -0.3;
    } else if (this.actions.down) {
      this.vy += 0.3;
    } else {
      this.vy = 0;
    }

    if (this.actions.right) {
      this.vx += 0.5;
    } else if (this.actions.left) {
      this.vx -= 0.5;
    } else {
      this.vx = 0;
    }
  }

  _switchAction(key, apply) {
    switch (key) {
      case UP:
        this.actions.up = apply;
        break;
      case DOWN:
        this.actions.down = apply;
        break;
      case RIGHT:
        this.actions.right = apply;
        break;
      case LEFT:
        this.actions.left = apply;
        break;
    }
  }

  animate() {
    this.tick++;

    if (this.tick > 5) {
      this.tick = 0;
      this.img.frameIndex++;
    }

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0;
    }
  }
}
