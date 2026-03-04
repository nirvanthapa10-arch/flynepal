function showAd(callback) {
  hideAll();
  let ad = document.createElement("div");
  ad.className = "panel";
  ad.innerHTML = `
    <h2>Advertisement</h2>
    <img src="assets/interstitial.png" width="200"><br>
    <button onclick="closeAd()">Skip</button>
  `;
  document.body.appendChild(ad);

  window.closeAd = function() {
    document.body.removeChild(ad);
    callback();
  }
}

function rewardAd(char) {
  hideAll();
  let ad = document.createElement("div");
  ad.className = "panel";
  ad.innerHTML = `
    <h2>Watch Ad to Unlock</h2>
    <img src="assets/reward-ad.png" width="200"><br>
    <button onclick="finishReward('${char}')">Watch</button>
  `;
  document.body.appendChild(ad);

  window.finishReward = function(c) {
    unlocked.push(c);
    saveData();
    document.body.removeChild(ad);
    openShop();
  }
}

window.showAd = showAd;
window.rewardAd = rewardAd;
