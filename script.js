document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "💜";
  heart.classList.add("floating-heart");

  const size = 1 + Math.random() * 0.8;
  heart.style.fontSize = `${size}rem`;

  heart.style.left = Math.random() * 90 + "vw";
  heart.style.top = window.innerHeight + "px"; // start just below viewport

  body.appendChild(heart);

  const floatDuration = 4000 + Math.random() * 2000;
  heart.animate(
    [
      { transform: "translateY(0)", opacity: 1 },
      { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
    ],
    {
      duration: floatDuration,
      easing: "linear",
      fill: "forwards"
    }
  );

  setTimeout(() => heart.remove(), floatDuration);
}, 800);


  const paragraphs = document.querySelectorAll(".page p");
  let wordDelay = 0;
  paragraphs.forEach(p => {
    const words = p.textContent.split(" ");
    p.textContent = "";
    words.forEach(word => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.classList.add("word");
      span.style.animationDelay = wordDelay + "s";
      wordDelay += 0.05;
      p.appendChild(span);
    });
  });

  const pages = document.querySelectorAll(".page");
  let current = 0;
  const flipbook = document.querySelector(".flipbook");
  flipbook.addEventListener("click", () => {
    pages[current].classList.remove("active");
    current = (current + 1) % pages.length;
    pages[current].classList.add("active");
  });

  const photoContainer = document.querySelector(".photo-container");
  const photo = document.querySelector(".hidden-photo");
  const placeholder = document.querySelector(".photo-placeholder");

  photoContainer.addEventListener("click", () => {
    placeholder.style.display = "none";
    photo.classList.add("show");
  });

  window.addEventListener('touchmove', function(e){
    e.preventDefault();
  }, { passive: false });
});
