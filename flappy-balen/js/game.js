
// document.addEventListener("DOMContentLoaded", function () {

//   /* =========================
//        CANVAS SETUP
//   ========================== */
//   const canvas = document.getElementById("gameCanvas");
//   const ctx = canvas.getContext("2d");
//   canvas.width = 360;
//   canvas.height = 600;

//   /* =========================
//        IMAGE LOADER
//   ========================== */
//   function loadImg(src) { const img = new Image(); img.src = src; return img; }

//   const birdImgs = {
//     Balen: loadImg("assets/balen.png"),
//     Oli: loadImg("assets/oli.png"),
//     Sher: loadImg("assets/sher.png"),
//     Prachanda: loadImg("assets/prachanda.png"),
//     HarkaSampang: loadImg("assets/harkasampang.png"),
//     Ravi: loadImg("assets/ravi.png"),
//     Durgaprasai: loadImg("assets/durgaprasai.png"),
//     NikolasBhusal: loadImg("assets/nikolasbhusal.png")
//   };

//   const bgImgs = {
//     leadersworld: loadImg("assets/background.png"),
//     RSP: loadImg("assets/rsp-bg.png"),
//     Congress: loadImg("assets/congress-bg.png"),
//     CPN: loadImg("assets/cpn-bg.png")
//   };

//   /* =========================
//        SHOP & SELECTION
//   ========================== */
//   let coins = parseInt(localStorage.getItem("coins")) || 0;
//   let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};
//   let selectedParty = localStorage.getItem("selectedTheme") || "leadersworld";
//   let selectedCharacter = localStorage.getItem("selectedCharacter") || null;

//   const allCharacters = {
//     Balen: { unlocked: false, price: 3 },
//     Oli: { unlocked: false, price: 100 },
//     Sher: { unlocked: false, price: 150 },
//     Prachanda: { unlocked: true, price: 0 },
//     HarkaSampang: { unlocked: false, price: 250 },
//     Ravi: { unlocked: true, price: 0 },
//     Durgaprasai: { unlocked: false, price: 300 },
//     NikolasBhusal: { unlocked: false, price: 300 }
//   };

//   // Load unlock status from localStorage
//   Object.keys(allCharacters).forEach(c => {
//     if(localStorage.getItem("char_" + c) === "true") allCharacters[c].unlocked = true;
//   });

//   if (!selectedCharacter) {
//     selectedCharacter = Object.keys(allCharacters).find(c => allCharacters[c].unlocked);
//     localStorage.setItem("selectedCharacter", selectedCharacter);
//   }

//   /* =========================
//        PANEL CONTROL
//   ========================== */
//   function hideAllPanels() { document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active")); }
//   function showPanel(id) { document.getElementById(id).classList.add("active"); }

//   window.goHome = function() {
//     hideAllPanels();
//     showPanel("home");
//     canvas.style.display = "none";
//     displayLeaderboard();
//   };

//   function displayLeaderboard() {
//     const list = document.getElementById("home-leaderboard-list");
//     if (!list) return;
//     list.innerHTML = "";
//     Object.entries(leaderboard)
//       .sort((a,b)=>b[1]-a[1])
//       .slice(0,5)
//       .forEach(([name,val],i)=>{
//         const div = document.createElement("div");
//         div.innerText = `${i+1}. ${name} - ${val} coins`;
//         list.appendChild(div);
//       });
//   }

//   window.goToPartyMenu = function() { hideAllPanels(); showPanel("party-menu"); };

//   window.chooseParty = function(party) {
//     selectedParty = party;
//     localStorage.setItem("selectedTheme", party);
//     hideAllPanels();
//     showPanel("character-menu");
//     loadShopCharacters();
//   };

//   window.openShop = function() {
//     hideAllPanels();
//     showPanel("character-menu");
//     loadShopCharacters();
//   };

//   function loadShopCharacters() {
//     const charList = document.getElementById("character-list");
//     if (!charList) return;
//     charList.innerHTML = "";
//     const selectedImg = document.getElementById("selected-character-image");

//     Object.keys(allCharacters).forEach(char => {
//       const box = document.createElement("div");
//       box.className = "char-card";
//       box.style.display = "inline-block";
//       box.style.width = "100px";
//       box.style.margin = "5px";
//       box.style.textAlign = "center";
//       box.style.border = selectedCharacter === char ? "3px solid orange" : "2px solid #aaa";
//       box.style.borderRadius = "10px";
//       box.style.padding = "5px";
//       box.style.background = allCharacters[char].unlocked ? "#e0f7fa" : "#fce4ec";
//       box.style.cursor = "pointer";

//       const img = document.createElement("img");
//       img.src = birdImgs[char].src;
//       img.width = 60; img.height = 60;
//       img.style.borderRadius = "8px";

//       const name = document.createElement("div");
//       name.innerText = char;

//       const status = document.createElement("div");
//       status.style.fontSize = "12px";

//       if(allCharacters[char].unlocked){
//         status.innerText = "Unlocked";
//         box.onclick = ()=> { selectCharacter(char); loadShopCharacters(); };
//       } else {
//         status.innerText = `${allCharacters[char].price} coins`;
//         box.onclick = ()=>{
//           if(coins >= allCharacters[char].price){
//             coins -= allCharacters[char].price;
//             localStorage.setItem("coins", coins);
//             allCharacters[char].unlocked = true;
//             localStorage.setItem("char_"+char, "true");
//             selectCharacter(char);
//             loadShopCharacters();
//           } else alert("Not enough coins!");
//         };
//       }

//       box.appendChild(img);
//       box.appendChild(name);
//       box.appendChild(status);
//       charList.appendChild(box);
//     });

//     addStartButton();
//     if(selectedImg) selectedImg.src = birdImgs[selectedCharacter].src;
//   }

//   function addStartButton(){
//     const menu = document.getElementById("character-menu");
//     if(!menu) return;
//     let btn = document.getElementById("start-game-btn");
//     if(btn) btn.remove();

//     btn = document.createElement("button");
//     btn.id = "start-game-btn";
//     btn.innerText = "Start Game";
//     btn.style.display = "block";
//     btn.style.marginTop = "10px";
//     btn.onclick = ()=> { hideAllPanels(); startGame(); };
//     menu.appendChild(btn);
//   }

//   window.selectCharacter = function(char){
//     selectedCharacter = char;
//     localStorage.setItem("selectedCharacter", char);
//   }

//   /* =========================
//        GAME VARIABLES
//   ========================== */
//   let bird, pipes, coinsArr, frame, score, earned, speed, active, anim;

//   function init() {
//     bird = { x: 80, y: 300, v: 0 };
//     pipes = [];
//     coinsArr = [];
//     frame = 0;
//     score = 0;
//     earned = 0;
//     speed = 3;
//     active = true;

//     document.getElementById("score-val").innerText = score;
//     document.getElementById("coin-val").innerText = coins;

//     canvas.style.display = "block";
//     function resizeCanvas() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// }
// window.addEventListener('resize', resizeCanvas);
// resizeCanvas();
//   }

//   /* =========================
//        CONTROLS (optimized)
//   ========================== */
//   function jump() {
//     if (!active) return;
//     bird.v = -8;
//   }

//   function setupControls(){
//     // keyboard
//     window.addEventListener("keydown", e => { if(e.code==="Space") jump(); });

//     // mouse click
//     canvas.addEventListener("mousedown", jump);

//     // touchstart (passive:false to prevent warning)
//     canvas.addEventListener("touchstart", e=>{
//       e.preventDefault();
//       jump();
//     }, { passive:false });
//   }

//   setupControls();

//   /* =========================
//        GAME LOOP
//   ========================== */
//   function spawnPipe() {
//     pipes.push({ x: 360, top: Math.random()*250+50, gap: 170, passed: false });
//   }

//   function spawnCoin() {
//     coinsArr.push({ x: 360, y: Math.random()*500+20, size: 18, collected: false });
//   }

//   function update() {
//     frame++;
//     bird.v += 0.4;
//     if(bird.v>8) bird.v=8;
//     bird.y += bird.v;

//     if(frame % 100 === 0) spawnPipe();
//     if(frame % 140 === 0) spawnCoin();

//     pipes.forEach(p => {
//       p.x -= speed;
//       if(!p.passed && p.x + 50 < bird.x){
//         p.passed = true;
//         score++;
//         document.getElementById("score-val").innerText = score;
//       }
//       if(bird.x + 25 > p.x && bird.x -25 < p.x + 50 && (bird.y < p.top || bird.y > p.top + p.gap)){
//         endGame();
//       }
//     });

//     coinsArr.forEach(c => {
//       c.x -= speed;
//       if(!c.collected && bird.x+20>c.x && bird.x-20<c.x+c.size &&
//          bird.y+20>c.y && bird.y-20<c.y+c.size){
//         c.collected=true;
//         coins++;
//         earned++;
//         document.getElementById("coin-val").innerText = coins;
//       }
//     });

//     pipes = pipes.filter(p => p.x > -50);
//     coinsArr = coinsArr.filter(c => !c.collected && c.x > -20);

//     if(bird.y>canvas.height || bird.y<0) endGame();
//   }

//   function draw() {
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     ctx.drawImage(bgImgs[selectedParty],0,0,canvas.width,canvas.height);

//     let pipeColor="#555";
//     if(selectedParty==="RSP") pipeColor="#4da6ff";
//     if(selectedParty==="Congress") pipeColor="green";
//     if(selectedParty==="CPN") pipeColor="red";

//     ctx.fillStyle = pipeColor;
//     pipes.forEach(p=>{
//       ctx.fillRect(p.x,0,50,p.top);
//       ctx.fillRect(p.x,p.top+p.gap,50,canvas.height-(p.top+p.gap));
//     });

//     ctx.fillStyle = "gold";
//     coinsArr.forEach(c=>{
//       ctx.beginPath();
//       ctx.arc(c.x+c.size/2,c.y+c.size/2,c.size/2,0,Math.PI*2);
//       ctx.fill();
//     });

//     ctx.save();
//     ctx.translate(bird.x,bird.y);
//     let angle = Math.min(Math.max(bird.v*0.05,-0.5),0.5);
//     ctx.rotate(angle);
//     ctx.drawImage(birdImgs[selectedCharacter],-25,-25,50,50);
//     ctx.restore();
//   }

//   function loop() {
//     if(!active) return;
//     update();
//     draw();
//     anim = requestAnimationFrame(loop);
//   }

//   /* =========================
//        START / END GAME
//   ========================== */
//   function startGame() {
//     init();
//     loop();
//   }

//   function endGame() {
//     active=false;
//     cancelAnimationFrame(anim);

//     leaderboard[selectedCharacter] = Math.max(leaderboard[selectedCharacter]||0, score);
//     localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
//     localStorage.setItem("coins", coins);

//     document.getElementById("final-score").innerText = `Score: ${score} | Coins Earned: ${earned}`;

//     hideAllPanels();
//     showPanel("game-over");
//     canvas.style.display="none";
//   }

//   window.startActualGame = startGame;

//   /* =========================
//        INITIAL LOAD
//   ========================== */
//   goHome();
// });