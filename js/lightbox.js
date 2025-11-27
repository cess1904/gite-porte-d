// === lightbox.js ===
// Galerie plein écran minimaliste sans dépendance externe
(() => {
  const gal = document.querySelector('.gallery-espaces, .grid-espaces');
  const lb  = document.getElementById('lightbox');
  if (!gal || !lb) return;

  const imgEl = lb.querySelector('.lightbox__img');
  const btnClose = lb.querySelector('.lightbox__close');
  const btnPrev  = lb.querySelector('.prev');
  const btnNext  = lb.querySelector('.next');

  const items = [...gal.querySelectorAll('img')];
  let index = -1;

  const open = (i) => {
    index = i;
    const el = items[index];
    const src = el.dataset.full || el.currentSrc || el.src;
    imgEl.src = src;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden','false');
    document.body.classList.add('no-scroll');
  };

  const close = () => {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    imgEl.removeAttribute('src');
    document.body.classList.remove('no-scroll');
  };

  const nav = (dir) => open((index + dir + items.length) % items.length);

  gal.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;
    open(items.indexOf(img));
  });

  lb.addEventListener('click', (e) => {
    if (e.target === lb) close(); // clic sur fond
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => nav(-1));
  btnNext.addEventListener('click', () => nav(1));

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(1);
  });
})();
