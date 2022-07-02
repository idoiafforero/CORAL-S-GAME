class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.background = new Background(ctx);
    this.fish = new Fish(ctx);
    this.intervalId = null;
    this.jellyfishArray = [];
    this.starfishArray = [];
    this.invincible = false;
    this.jellyfishTick = 0;
    this.starfishTick = 0;

    this.count = 0;

    this.gameOver();
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      this.checkCollisions();
      this.jellyfishTick += 1;
      this.starfishTick += 1;
      //console.log(this.starfishTick);

      if (this.jellyfishTick % 60 === 0) {
        //console.log("entro");
        this.jellyfishArray.push(new Jellyfish(this.ctx));
        this.jellyfishTick = 0;
      }

      if (this.starfishTick % 480 === 0) {
        //console.log("Entro (2)");
        this.starfishArray.push(new Starfish(this.ctx));
        this.starfishTick = 0;
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
    this.starfishArray.forEach((starfish) => {
      starfish.move();
    });
  }

  checkCollisions() {
    let fishVsstarfish = this.starfishArray.find((star) => {
      return star.collide(this.fish);
    });

    if (fishVsstarfish) {
      this.starfishArray = this.starfishArray.filter(
        (star) => star !== fishVsstarfish
      );
      this.fish.invincible = true;
      this.fish.color = "green";

      setTimeout(() => {
        this.fish.invincible = false;
        this.fish.color = "purple";
        console.log("se acabó la invencibilidad :(");
      }, 5000);
    }

    if (!this.fish.invincible) {
      let fishVsjellyfish = this.jellyfishArray.find((obs) =>
        obs.collide(this.fish)
      );

      if (fishVsjellyfish) {
        this.jellyfishArray = this.jellyfishArray.filter(
          (obs) => obs !== fishVsjellyfish
        );

        this.fish.life -= 1;
        this.fish.color = "red";

        setTimeout(() => {
          this.fish.invincible = false;
          this.fish.color = "purple";
        }, 1000);
      }

      if (this.fish.life <= 0) {
        this.gameOver();
      }
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
    this.starfishArray.forEach((starFish) => {
      starFish.draw();
    });
  }
}
