document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerHTML = "💜";
    heart.classList.add("floating-heart");
    heart.style.left = Math.random() * 100 + "vw";
    body.appendChild(heart);
    heart.addEventListener("click", () => {
      heart.style.transform = "scale(2)";
      heart.style.opacity = "0";
    });
    setTimeout(() => heart.remove(), 4000);
  }, 1000);

  const paragraphs = document.querySelectorAll(".text-container p");
  let wordDelay = 0;
  paragraphs.forEach(p => {
    const words = p.textContent.split(" ");
    p.textContent = "";
    words.forEach(word => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.classList.add("word");
      span.style.animationDelay = wordDelay + "s";
      wordDelay += 0.5;
      p.appendChild(span);
    });
  });

  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.animationDuration = (1 + Math.random() * 2) + "s";
    body.appendChild(sparkle);
  }
});
