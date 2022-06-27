class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.background = new Background(ctx);
    this.fish = new Fish(ctx);
    this.intervalId = null;
    this.jellyfishArray = [];

    this.jellyfishTick = 0;

    this.gameOver();
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      this.checkCollisions();
      this.jellyfishTick += 1;

      if (this.jellyfishTick % 60 === 0) {
        console.log("entro");
        this.jellyfishArray.push(new Jellyfish(this.ctx));
        this.jellyfishTick = 0;
      }
    }, 1000 / 60);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.with, this.ctx.canvas.heigth);
  }

  move() {
    this.background.move();
    this.fish.move();
    this.jellyfishArray.forEach((jellyfish) => {
      jellyfish.move();
    });
  }

  checkCollisions() {
    let fishVsjellyfish = this.jellyfishArray.find((obs) =>
      obs.collide(this.fish)
    );

    if (fishVsjellyfish) {
      this.fish.life -= 1;
    }

    if (this.fish.life <= 0) {
      this.gameOver();
    }
  }

  gameOver() {
    clearInterval(this.intervalId);
    this.intervalId = null;

    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }

  addJellyfish() {
    this.jellyfishArray.push(new Jellyfish(this.ctx));
  }

  draw() {
    this.background.draw();
    this.fish.draw();
    this.jellyfishArray.forEach((jellyfish) => {
      jellyfish.draw();
    });
  }
}
