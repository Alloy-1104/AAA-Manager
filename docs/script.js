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
const footer_score_submit_button = document.getElementById("score-submit-button");

// Initialize
document.addEventListener("DOMContentLoaded", init);

function init() {
  page_index = 0;
  player_data = [{ score: 160 }, { score: 160 }, { score: 160 }, { score: 160 }, { score: 160 }];
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
      footer_score_submit_button.style.display = "block";
      break;
    case 3:
      reset_button_button.style.display = "block";
      break;
  }
  // set player name
  const player_1_input_elm = document.getElementById("player-1-input");
  const player_2_input_elm = document.getElementById("player-2-input");
  const player_3_input_elm = document.getElementById("player-3-input");
  const player_4_input_elm = document.getElementById("player-4-input");
  const player_5_input_elm = document.getElementById("player-5-input");
  if (player_1_input_elm.innerHTML) player_data[0].name = player_1_input_elm.innerHTML;
  else player_data[0].name = "プレイヤー1";
  if (player_2_input_elm.innerHTML) player_data[1].name = player_2_input_elm.innerHTML;
  else player_data[1].name = "プレイヤー2";
  if (player_3_input_elm.innerHTML) player_data[2].name = player_3_input_elm.innerHTML;
  else player_data[2].name = "プレイヤー3";
  if (player_4_input_elm.innerHTML) player_data[3].name = player_4_input_elm.innerHTML;
  else player_data[3].name = "プレイヤー4";
  if (player_5_input_elm.innerHTML) player_data[4].name = player_5_input_elm.innerHTML;
  else player_data[4].name = "プレイヤー5";

  // sync data
  if (page_index == 2 || page_index == 3) {
    sync_player_data_to_table()
  }
}

function set_game() {
  console.log("set game")
  const game_title_elm = document.getElementById("game-title");
  game_title_elm.innerHTML = game_name[game_index];
  sync_score_ranking()
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
    sync_table_to_player_data();
  })
});

footer_back_to_list_button.addEventListener("click", () => {
  page_index = 1;
  set_page()
});

// Go to Ranking
var long_tap;
var undone = false
footer_go_to_ranking_button.addEventListener("pointerdown", () => {
  const ranking_interval_id = setTimeout(() => {
    if (done_count == 4) {
      page_index = 3;
      set_page();
      submit_score();
    } else {
      alert("まだすべてのゲームが終わっていません。");
      undone = true;
    }
  }, 1000)

  const ranking_up_interval_id = document.addEventListener("pointerup", () => {
    clearInterval(ranking_interval_id);
    if (page_index != 3 && !undone) {
      alert("長押しでランキングへ移ります。")
    }
  }, { once: true });
  //if (undone) clearInterval(ranking_up_interval_id);

});

// Restart
reset_button_button.addEventListener("click", () => {
  location.reload();
});

const poker_selection_elm = document.getElementById("poker-selection");
const black_jack_selection_elm = document.getElementById("black-jack-selection");
const darts_selection_elm = document.getElementById("darts-selection");
const roulette_selection_elm = document.getElementById("roulette-selection");

var done_count = 0;

function submit_score() {
  if (game_index == 0) {
    player_1_checkbox.style.pointerEvents = "none";
    poker_selection_elm.classList.add("done");
  }
  if (game_index == 1) {
    player_2_checkbox.style.pointerEvents = "none";
    black_jack_selection_elm.classList.add("done");
  }
  if (game_index == 2) {
    player_3_checkbox.style.pointerEvents = "none";
    darts_selection_elm.classList.add("done");
  }
  if (game_index == 3) {
    player_4_checkbox.style.pointerEvents = "none";
    roulette_selection_elm.classList.add("done");
  }
  done_count++;
  if (done_count == 4) {
    document.getElementById("done-note").style.display = "block";
  }
}


// Submit score
var long_tap;
footer_score_submit_button.addEventListener("pointerdown", () => {
  const submit_interval_id = setTimeout(() => {
    page_index = 1;
    set_page();
    submit_score();
  }, 1000)
  document.addEventListener("pointerup", () => {
    clearInterval(submit_interval_id);
    if (page_index != 1) {
      alert("長押しで得点を確定させます。")
    }
  }, { once: true });
});

function sync_player_data_to_table() {
  const ranking_table_elm = document.getElementById("ranking-table");
  console.log(ranking_table_elm);
  ranking_table_elm.children[0].children[1].innerHTML = player_data[0].name;
  ranking_table_elm.children[1].children[1].innerHTML = player_data[1].name;
  ranking_table_elm.children[2].children[1].innerHTML = player_data[2].name;
  ranking_table_elm.children[3].children[1].innerHTML = player_data[3].name;
  ranking_table_elm.children[4].children[1].innerHTML = player_data[4].name;

  ranking_table_elm.children[0].children[2].innerHTML = player_data[0].score;
  ranking_table_elm.children[1].children[2].innerHTML = player_data[1].score;
  ranking_table_elm.children[2].children[2].innerHTML = player_data[2].score;
  ranking_table_elm.children[3].children[2].innerHTML = player_data[3].score;
  ranking_table_elm.children[4].children[2].innerHTML = player_data[4].score;

  const ranking_preview_table_elm = document.getElementById("ranking-preview-table");
  ranking_preview_table_elm.children[0].children[1].innerHTML = player_data[0].name;
  ranking_preview_table_elm.children[1].children[1].innerHTML = player_data[1].name;
  ranking_preview_table_elm.children[2].children[1].innerHTML = player_data[2].name;
  ranking_preview_table_elm.children[3].children[1].innerHTML = player_data[3].name;
  ranking_preview_table_elm.children[4].children[1].innerHTML = player_data[4].name;

  ranking_preview_table_elm.children[0].children[2].innerHTML = player_data[0].score;
  ranking_preview_table_elm.children[1].children[2].innerHTML = player_data[1].score;
  ranking_preview_table_elm.children[2].children[2].innerHTML = player_data[2].score;
  ranking_preview_table_elm.children[3].children[2].innerHTML = player_data[3].score;
  ranking_preview_table_elm.children[4].children[2].innerHTML = player_data[4].score;

  const player_1_name_input_elm = document.getElementById("player-1-name");
  const player_2_name_input_elm = document.getElementById("player-2-name");
  const player_3_name_input_elm = document.getElementById("player-3-name");
  const player_4_name_input_elm = document.getElementById("player-4-name");
  const player_5_name_input_elm = document.getElementById("player-5-name");
  player_1_name_input_elm.innerHTML = player_data[0].name;
  player_2_name_input_elm.innerHTML = player_data[1].name;
  player_3_name_input_elm.innerHTML = player_data[2].name;
  player_4_name_input_elm.innerHTML = player_data[3].name;
  player_5_name_input_elm.innerHTML = player_data[4].name;
  let current_game = game_list[game_index];
  if (player_data[0][current_game]) {
    player_1_checkbox.checked = player_data[0][current_game];
  } else {
    player_1_checkbox.checked = false;
  }
  if (player_data[1][current_game]) {
    player_2_checkbox.checked = player_data[1][current_game];
  } else {
    player_2_checkbox.checked = false;
  }
  if (player_data[2][current_game]) {
    player_3_checkbox.checked = player_data[2][current_game];
  } else {
    player_3_checkbox.checked = false;
  }
  if (player_data[3][current_game]) {
    player_4_checkbox.checked = player_data[3][current_game];
  } else {
    player_4_checkbox.checked = false;
  }
  if (player_data[4][current_game]) {
    player_5_checkbox.checked = player_data[4][current_game];
  } else {
    player_5_checkbox.checked = false;
  }
}

const player_1_checkbox_label = document.getElementById("player-1-checkbox-label");
const player_2_checkbox_label = document.getElementById("player-2-checkbox-label");
const player_3_checkbox_label = document.getElementById("player-3-checkbox-label");
const player_4_checkbox_label = document.getElementById("player-4-checkbox-label");
const player_5_checkbox_label = document.getElementById("player-5-checkbox-label");

const player_1_checkbox = document.getElementById("player-1-checkbox");
const player_2_checkbox = document.getElementById("player-2-checkbox");
const player_3_checkbox = document.getElementById("player-3-checkbox");
const player_4_checkbox = document.getElementById("player-4-checkbox");
const player_5_checkbox = document.getElementById("player-5-checkbox");

const result_table = document.getElementById("scoring-form");

result_table.addEventListener("click", () => {
  sync_table_to_player_data();
  sync_score_ranking()
});

function sync_table_to_player_data() {
  let current_game = game_list[game_index];
  if (player_1_checkbox.checked) {
    player_1_checkbox_label.innerHTML = "Win";
    player_data[0][current_game] = true;
  } else {
    player_1_checkbox_label.innerHTML = "Lose";
    player_data[0][current_game] = false;
  }
  if (player_2_checkbox.checked) {
    player_2_checkbox_label.innerHTML = "Win";
    player_data[1][current_game] = true;
  } else {
    player_2_checkbox_label.innerHTML = "Lose";
    player_data[1][current_game] = false;
  }
  if (player_3_checkbox.checked) {
    player_3_checkbox_label.innerHTML = "Win";
    player_data[2][current_game] = true;
  } else {
    player_3_checkbox_label.innerHTML = "Lose";
    player_data[2][current_game] = false;
  }
  if (player_4_checkbox.checked) {
    player_4_checkbox_label.innerHTML = "Win";
    player_data[3][current_game] = true;
  } else {
    player_4_checkbox_label.innerHTML = "Lose";
    player_data[3][current_game] = false;
  }
  if (player_5_checkbox.checked) {
    player_5_checkbox_label.innerHTML = "Win";
    player_data[4][current_game] = true;
  } else {
    player_5_checkbox_label.innerHTML = "Lose";
    player_data[4][current_game] = false;
  }
}

function calc_score(data) {
  const multiplier = 1.5;
  const base = 160;
  const bonus = [23, 43, 47, 83]
  let score = base;
  if (data.roulette) {
    score += bonus[0];
    score *= multiplier;
  }
  if (data.poker) {
    score += bonus[1];
    score *= multiplier;
  }
  if (data.black_jack) {
    score += bonus[2];
    score *= multiplier;
  }
  if (data.darts) {
    score += bonus[3];
    score *= multiplier;
  }
  if (1000 <= score) {
    return 1000;
  } else {
    return Math.floor(score);
  }
}

const ranking_table = document.getElementById("ranking-preview-table");
const ranking_rows = ranking_table.children;

function sync_score_ranking() {
  let scores = [];
  player_data.forEach((data) => {
    data.score = calc_score(data);
    scores[scores.length] = data.score;
  })
  let temp_player_data = JSON.parse(JSON.stringify(player_data));
  temp_player_data.sort((a, b) => {
    return b.score - a.score;
  });
  for (let i = 0; i < 5; i++) {
    ranking_rows[i].children[1].innerHTML = temp_player_data[i].name;
    ranking_rows[i].children[2].innerHTML = temp_player_data[i].score;
  }
}