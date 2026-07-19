/* ============================================
   ADVANCED ROOFING VICTORIA — main.js
   ============================================ */
// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      // Only remove on home page (where it starts transparent)
      if (!navbar.classList.contains('always-scrolled')) {
        navbar.classList.remove('scrolled');
      }
    }
  });
}
// ── Mobile nav toggle ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
function closeMobileNav() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileNav) mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      hamburger.classList.add('open');
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
  // Close menu when any link is tapped (in-page anchors or otherwise)
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMobileNav());
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });
}
// ── Scroll to top button ──
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
// ── Scroll-reveal animation ──
const revealElements = document.querySelectorAll(
  '.service-card, .feature-item, .testimonial-card, .service-detail-card, .value-card, .contact-item'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});
// ── Before & After Slider ──
const baSlider = document.getElementById('baSlider');
if (baSlider) {
  const baBeforeImg = document.getElementById('baBeforeImg');
  const baHandle    = document.getElementById('baHandle');
  let isDragging = false;
  const updateSlider = (clientX) => {
    const rect = baSlider.getBoundingClientRect();
    const pct  = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    baBeforeImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    baHandle.style.left = pct + '%';
  };
  baSlider.addEventListener('mousedown',  (e) => { isDragging = true; updateSlider(e.clientX); });
  window.addEventListener('mousemove',    (e) => { if (isDragging) updateSlider(e.clientX); });
  window.addEventListener('mouseup',      ()  => { isDragging = false; });
  baSlider.addEventListener('touchstart', (e) => { isDragging = true; updateSlider(e.touches[0].clientX); e.preventDefault(); }, { passive: false });
  window.addEventListener('touchmove',    (e) => { if (isDragging) { updateSlider(e.touches[0].clientX); e.preventDefault(); } }, { passive: false });
  window.addEventListener('touchend',     ()  => { isDragging = false; });
}
// ── FAQ Accordion ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const q = i.querySelector('.faq-q');
      if (q) q.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
// ── Active nav link highlighting ──
const pathSeg = window.location.pathname.replace(/\/$/, '').split('/').pop() || '';
const isHome = pathSeg === '' || pathSeg === 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = (link.getAttribute('href') || '').replace(/^\//, '');
  const linkSeg = href.split('#')[0];
  const matchHome = isHome && (linkSeg === '' || linkSeg === 'index.html' || link.getAttribute('href') === '/');
  const matchPage = !isHome && (linkSeg === pathSeg || linkSeg === pathSeg + '.html');
  if (matchHome || matchPage) link.classList.add('active');
});
