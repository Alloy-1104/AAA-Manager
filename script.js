const submit_button = document.getElementById("submit-button-label");
const pages = document.getElementsByClassName("page");

var page = "register"

submit_button.addEventListener("click", () => {
  submit_button.classList.add("clicked");
  setTimeout(() => {
    submit_button.classList.remove("clicked");
    page = "game";
    setTimeout(() => {set_page(game);}, 100)
    
  }, 100)
})

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


