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
  const flipbook = document.querySelector(".flipbook");
  const currentPageSpan = document.getElementById("current-page");
  const totalPageSpan = document.getElementById("total-pages");

  let current = 0;
  const totalPages = pages.length

  if (totalPageSpan) {
    totalPageSpan.textContent = totalPages
  }

  function updatePage(newPage) {
    pages[current].classList.remove("active");
    current = newPage;
    pages[current].classList.add("active");

    if (currentPageSpan) {
      currentPageSpan.textContent = current + 1;
    }
  }

  flipbook.addEventListener("click", (e) => {
    const rect = flipbook.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = flipbook.clientWidth / 2;

    if (clickX < halfWidth) {
      let prevPage = (current - 1 + totalPages) % totalPages;
      updatePage(prevPage);
    } else {
      let nextPage = (current + 1) % totalPages;
      updatePage(nextPage);
    }
  });

const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
let currentIndex = 0;
let autoSlide = setInterval(nextSlide, 5000);

function nextSlide() {
  slides[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add("active");
}

function prevSlide() {
  slides[currentIndex].classList.remove("active");
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  slides[currentIndex].classList.add("active");
}

// init first slide
slides[0].classList.add("active");

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
