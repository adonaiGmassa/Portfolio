/*By Radcircles*/

/* ============================================================
   GLOBAL JS 
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Active nav link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Scroll shadow on nav ---- */
  const navbar = document.querySelector('nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ---- Hamburger menu ---- */
  const hamburg = document.querySelector('.hamburg');
  const drawer  = document.querySelector('.mobile-drawer');
  if (hamburg && drawer) {
    hamburg.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!hamburg.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
      }
    });
  }

  /* ---- Fade-up on scroll ---- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach((el, i) => {
    el.style.transitionDelay = (i * 60) + 'ms';
    observer.observe(el);
  });

  /* ---- Typewriter (index only) ---- */
  const twEl = document.getElementById('tw');
  if (twEl) {
    const words = ['développeur', 'étudiant en informatique', 'passionné d\'informatique', 'créateur de solutions'];
    let wi = 0, ci = 0, del = false;
    function type() {
      const word = words[wi];
      if (del) {
        twEl.textContent = word.substring(0, --ci);
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; setTimeout(type, 450); return; }
        setTimeout(type, 48);
      } else {
        twEl.textContent = word.substring(0, ++ci);
        if (ci === word.length) { del = true; setTimeout(type, 2200); return; }
        setTimeout(type, 95);
      }
    }
    setTimeout(type, 900);
  }

  /* ---- Contact form ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const nom     = document.getElementById('f-nom')?.value.trim();
      const prenom  = document.getElementById('f-prenom')?.value.trim();
      const email   = document.getElementById('f-email')?.value.trim();
      const message = document.getElementById('f-message')?.value.trim();
      const ok  = document.getElementById('f-ok');
      const err = document.getElementById('f-err');
      if (ok) ok.style.display = 'none';
      if (err) err.style.display = 'none';
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!nom || !prenom || !email || !message || !emailValid) {
        if (err) err.style.display = 'block';
        return;
      }
      if (ok) { ok.style.display = 'block'; setTimeout(() => { ok.style.display = 'none'; }, 5000); }
      form.reset();
    });
  }

});
