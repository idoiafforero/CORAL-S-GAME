class Fish {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 50;
    this.y = 300;
    this.vy = 0;

    this.w = 50;
    this.h = 50;
    this.life = 100;
    this.color = "purple";

    this.actions = {
      up: false,
      down: false,
    };

    this._setListeners();
  }
  move() {
    this._applyActions();
    this.y += this.vy;

    if (this.y < WATERLIMIT) {
      this.y = WATERLIMIT;
    }
    if (this.y + this.h > FLOOR) {
      this.y = FLOOR - this.h;
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
  }

  _switchAction(key, apply) {
    switch (key) {
      case UP:
        this.actions.up = apply;
        break;
      case DOWN:
        this.actions.down = apply;
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
