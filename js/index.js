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
  const obstacleImg = new Image();
  obstacleImg.src = "images/asteroids.png";

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
        }, 35);
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
    document.getElementById("cover").style.display = "none";
  

    const bgMusic = document.getElementById("bg-music");
    bgMusic.play()

    //set up basics
    ctx.drawImage(img, 0, 0, 1800, 900);
    drawDog();
  
    //set up game counter
    function updateCounter() {
      counter++;
    }
    setInterval(updateCounter, 1000);
    
    let gameOverFlag = false;
  
    //obstacles and stages
    function updateObstacles() {
      if (!gameOverFlag) {
        ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
  
        // update background image based on game counter
        if (counter < 10) {
          img = img;
        } else if (counter < 20) {
          img = img2;
        } else if (counter < 30) {
          img = img3;
        } else {
          img = img4;
        }
  
        ctx.drawImage(img, 0, 0, 1800, 900);
  
        // draw dog
        if (isJumping) {
          dogImg = dogJumpImg;
        } else {
          dogImg = dogStandImg;
        }
        ctx.drawImage(dogImg, dogX, dogY, 350, 300);
  
    // draw obstacles
    obstacles.forEach((obstacle) => {
      obstacle.x -= 3;
      const obstacleImg = new Image();
      obstacleImg.src = "images/asteroids.png";
      ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      if (dogX + 300 > obstacle.x && dogX < obstacle.x + obstacle.width && dogY + 200 > obstacle.y && dogY < obstacle.y + obstacle.height) {
        gameOver();
      }
    });

    // remove obstacles that have gone off-screen
    obstacles = obstacles.filter(obstacle => obstacle.x > -obstacle.width);

    if (obstacles.length === 0) {
      const obstacleWidth = 100;
      const obstacleY = Math.floor(Math.random() * (theCanvas.height - 100 - jumpHeight)) + 50;
      obstacles.push({
        x: theCanvas.width,
        y: obstacleY,
        width: obstacleWidth,
        height: obstacleWidth,
      });
    }
  
        if (!gameOverFlag) {
          requestAnimationFrame(updateObstacles);
        }
      }
    }
    requestAnimationFrame(updateObstacles);
  
    // handle game over
    function gameOver() {
      // load game over image
      const gameOverImg = new Image();
      gameOverImg.src = 'images/gameover.png';
    
      // create an Audio object for the audio clip
      const gameOverAudio = new Audio('images/missionfailed.mp3');
    
      // wait for the image to load
      gameOverImg.onload = () => {
        // display the image
        ctx.drawImage(gameOverImg, 0, 0, theCanvas.width, theCanvas.height);
        // play the audio clip
        gameOverAudio.play();
      };
    
      // reset game state
      gameOverFlag = true;
      clearInterval(obstacleIntervalId);
      location.reload();
      document.getElementById("start-button").style.display = "block";
    }
    
  
  }
  
  document.getElementById("start-button").onclick = startGame;
  
  })();