var page_list = ["registration", "game_list", "game_scoring", "result"]
var page_index;

var game_list = ["poker", "black_jack", "darts", "roulette"];
var game_name = ["ポーカー", "ブラックジャック", "ダーツ", "ルーレット"]
var game_index;

var player_data;

// Footer button
const footer_button_elms = document.getElementById("footer-button");
const footer_button_list = footer_button_elms.children;
// Button action
const footer_register_button = document.getElementById("register-button");
const footer_slot_game_button = document.getElementById("slot-game-button");
const footer_back_to_list_button = document.getElementById("back-to-list-button");
const footer_go_to_ranking_button = document.getElementById("go-to-ranking-button");

// Initialize
document.addEventListener("DOMContentLoaded", init);

function init() {
  page_index = 0;
  player_data = [{},{},{},{},{}];
  set_page();
}

function set_page() {
  console.log("set page")
  const page_list_elm = document.getElementById("page-list");
  const page_elms = page_list_elm.children;
  for (let i = 0; i < page_elms.length; i++) {
    if (i == page_index) page_elms[i].style.display = "flex";
    else page_elms[i].style.display = "none";
  }
  // switch footer button
  for (let i = 0; i < footer_button_list.length; i++) {
    footer_button_list[i].style.display = "none";
  }
  switch (page_index) {
    case 0:
      footer_register_button.style.display = "block";
      break;
    case 1:
      footer_slot_game_button.style.display = "block";
      footer_go_to_ranking_button.style.display = "block";
      break;
    case 2:
      footer_back_to_list_button.style.display = "block";
      break;
    case 3:
      reset_button_button.style.display = "block";
      break;
  }
}

function set_game() {
  console.log("set game")
  const game_title_elm = document.getElementById("game-title");
  game_title_elm.innerHTML = game_name[game_index];
}

// Register
footer_register_button.addEventListener("click", () => {
  page_index = 1;
  set_page();
});

// Game
const poker_selection_button = document.getElementById("poker-selection");
const black_jack_selection_button = document.getElementById("black-jack-selection");
const darts_selection_button = document.getElementById("darts-selection");
const roulette_selection_button = document.getElementById("roulette-selection");
const reset_button_button = document.getElementById("reset-button");

const game_list_selection_list = [poker_selection_button, black_jack_selection_button, darts_selection_button, roulette_selection_button];

game_list_selection_list.forEach(selection_button => {
  selection_button.addEventListener("click", () => {
    let game_value = selection_button.getAttribute("value");
    game_index = game_value;
    page_index = 2;
    set_page();
    set_game();
  })
});

footer_back_to_list_button.addEventListener("click", () => {
  page_index = 1;
  set_page()
});

// Go to Ranking
footer_go_to_ranking_button.addEventListener("click", () => {
  page_index = 3;
  set_page();
});