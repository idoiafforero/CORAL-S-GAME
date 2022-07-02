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

    this.actions = {
      up: false,
      down: false,
      right: false,
      left: false,
    };

    this._setListeners();
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
      this.x = this.minX;
    }

    if (this.x >= RIGHTLIMIT) {
      this.x = this.maxX;
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
      this.vx = -0.5;
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

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.ctx.closePath();
  }
}
