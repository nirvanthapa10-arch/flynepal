// // /* ================================
// //    PARTY & CHARACTER SYSTEM
// // ================================ */

// // let selectedParty = null;
// // let selectedCharacter = null;

// // let partyLeaderboard = {
// //     "leadersworld":0,
// //     "RSP":0,
// //     "Congress":0,
// //     "CPN":0
// // };

// // /* ================================
// //    CHOOSE PARTY
// // ================================ */

// // function chooseParty(party){

// //     selectedParty = party;

// //     // Hide Party Menu
// //     document.getElementById("party-menu").classList.add("hidden");

// //     // Load Characters of Selected Party
// //     loadCharacters(party);

// //     // Open Character Selection Menu
// //     document.getElementById("character-menu").classList.remove("hidden");
// // }

// // /* ================================
// //    LOAD CHARACTERS BASED ON PARTY
// // ================================ */

// // function loadCharacters(party){

// //     let characterList = document.getElementById("character-list");
// //     characterList.innerHTML = "";

// //     let characters = {
// //         leadersworld:["Balen"],
// //         RSP:["Balen"],
// //         Congress:["Sher"],
// //         CPN:["Oli"]
// //     };

// //     characters[party].forEach(char => {

// //         let btn = document.createElement("button");
// //         btn.innerText = char;

// //         btn.onclick = function(){
// //             selectCharacter(char);
// //         };

// //         characterList.appendChild(btn);

// //     });

// // }

// // /* ================================
// //    SELECT CHARACTER
// // ================================ */

// // function selectCharacter(char){

// //     selectedCharacter = char;
// //     alert(char + " Selected Successfully!");

// // }

// // /* ================================
// //    START GAME CHECK
// // ================================ */

// // function startGame(){

// //     if(selectedParty === null){
// //         alert("Select Party First!");
// //         return;
// //     }

// //     if(selectedCharacter === null){
// //         alert("Select Character First!");
// //         return;
// //     }

// //     // Hide Character Menu
// //     document.getElementById("character-menu").classList.add("hidden");

// //     // Start Actual Game
// //     window.startActualGame();

// // }

// // /* ================================
// //    EXPORT GLOBAL
// // ================================ */

// // window.chooseParty = chooseParty;
// // window.startGame = startGame;
// document.addEventListener("DOMContentLoaded", function () {

//   // ----------------------------
//   // GLOBAL VARIABLES
//   // ----------------------------
//   const canvas = document.getElementById("gameCanvas");
//   const ctx = canvas.getContext("2d");
//   canvas.width = 360;
//   canvas.height = 600;

//   let selectedParty = localStorage.getItem("selectedTheme") || null;
//   let selectedCharacter = localStorage.getItem("selectedCharacter") || null;
//   let coins = parseInt(localStorage.getItem("coins")) || 0;

//   let bird, pipes, coinsArr, frame, score, coinsSpeed, gameActive, anim;

//   // Preload images
//   const birdImgs = {};
//   ["Balen", "Oli", "Sher", "Prachanda"].forEach(name => {
//       const img = new Image();
//       img.src = `assets/${name.toLowerCase()}.png`;
//       birdImgs[name] = img;
//   });

//   const bgImgs = {};
//   ["leadersworld", "RSP", "Congress", "CPN"].forEach(theme => {
//       const img = new Image();
//       img.src = `assets/${theme.toLowerCase()}-bg.png`.replace("-bg-bg", "-bg"); // fallback
//       bgImgs[theme] = img;
//   });

//   const partyCharacters = {
//     "leadersworld": ["Balen"],
//     "RSP": ["Balen"],
//     "Congress": ["Sher"],
//     "CPN": ["Oli"]
//   };

//   // ----------------------------
//   // UI HELPERS
//   // ----------------------------
//   function hideAllPanels() {
//       ["party-menu", "character-menu", "game-over"].forEach(id => {
//           document.getElementById(id).classList.add("hidden");
//       });
//   }

//   function showMessage(msgText) {
//       const msg = document.getElementById("selection-msg");
//       if(msg){
//           msg.innerText = msgText;
//           msg.classList.add("show");
//           setTimeout(()=> msg.classList.remove("show"), 1000);
//       }
//   }

//   // ----------------------------
//   // PARTY SELECTION
//   // ----------------------------
//   window.chooseParty = function(party){
//       selectedParty = party;
//       localStorage.setItem("selectedTheme", party);

//       hideAllPanels();
//       document.getElementById("character-menu").classList.remove("hidden");

//       loadCharacters(party);

//       // Update background instantly
//       if(bgImgs[party]) {
//           document.body.style.backgroundImage = `url(${bgImgs[party].src})`;
//           document.body.style.backgroundSize = "cover";
//       }
//   }

//   // ----------------------------
//   // LOAD CHARACTERS
//   // ----------------------------
//   function loadCharacters(party){
//       const charList = document.getElementById("character-list");
//       charList.innerHTML = ""; // clear old buttons

//       partyCharacters[party].forEach(char => {
//           const btn = document.createElement("button");
//           btn.innerText = char;
//           btn.classList.add("party-btn");

//           if(char === selectedCharacter) btn.classList.add("selected");

//           btn.addEventListener("click", ()=>{
//               selectCharacter(char);

//               // highlight selected
//               charList.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));
//               btn.classList.add("selected");
//           });

//           charList.appendChild(btn);
//       });

//       // show selected character image
//       const img = document.getElementById("selected-character-image");
//       if(selectedCharacter) img.src = birdImgs[selectedCharacter].src;
//   }

//   // ----------------------------
//   // CHARACTER SELECTION
//   // ----------------------------
//   window.selectCharacter = function(char){
//       selectedCharacter = char;
//       localStorage.setItem("selectedCharacter", char);

//       const img = document.getElementById("selected-character-image");
//       img.src = birdImgs[char].src;

//       showMessage(`${char} Selected!`);
//   }

//   // ----------------------------
//   // GAME INITIALIZATION
//   // ----------------------------
//   function initGame() {
//       bird = {x:90, y:300, v:0};
//       pipes = [];
//       coinsArr = [];
//       frame = 0;
//       score = 0;
//       coinsSpeed = 3;
//       gameActive = true;

//       document.getElementById("score-val").innerText = score;
//       document.getElementById("coin-val").innerText = coins;
//   }

//   // ----------------------------
//   // GAME CONTROLS
//   // ----------------------------
//   function jump() { if(gameActive) bird.v = -8; }
//   window.addEventListener("keydown", e => { if(e.code==="Space") jump(); });
//   canvas.addEventListener("mousedown", jump);

//   // ----------------------------
//   // GAME LOOP
//   // ----------------------------
//   function spawnCoin() {
//       let y = Math.random() * (canvas.height - 100) + 50;
//       coinsArr.push({x:360, y:y, size:20, collected:false});
//   }

//   function update() {
//       if(!gameActive) return;
//       frame++;
//       bird.v += 0.5;
//       bird.y += bird.v;

//       if(frame % 100 === 0){
//           let top = Math.random() * 300 + 50;
//           pipes.push({x:360, top:top, gap:170, passed:false});
//       }

//       if(frame % 150 === 0) spawnCoin();

//       pipes.forEach(p=>{
//           p.x -= coinsSpeed;
//           if(bird.x+28>p.x && bird.x-28<p.x+50){
//               if(bird.y < p.top || bird.y > p.top+p.gap) endGame();
//           }
//           if(!p.passed && p.x+50 < bird.x){
//               p.passed = true;
//               score++;
//               document.getElementById("score-val").innerText = score;
//               if(score % 5 === 0) coinsSpeed += 0.2;
//           }
//       });

//       coinsArr.forEach(c=>{
//           c.x -= coinsSpeed;
//           if(!c.collected &&
//              bird.x+28>c.x && bird.x-28<c.x+c.size &&
//              bird.y+28>c.y && bird.y-28<c.y+c.size){
//               c.collected = true;
//               coins++;
//               document.getElementById("coin-val").innerText = coins;
//           }
//       });

//       pipes = pipes.filter(p=>p.x+50>0);
//       coinsArr = coinsArr.filter(c=>c.x+c.size>0 && !c.collected);

//       if(bird.y>canvas.height || bird.y<0) endGame();
//   }

//   function draw() {
//       ctx.clearRect(0,0,canvas.width,canvas.height);

//       if(selectedParty) ctx.drawImage(bgImgs[selectedParty],0,0,canvas.width,canvas.height);

//       // Pipes
//       pipes.forEach(p=>{
//           ctx.fillStyle="#87CEEB";
//           ctx.fillRect(p.x,0,50,p.top);
//           ctx.fillRect(p.x,p.top+p.gap,50,canvas.height-(p.top+p.gap));
//       });

//       // Coins
//       coinsArr.forEach(c=>{
//           ctx.fillStyle="gold";
//           ctx.beginPath();
//           ctx.arc(c.x+c.size/2,c.y+c.size/2,c.size/2,0,Math.PI*2);
//           ctx.fill();
//       });

//       // Bird
//       ctx.save();
//       ctx.translate(bird.x,bird.y);
//       if(selectedCharacter) ctx.drawImage(birdImgs[selectedCharacter],-28,-28,56,56);
//       ctx.restore();
//   }

//   function loop() {
//       update();
//       draw();
//       anim = requestAnimationFrame(loop);
//   }

//   // ----------------------------
//   // START GAME
//   // ----------------------------
//   window.startGame = function(){
//       if(!selectedParty){ alert("Select Party!"); return; }
//       if(!selectedCharacter){ alert("Select Character!"); return; }

//       hideAllPanels();
//       startActualGame();
//   }

//   window.startActualGame = function(){
//       initGame();
//       loop();
//   }

//   // ----------------------------
//   // END GAME
//   // ----------------------------
//   function endGame(){
//       gameActive = false;
//       cancelAnimationFrame(anim);
//       localStorage.setItem("coins", coins);

//       document.getElementById("final-score").innerText = "Coins Earned: "+score;
//       document.getElementById("game-over").classList.remove("hidden");
//       document.getElementById("coin-val").innerText = coins;
//   }

// });