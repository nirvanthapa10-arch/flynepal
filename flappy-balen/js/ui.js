// function showLeaderboard(){
//     let list="";
//     leaderboard.forEach((c,i)=>{ list += `<div>${i+1}. ${c} coins</div>`; });
//     document.getElementById("leaderboard-list").innerHTML=list;
//     document.getElementById("leaderboard").classList.remove("hidden");
// }
// // function closeLeaderboard(){document.getElementById("leaderboard").classList.add("hidden");}
// // function openShop(){document.getElementById("shop").classList.remove("hidden");}
// // function closeShop(){document.getElementById("shop").classList.add("hidden");}
// function hideAllPanels(){
//  document.querySelectorAll(".panel").forEach(p=>{
//   p.classList.add("hidden");
//  });
// }

// function goHome(){
//  hideAllPanels();
//  document.getElementById("home").classList.remove("hidden");
// }

// function openPartyMenu(){
//  hideAllPanels();
//  document.getElementById("party-menu").classList.remove("hidden");
// }

// function openCharacterMenu(){
//  hideAllPanels();
//  document.getElementById("character-menu").classList.remove("hidden");
// }

// window.showLeaderboard = showLeaderboard;
// window.closeLeaderboard = closeLeaderboard;
// window.openShop = openShop;
// window.closeShop = closeShop;
function hideAll() {
  document.querySelectorAll(".panel").forEach(p => p.classList.add("hidden"));
}

function goHome() {
  hideAll();
  document.getElementById("home").classList.remove("hidden");
}

function startFlow() {
  showAd(() => {
    openShop();
  });
}

function showLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem("coinBoard")) || [];
  let html = "";
  leaderboard.forEach((c, i) => {
    html += `<div>${i+1}. ${c} coins</div>`;
  });
  document.getElementById("leaderboard-list").innerHTML = html;
  hideAll();
  document.getElementById("leaderboard").classList.remove("hidden");
}

window.hideAll = hideAll;
window.goHome = goHome;
window.startFlow = startFlow;
window.showLeaderboard = showLeaderboard;
