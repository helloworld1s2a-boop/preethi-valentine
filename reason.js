// reasons.js - make sure this file is in the same folder as reasons.html

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".heart-card");

  cards.forEach(function (card) {
    // Flip on click / tap
    card.addEventListener("click", function () {
      card.classList.toggle("flipped");
    });

    // Optional: flip on hover (desktop)
    card.addEventListener("mouseenter", function () {
      card.classList.add("flipped");
    });

    card.addEventListener("mouseleave", function () {
      card.classList.remove("flipped");
    });
  });
});

