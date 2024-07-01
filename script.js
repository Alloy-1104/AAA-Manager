const submit_button = document.getElementById("submit-button-label");
const pages = document.getElementsByClassName("page");

var page = "register";
var player_data = [{}, {}, {}, {}]
var current_game;
var games = ["roulette", "poker", "black_jack", "darts"];
var games_title = ["Roulette", "Poker", "Black Jack", "Darts"]
var game_index;

submit_button.addEventListener("click", () => {
  submit_button.classList.add("clicked");
  setTimeout(() => {
    // button style
    submit_button.classList.remove("clicked");
    // next page
    setTimeout(() => {
      get_player_data();
      set_player_name();
      page = "game";
      game_index = 0;
      set_game();
      set_page(page);
      console.log(player_data);
    }, 100)
  }, 100)
})

function get_player_data() {
  const player_name_input_elms = document.getElementsByClassName("name-input");
  for (let i = 0; i < 4; i++) {
    if (player_name_input_elms[i].value) {
      player_data[i].name = player_name_input_elms[i].value;
    } else {
      player_data[i].name = "プレイヤー" + (i + 1);
    }
  }
}

const game_label = document.getElementById("game-name");

function set_page(page_name) {
  for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    if (page.id == page_name) {
      page.style.display = "block";
    } else {
      page.style.display = "none";
    }
  }
}

const table_head_player_1 = document.getElementById("player-1-name");
const table_head_player_2 = document.getElementById("player-2-name");
const table_head_player_3 = document.getElementById("player-3-name");
const table_head_player_4 = document.getElementById("player-4-name");

function set_player_name() {
  table_head_player_1.innerHTML = player_data[0].name;
  table_head_player_2.innerHTML = player_data[1].name;
  table_head_player_3.innerHTML = player_data[2].name;
  table_head_player_4.innerHTML = player_data[3].name;
}

const player_1_checkbox_label = document.getElementById("player-1-checkbox-label");
const player_2_checkbox_label = document.getElementById("player-2-checkbox-label");
const player_3_checkbox_label = document.getElementById("player-3-checkbox-label");
const player_4_checkbox_label = document.getElementById("player-4-checkbox-label");

const player_1_checkbox = document.getElementById("player-1-checkbox");
const player_2_checkbox = document.getElementById("player-2-checkbox");
const player_3_checkbox = document.getElementById("player-3-checkbox");
const player_4_checkbox = document.getElementById("player-4-checkbox");

const result_table = document.getElementById("result-table");

result_table.addEventListener("click", sync_table_to_player_data);

function sync_table_to_player_data() {
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
}

function sync_player_data_to_table() {
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
}

const back_button_label = document.getElementById("back-button-label");

back_button_label.addEventListener("click", () => {

  back_button_label.classList.add("clicked");
  setTimeout(() => {
    back_button_label.classList.remove("clicked");
    if (game_index == 0) {
      page = "register";
      set_page(page);
    } else {
      game_index--;
      set_game();
    }
  }, 100);
});

const next_button_label = document.getElementById("next-button-label");

next_button_label.addEventListener("click", () => {

  next_button_label.classList.add("clicked");
  setTimeout(() => {
    next_button_label.classList.remove("clicked");
    if (game_index == 3) {
      //
    } else {
      game_index++;
      set_game();
    }
  }, 100);
});

function set_game() {
  current_game = games[game_index];
  game_label.innerHTML = games_title[game_index];
  sync_player_data_to_table();
  sync_table_to_player_data();
}