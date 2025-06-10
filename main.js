// canvas setting
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameoverImage;
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

function loadImage() {
  function createImage(src) {
    const img = new Image();
    img.src = "images/" + src;
    return img;
  }
  backgroundImage = createImage("background.png");
  spaceshipImage = createImage("spaceship.png");
  bulletImage = createImage("bullet.png");
  enemyImage = createImage("enemy.png");
  gameoverImage = createImage("gameover.png");
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main() {
  render();
  requestAnimationFrame(main);
}

loadImage();
main();
