const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = mobileNav.querySelectorAll('a');

function closeMobileNav() {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}
menuButton.addEventListener('click', () => {
  const willOpen = mobileNav.hidden;
  mobileNav.hidden = !willOpen;
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
});
mobileNavLinks.forEach(a => a.addEventListener('click', closeMobileNav));
window.addEventListener('resize', () => { if (window.innerWidth > 830) closeMobileNav(); });

const navAnchors = [...document.querySelectorAll('.desktop-nav a')];
const trackedSections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const href = '#' + entry.target.id;
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === href));
    }
  }, { rootMargin: '-23% 0px -55% 0px', threshold: 0 });
  trackedSections.forEach(s => observer.observe(s));
}

const track = document.getElementById('gallery-track');
document.getElementById('gallery-next').addEventListener('click', () => {
  track.scrollBy({ left: Math.max(180, Math.round(track.clientWidth / 3)), behavior: 'smooth' });
});
document.getElementById('gallery-prev').addEventListener('click', () => {
  track.scrollBy({ left: -Math.max(180, Math.round(track.clientWidth / 3)), behavior: 'smooth' });
});

const compare = document.querySelector('.comparison');
const compareAfter = document.getElementById('comparison-after');
const compareDivider = document.getElementById('comparison-divider');
const compareRange = document.getElementById('comparison-range');
function updateCompare(value) {
  compare.style.setProperty('--comparison-image-width', `${compare.clientWidth}px`);
  const percent = `${value}%`;
  compareAfter.style.width = percent;
  compareDivider.style.left = percent;
}
compareRange.addEventListener('input', e => updateCompare(e.target.value));
updateCompare(compareRange.value);
if ('ResizeObserver' in window) {
  new ResizeObserver(() => updateCompare(compareRange.value)).observe(compare);
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
document.querySelectorAll('[data-lightbox]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  lightboxImage.src = a.getAttribute('href');
  lightboxImage.alt = a.querySelector('img').alt;
  lightbox.hidden = false;
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}));
function closeLightbox() { lightbox.hidden = true; document.body.classList.remove('lightbox-open'); lightboxImage.src = ''; }
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeLightbox(); closeMobileNav(); } });
