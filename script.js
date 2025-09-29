document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // floating hearts
  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerHTML = "💜";
    heart.classList.add("floating-heart");

    const size = 1 + Math.random() * 0.8;
    heart.style.fontSize = `${size}rem`;

    heart.style.left = Math.random() * 90 + "vw";
    heart.style.top = window.innerHeight + "px";

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

  // typing words
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

  // flipbook
  const pages = document.querySelectorAll(".page");
  let current = 0;
  const flipbook = document.querySelector(".flipbook");
  flipbook.addEventListener("click", () => {
    pages[current].classList.remove("active");
    current = (current + 1) % pages.length;
    pages[current].classList.add("active");
  });

  // carousel
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  let currentIndex = 0;
  let autoSlide = setInterval(nextSlide, 5000);

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
  }

  function updateSlide() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // swipe detection
  let startX = 0;
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlide);
  });
  track.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      nextSlide();
    } else if (endX - startX > 50) {
      prevSlide();
    }
    autoSlide = setInterval(nextSlide, 5000);
  });
});
