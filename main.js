// canvas setting
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameoverImage;
let gameover = false;

//우주선
const spaceshipSize = 64;
const halfSpaceshipSize = 32;
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
function generateRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let enemyList = [];
function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = () => {
    this.x = generateRandomValue(0, canvas.width - 48);
    this.y = 0;
    enemyList.push(this);
  };
  this.update = () => {
    this.y += 1;

    if (this.y > canvas.height - 48) {
      gameover = true;
      console.log("gameover");
    }
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

function createEnemy() {
  const interval = setInterval(() => {
    let e = new Enemy();
    e.init();
  }, 1000);
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

  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, spaceshipSize, spaceshipSize);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}

function main() {
  if (!gameover) {
    update();
    render();
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameoverImage, 10, 100 - 100, 380, 380);
  }
}

loadImage();
setupKeyboardListner();
createEnemy();
main();
