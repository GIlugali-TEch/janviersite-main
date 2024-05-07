document.addEventListener("DOMContentLoaded", () => {
  // alert('hey')

  const allBtns = document.querySelectorAll(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");
  const closeBtn = document.getElementById("searchClose");

  allBtns.forEach((e) => {
    e.addEventListener("click", () => {
      searchBar.style.visibility = "visible";
      searchBar.classList.add("open");
      this.setAttribute("aria-expanded", "true");
      searchInput.focus();
    });
  });

  closeBtn.addEventListener("click", () => {
    searchBar.style.visibility = "hidden";
    searchBar.classList.remove(open);
    this.setAttribute("aria-expanded", "false");
  });
});

function readmore(){
    const readmore = document.querySelector(".read-more-btn");
let isReadMore = null;
// console.log(isReadMore);

readmore.addEventListener("click", () => {
  if (isReadMore === null) {
    isReadMore = true;
    document.querySelector('.readmore-text').style.display = "block"
    readmore.innerText = "Read Less..."
    return console.log("Read less");
  } else {
    document.querySelector('.readmore-text').style.display = "none"
    readmore.innerText = "Read More..."
    isReadMore = null;
    return console.log("Read More");
  }
});

}
readmore()


function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
