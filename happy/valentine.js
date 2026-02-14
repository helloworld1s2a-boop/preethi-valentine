document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const flowerContainer = document.getElementById("flowerContainer");
  const finalLetter = document.getElementById("finalLetter");
  const bgMusic = document.getElementById("bgMusic");

  let yesClicked = false;

  // ==========================
  // NO BUTTON: playful runaway
  // ==========================
  function moveNoButton() {
    if (yesClicked) return;

    // Big random jump but still around the original spot
    const offsetX = (Math.random() * 400) - 200;  // -200..+200
    const offsetY = (Math.random() * 160) - 80;   // -80..+80

    noBtn.style.transition = "transform 0.25s ease";
    noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }

  // Keep moving whenever cursor goes near or tries to click
  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("mousemove", moveNoButton);
  noBtn.addEventListener("click", e => {
    e.preventDefault(); // never allow NO to be clicked
    moveNoButton();
  });

  // ==========================
  // YES BUTTON: enlarge + flowers + letter + music
  // ==========================
  yesBtn.addEventListener("click", () => {
    if (yesClicked) return;
    yesClicked = true;

    // Enlarge YES dramatically (like a burst)
    yesBtn.style.transition =
      "transform 0.6s ease-out, box-shadow 0.6s ease-out, background 0.6s ease-out, opacity 0.6s ease-out";
    yesBtn.style.transform = "scale(2.1)";
    yesBtn.style.boxShadow = "0 30px 70px rgba(231, 92, 136, 0.8)";
    yesBtn.style.background = "linear-gradient(135deg, #ffcee0, #ff4f8a)";

    // Hide NO permanently once she chooses YES
    noBtn.style.opacity = "0";
    noBtn.style.pointerEvents = "none";

    // Sprinkle a lot of "flowers" (petals) from the YES button
    burstPetalsFromYes(yesBtn, 80);

    // Softly fade YES so focus goes to the letter
    setTimeout(() => {
      yesBtn.style.opacity = "0.3";
    }, 400);

    // Show the final love letter with a slow fade
    setTimeout(() => {
      finalLetter.classList.remove("hidden");
      finalLetter.classList.add("fade-in-slow");
      finalLetter.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);

    // Background music starts only after YES
    if (bgMusic) {
      bgMusic.volume = 0.6;
      bgMusic.play().catch(() => {
        // ignore autoplay errors
      });
    }
  });

  // ==========================
  // Flower / petal burst from YES
  // ==========================
  function burstPetalsFromYes(button, count) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 + window.scrollX;
    const centerY = rect.top + rect.height / 2 + window.scrollY;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petals");
      petal.style.position = "absolute";
      petal.style.left = centerX + "px";
      petal.style.top = centerY + "px";
      petal.style.opacity = "1";

      document.body.appendChild(petal);

      // random direction and distance
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 140;
      const targetX = centerX + Math.cos(angle) * distance;
      const targetY = centerY + Math.sin(angle) * distance;

      const duration = 1000 + Math.random() * 700;
      petal.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
      petal.style.transform = "translate(0, 0)";

      requestAnimationFrame(() => {
        petal.style.transform = `translate(${targetX - centerX}px, ${targetY - centerY}px)`;
        petal.style.opacity = "0";
      });

      setTimeout(() => petal.remove(), duration + 200);
    }
  }
});
