window.selectedCharacter = null;

let chars = {
  "Balen": 0,
  "Oli": 100,
  "Sher": 150,
  "Prachanda": 200
};

function openShop() {
  hideAll();
  const shopEl = document.getElementById("shop");
  if(!shopEl) return console.warn("Shop element missing");
  shopEl.classList.remove("hidden");

  const coinEl = document.getElementById("coin-val-shop");
  if(coinEl) coinEl.innerText = "Coins: " + (window.getCoins ? window.getCoins() : 0);

  let html = "";
  for (let c in chars) {
    if (unlocked.includes(c)) {
      html += `
        <div class="shop-char">
          <img src="assets/${c.toLowerCase()}.png" alt="${c}" width="80" height="80"/>
          <button onclick="selectChar('${c}')">${c} (Unlocked)</button>
        </div>
      `;
    } else {
      html += `
        <div class="shop-char">
          <img src="assets/${c.toLowerCase()}.png" alt="${c}" width="80" height="80"/>
          <button onclick="unlockChar('${c}')">Unlock ${c} (${chars[c]} Coins)</button>
          <button onclick="rewardAd('${c}')">Watch Ad</button>
        </div>
      `;
    }
  }

  const charList = document.getElementById("character-list");
  if(charList) charList.innerHTML = html;
}

function unlockChar(c) {
  if (coins >= chars[c]) {
    coins -= chars[c];
    unlocked.push(c);
    saveData();
    openShop();
  } else alert("Not enough Coins");
}

function selectChar(c) {
  selectedCharacter = c;
  alert(c + " Selected!");
}

function goTheme() {
  if (!selectedCharacter) {
    alert("Select a Character First");
    return;
  }
  hideAll();
  document.getElementById("theme").classList.remove("hidden");
}
function resetGame() {
  localStorage.removeItem("unlocked");
  localStorage.removeItem("coins");
  localStorage.removeItem("selectedCharacter");
  localStorage.removeItem("selectedTheme");
  alert("Game has been reset!");
  location.reload();
}
window.resetGame = resetGame;


window.openShop = openShop;
window.unlockChar = unlockChar;
window.selectChar = selectChar;
window.goTheme = goTheme;
