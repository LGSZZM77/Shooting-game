// canvas setting
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

//우주선
const spaceshipSize = 64;
const halfSpaceshipSize = 32;
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameoverImage;
let spaceshipX = canvas.width / 2 - halfSpaceshipSize;
let spaceshipY = canvas.height - spaceshipSize;

// 총알
let bulletList = [];
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = () => {
    this.x = spaceshipX + halfSpaceshipSize - 12;
    this.y = spaceshipY;
    bulletList.push(this);
  };
  this.update = () => {
    this.y -= 5;
  };
}

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

let keysDown = {};
function setupKeyboardListner() {
  document.addEventListener("keydown", (event) => {
    keysDown[event.key] = true;
  });
  document.addEventListener("keyup", (event) => {
    delete keysDown[event.key];
    if (event.key === " ") {
      createBullet();
    }
  });
}

function createBullet() {
  let b = new Bullet();
  b.init();
}

function update() {
  if (keysDown["ArrowRight"]) {
    spaceshipX += 2;
  }
  if (keysDown["ArrowLeft"]) {
    spaceshipX -= 2;
  }
  if (spaceshipX >= canvas.width - spaceshipSize) {
    spaceshipX = canvas.width - spaceshipSize;
  }
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }

  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, spaceshipSize, spaceshipSize);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
  }
}

function main() {
  update();
  render();
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListner();
main();
