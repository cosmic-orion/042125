// Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // === MUSIC FLAP TOGGLE ===
  const btn = document.querySelector('.flap-toggle');
  const musicArea = document.getElementById('music-area');
  
  if (btn && musicArea) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        btn.setAttribute('aria-expanded', 'false');
        musicArea.hidden = true;
        musicArea.classList.remove('show');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        musicArea.hidden = false;
        setTimeout(() => musicArea.classList.add('show'), 10);
      }
    });
  }

  // === FLOATING EMOJIS (R & C KEYS) ===
  function showEmojis(emojiList, count = 6) {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      el.textContent = emoji;

      el.style.position = 'fixed';
      el.style.left = (10 + Math.random() * 80) + 'vw';
      el.style.top = (20 + Math.random() * 60) + 'vh';
      el.style.fontSize = (50 + Math.random() * 60) + 'px'; // big & random size
      el.style.opacity = '1';
      el.style.pointerEvents = 'none';
      el.style.transition = 'transform 2s ease-out, opacity 2s';
      el.style.filter = 'drop-shadow(0 4px 6px rgba(0,0,0,0.22))';
      el.style.zIndex = 9999;

      const startRotation = Math.random() * 360;
      el.style.transform = `rotate(${startRotation}deg)`;
      document.body.appendChild(el);

      const x = (Math.random() - 0.5) * 140;
      const y = -120 - Math.random() * 100;
      const endRotation = startRotation + (Math.random() > 0.5 ? 180 : -180);

      requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px) rotate(${endRotation}deg) scale(1.15)`;
        el.style.opacity = '0';
      });

      setTimeout(() => el.remove(), 2300 + Math.random() * 400);
    }
  }

  // === KEYBOARD SHORTCUTS ===
  document.addEventListener('keydown', (e) => {
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    const isEditable =
      tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable;
    if (isEditable) return;

    const key = (e.key || '').toLowerCase();
    if (key === 'r') {
      showEmojis(['❤️', '💌', '🌹', '💫'], 8);
    } else if (key === 'c') {
      showEmojis(['🤎', '⭐️', '💐', '🌻'], 8);
    }
  });

  // === TEST BUTTONS (optional) ===
  if (window.location.search.includes('test')) {
    const wrap = document.createElement('div');
    wrap.style.position = 'fixed';
    wrap.style.right = '12px';
    wrap.style.bottom = '12px';
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.gap = '8px';
    wrap.style.opacity = '0.85';
    wrap.style.zIndex = 99999;

    const makeBtn = (label, emojis) => {
      const b = document.createElement('button');
      b.textContent = label;
      b.style.padding = '8px 12px';
      b.style.borderRadius = '10px';
      b.style.border = 'none';
      b.style.background = '#7b5a36';
      b.style.color = '#fff';
      b.addEventListener('click', () => showEmojis(emojis, 8));
      return b;
    };

    wrap.appendChild(makeBtn('Test R ❤️', ['❤️','💌','🌹','💫']));
    wrap.appendChild(makeBtn('Test C 🤎', ['🤎','⭐️','💐','🌻']));
    document.body.appendChild(wrap);
  }
});

<script>
const music = document.querySelector('audio');
const record = document.querySelector('.record');

music.addEventListener('play', () => {
  record.style.animationPlayState = 'running';
});

music.addEventListener('pause', () => {
  record.style.animationPlayState = 'paused';
});
</script>