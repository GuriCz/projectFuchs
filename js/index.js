(() => {

  const theCanvas = document.getElementById("canvas");
  const ctx = theCanvas.getContext("2d");


  let img = new Image();
  img.src = "images/night.jpg";
  const img2 = new Image();
  img2.src = "images/moon.jpg";
  const img3 = new Image();
  img3.src = "images/solarsystem.jpg";
  const img4 = new Image();
  img4.src = "images/universe.jpg";
  const dogStandImg = new Image();
  dogStandImg.src = "images/doggo2.png";
  const dogJumpImg = new Image();
  dogJumpImg.src = "images/doggojump.png";

  let dogImg = dogStandImg;
  let counter = 0;
  let dogX = 100;
  let dogY = 400;
  let isJumping = false;
  let jumpHeight = 100;
  let jumpSpeed = 10;
  let obstacles = [];

  function drawDog() {
    if (isJumping) {
      dogImg = dogJumpImg;
    } else {
      dogImg = dogStandImg;
    }
    ctx.drawImage(dogImg, dogX, dogY, 350, 400);
  }

  function jump() {
    isJumping = true;
    let intervalId = setInterval(() => {
      dogY -= jumpSpeed;
      if (dogY <= jumpHeight) {
        clearInterval(intervalId);
        let descendId = setInterval(() => {
          dogY += jumpSpeed;
          if (dogY >= 500) {
            clearInterval(descendId);
            isJumping = false;
          }
        }, 20);
      }
    }, 10);
  }

  document.addEventListener("keydown", function (event) {
    event.preventDefault();
    const key = event.key;
    if (!isJumping) {
      if (key === "ArrowUp") {
        jump();
      } else if (key === "ArrowLeft") {
        dogX -= 30;
      } else if (key === "ArrowRight") {
        dogX += 30;
      } else if (key === "ArrowDown") {
        dogY += 30;
      }
    }
  });



  function startGame() {

    //hide button
    document.getElementById("start-button").style.display = "none";

    //set up basics
    ctx.drawImage(img, 0, 0, 1800, 900);
    drawDog();

    //set up game counter
    function updateCounter() {
      counter++;
    }
    setInterval(updateCounter, 1000);

    //obstacles and stages
      function updateObstacles() {
        ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
        if (counter < 10){
          img = img;
        }
        else if (counter > 10 && counter < 20){
          img = img2;
        }
        else if (counter > 20 && counter < 30){
          img = img3;
        }
        else if (counter > 30){
          img = img4;
        }
        ctx.drawImage(img, 0, 0, 1800, 900);
        if (isJumping) {
          dogImg = dogJumpImg;
        } else {
          dogImg = dogStandImg;
        }
        ctx.drawImage(dogImg, dogX, dogY, 350, 300);
        ctx.fillStyle = 'white';
        obstacles.forEach((obstacle) => {
          obstacle.x -= 5;
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
          if (dogX + 300 > obstacle.x && dogX < obstacle.x + obstacle.width && dogY + 200 > obstacle.y && dogY < obstacle.y + obstacle.height) {
            gameOver();
          }
        });
        requestAnimationFrame(updateObstacles);
      }
      requestAnimationFrame(updateObstacles);

      //actually spawn the obstacles
      function spawnObstacle() {
        const maxWidth = 200;
        const minWidth = 50;
        const maxObstY = 800;
        const minObstY = 400;
        const obstacleY = Math.floor(Math.random() * (maxObstY - minObstY + 1)) + minObstY;
        const obstacleWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
        obstacles.push({
          x: theCanvas.width, // spawn on right edge of canvas
          y: obstacleY,
          width: obstacleWidth,
          height: 50,
        });
      }      
      setInterval(spawnObstacle, 1500);
    }
  
    document.getElementById("start-button").onclick = startGame;
  })();
