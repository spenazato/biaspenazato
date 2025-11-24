document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const audio = document.getElementById("background-music");
  if (audio) {
    audio.volume = 0.25; // 0.0 to 1.0 (0.25 = 25%)
  }

  // --- Floating Hearts ---
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

  // --- Typing Words ---
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

  // --- Flipbook ---
  const pages = document.querySelectorAll(".page");
  const flipbook = document.querySelector(".flipbook");
  const currentPageSpan = document.getElementById("current-page");
  const totalPageSpan = document.getElementById("total-pages");

  let current = 0;
  const totalPages = pages.length;

  if (totalPageSpan) {
    totalPageSpan.textContent = totalPages;
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

  // --- CAROUSEL LOGIC ---
  const wrappers = document.querySelectorAll(".polaroid-wrapper");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let photoIndex = 0;
  const totalPhotos = wrappers.length;

  function initCarousel() {
    updateCarouselClasses(true); 
  }

  function updateCarouselClasses(isFirstLoad = false) {
    wrappers.forEach((wrapper, index) => {
      wrapper.classList.remove("active", "prev", "next", "hidden", "animate-spin-in", "animate-float-in");
      
      const card = wrapper.querySelector('.polaroid-card');
      if (index !== photoIndex) {
          card.classList.remove("flipped");
      }

      if (index === photoIndex) {
        wrapper.classList.add("active");
        if (isFirstLoad) wrapper.classList.add("animate-spin-in");
      } 
      else if (index === (photoIndex - 1 + totalPhotos) % totalPhotos) {
        wrapper.classList.add("prev");
        if (isFirstLoad) wrapper.classList.add("animate-float-in");
      } 
      else if (index === (photoIndex + 1) % totalPhotos) {
        wrapper.classList.add("next");
        if (isFirstLoad) wrapper.classList.add("animate-float-in");
      } 
      else {
        wrapper.classList.add("hidden");
      }
    });
  }

  nextBtn.addEventListener("click", () => {
    photoIndex = (photoIndex + 1) % totalPhotos;
    updateCarouselClasses();
  });

  prevBtn.addEventListener("click", () => {
    photoIndex = (photoIndex - 1 + totalPhotos) % totalPhotos;
    updateCarouselClasses();
  });

  wrappers.forEach(wrapper => {
    wrapper.addEventListener("click", () => {
      if (wrapper.classList.contains("active")) {
        const card = wrapper.querySelector(".polaroid-card");
        card.classList.toggle("flipped");
      } else {
        if (wrapper.classList.contains("prev")) {
            prevBtn.click();
        } else if (wrapper.classList.contains("next")) {
            nextBtn.click();
        }
      }
    });
  });

  initCarousel();
});