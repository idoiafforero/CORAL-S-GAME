class Game {
    constructor(ctx) {
      this.ctx = ctx

      this.background = new Background(ctx)
      this.fish = new Fish(ctx)
      this.intervalId = null   
    }

start() {
this.intervalId = setInterval(() => {
this.clear()
this.draw()
this.move()
  }, 1000 / 60)
}

clear() {
this.ctx.clearRect(0, 0, this.ctx.canvas.with, this.ctx.canvas.heigth)

  }

move() {
this.background.move()
this.fish.move()
}

draw() {
this.background.draw();
this.fish.draw();
  }

}