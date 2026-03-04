// let bestScore = parseInt(localStorage.getItem("best")) || 0;
// document.getElementById("best-val").innerText=bestScore;

// let leaderboard = JSON.parse(localStorage.getItem("coinBoard")) || [];

// function updateBest(score){
//     if(score>bestScore){ 
//         bestScore=score; 
//         localStorage.setItem("best",bestScore); 
//         document.getElementById("best-val").innerText=bestScore; 
//     }
// }

// function saveLeaderboard(){
//     localStorage.setItem("coinBoard", JSON.stringify(leaderboard));
// }
window.coins = parseInt(localStorage.getItem("coins")) || 0;
window.bestScore = parseInt(localStorage.getItem("best")) || 0;
window.unlocked = JSON.parse(localStorage.getItem("unlocked")) || ["Balen"];

window.saveData = function() {
  localStorage.setItem("coins", coins);
  localStorage.setItem("best", bestScore);
  localStorage.setItem("unlocked", JSON.stringify(unlocked));
}
