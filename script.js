const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game = new Game(ctx);

const startBtn = document.querySelector(".start-btn");

window.onload = () => {
  document.querySelector(".start-btn").onclick = () => {
    startgame();
  };
  function startgame() {
    if (game.intervalId === null) {
      game.start();
    } else {
      game.pause();
      game.score();
    }
  }
};
