// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // === MUSIC FLAP TOGGLE ===
  const btn = document.querySelector(".flap-toggle");
  const musicArea = document.getElementById("music-area");

  if (btn && musicArea) {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      musicArea.hidden = expanded;
      if (!expanded) setTimeout(() => musicArea.classList.add("show"), 10);
      else musicArea.classList.remove("show");
    });
  }

  // === FLOATING EMOJIS (R & C KEYS) ===
  function showEmojis(emojiList, count = 6) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      el.textContent = emoji;
      el.style.position = "fixed";
      el.style.left = 10 + Math.random() * 80 + "vw";
      el.style.top = 20 + Math.random() * 60 + "vh";
      el.style.fontSize = 40 + Math.random() * 50 + "px";
      el.style.opacity = "1";
      el.style.pointerEvents = "none";
      el.style.transition = "transform 2s ease-out, opacity 2s";
      el.style.filter = "drop-shadow(0 4px 6px rgba(0,0,0,0.22))";
      el.style.zIndex = 9999;
      const startRotation = Math.random() * 360;
      el.style.transform = `rotate(${startRotation}deg)`;
      document.body.appendChild(el);
      const x = (Math.random() - 0.5) * 140;
      const y = -120 - Math.random() * 100;
      const endRotation = startRotation + (Math.random() > 0.5 ? 180 : -180);
      requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px) rotate(${endRotation}deg) scale(1.15)`;
        el.style.opacity = "0";
      });
      setTimeout(() => el.remove(), 2300 + Math.random() * 400);
    }
  }

  // === KEYBOARD SHORTCUTS ===
  document.addEventListener("keydown", (e) => {
    const tag = (document.activeElement && document.activeElement.tagName) || "";
    const isEditable =
      tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable;
    if (isEditable) return;
    const key = (e.key || "").toLowerCase();
    if (key === "r") {
      showEmojis(["⋆˚˖𓂃.☘︎ ݁˖", "💌", "𓈒⟡₊⋆∘", "💫"], 8);
    } else if (key === "c") {
      showEmojis(["⋆˚✿˖°", "⭐️", "࣪ ִֶָ☾.⭒", "🌻"], 8);
    }
  });

  // === STARS ===
  const starContainer = document.getElementById("star-container");
  if (starContainer) {
    const numStars = 80;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      starContainer.appendChild(star);
    }
  }

  // === TURNTABLE ANIMATION ===
  const record = document.querySelector(".record");
  const hand = document.querySelector(".hand");
  const body = document.body;

  // Start record + stars after a short delay
  setTimeout(() => {
    body.classList.add("playing");
    if (record) record.classList.add("spin");
  }, 800);

  // Animate the hand only once on load, then stop
  if (hand) {
    hand.style.transition = "transform 2.5s cubic-bezier(0.55, 0, 0.1, 1)";
    hand.style.transformOrigin = "top right";

    // Move arm toward record only once per refresh
    setTimeout(() => {
      hand.style.transform = "rotate(18deg)";
    }, 1000);

    // Make sure it stays in place after animation
    hand.addEventListener("transitionend", () => {
      hand.style.transition = "none";
    });
  }

  // Pause record spin when tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (record) {
      record.style.animationPlayState = document.hidden ? "paused" : "running";
    }
  });
});
