const menu = document.querySelector("#menu");
const nav = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const loader = document.querySelector("#loader");
const body = document.querySelector("body");
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

menu.addEventListener("click", function () {
   menu.classList.toggle("show");
   nav.classList.toggle("show");
   body.classList.toggle("overflow-hidden");
});

for (let i = 0; i < navLinks.length; i++) {
   navLinks[i].addEventListener("click", function () {
      menu.classList.toggle("show");
      nav.classList.toggle("show");
      if (window.innerWidth < 992) {
         body.classList.toggle("overflow-hidden");
      }
   });
}

function init() {
   setTimeout(() => {
      loader.classList.add("fade");
      setTimeout(() => {
         loader.style.display = "none";
         body.classList.toggle("overflow-hidden");
      }, 500);
   }, 1000);
}

init();

// When the user clicks on the button, open the modal
btn.onclick = function () {
   modal.style.display = "block";
   body.classList.toggle("overflow-hidden");
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
   modal.style.display = "none";
   body.classList.toggle("overflow-hidden");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
   if (event.target == modal) {
      modal.style.display = "none";
      body.classList.toggle("overflow-hidden");
   }
};
