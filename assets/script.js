/* ============================================================
   HelpsMed — Interactions
   ============================================================ */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     CONFIG — ajuste estes valores antes de publicar
     ---------------------------------------------------------- */
  var CONFIG = {
    // Número no formato internacional, apenas dígitos: 55 + DDD + número
    whatsappNumber: '5500000000000',
    whatsappMessage: 'Olá! Vim pelo site da HelpsMed e quero analisar meu currículo para a residência.',
    // Endpoint opcional para receber os leads do formulário (ex.: Formspree, n8n, API própria).
    // Deixe vazio ('') para o formulário abrir o WhatsApp com os dados preenchidos.
    formEndpoint: ''
  };

  function waLink(customMessage) {
    var msg = encodeURIComponent(customMessage || CONFIG.whatsappMessage);
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + msg;
  }

  /* ---------- Wire all WhatsApp links ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.setAttribute('href', waLink());
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('header');
  var onScroll = function () {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  function setNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  toggle.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });
  backdrop.addEventListener('click', function () { setNav(false); });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setNav(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1500;
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      var display = target % 1 === 0 ? Math.round(val) : val.toFixed(1);
      el.textContent = display + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = (target % 1 === 0 ? target : target.toFixed(1)) + suffix;
    }
    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); });
  }

  /* ---------- Hero score ring ---------- */
  var scoreRing = document.querySelector('.score__ring');
  if (scoreRing) {
    var arc = scoreRing.querySelector('.score__arc');
    var num = document.getElementById('scoreNum');
    var score = parseInt(scoreRing.getAttribute('data-score'), 10);
    var circ = 327; // 2πr, r=52
    var reveal = function () {
      arc.style.strokeDashoffset = String(circ - (circ * score / 100));
      var start = performance.now();
      (function tick(now) {
        var p = Math.min((now - start) / 1500, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        num.textContent = Math.round(score * eased);
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    };
    if ('IntersectionObserver' in window) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { reveal(); sio.disconnect(); }
        });
      }, { threshold: 0.5 });
      sio.observe(scoreRing);
    } else { reveal(); }
  }

  /* ---------- FAQ: close others (accordion behaviour) ---------- */
  var faqItems = document.querySelectorAll('#faqList .faq__item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });

  /* ---------- Lead form ---------- */
  var form = document.getElementById('leadForm');
  if (form) {
    var success = document.getElementById('formSuccess');
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        var wrap = field.closest('.field');
        if (!field.value.trim()) { wrap.classList.add('is-invalid'); valid = false; }
        else { wrap.classList.remove('is-invalid'); }
      });
      if (!valid) {
        var firstInvalid = form.querySelector('.is-invalid input, .is-invalid select');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var data = {
        nome: form.nome.value.trim(),
        whatsapp: form.whatsapp.value.trim(),
        momento: form.momento.value,
        edital: form.edital.value.trim(),
        mensagem: form.mensagem.value.trim()
      };

      // Se houver endpoint configurado, envia por fetch. Senão, abre o WhatsApp.
      if (CONFIG.formEndpoint) {
        fetch(CONFIG.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).catch(function () {});
      }

      var wa = waLink(
        'Olá! Sou ' + data.nome + '.' +
        '\nMomento: ' + data.momento +
        (data.edital ? '\nEdital-alvo: ' + data.edital : '') +
        (data.mensagem ? '\nObjetivo: ' + data.mensagem : '') +
        '\nQuero analisar meu currículo com a HelpsMed.'
      );

      if (success) { success.hidden = false; }
      window.open(wa, '_blank', 'noopener');
      form.reset();
    });

    // limpa estado inválido ao digitar
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        var wrap = field.closest('.field');
        if (wrap) wrap.classList.remove('is-invalid');
      });
    });
  }

  /* ---------- Exit-intent modal (desktop) + timed fallback (mobile) ---------- */
  var modal = document.getElementById('exitModal');
  if (modal) {
    var shown = false;
    var KEY = 'helpsmed_exit_shown';
    var already = false;
    try { already = sessionStorage.getItem(KEY) === '1'; } catch (err) {}

    function openModal() {
      if (shown || already) return;
      shown = true;
      try { sessionStorage.setItem(KEY, '1'); } catch (err) {}
      modal.hidden = false;
    }
    function closeModal() { modal.hidden = true; }

    modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    // Desktop: mouse leaves viewport top
    document.addEventListener('mouseout', function (e) {
      if (!e.relatedTarget && e.clientY <= 0) openModal();
    });

    // Mobile / fallback: after meaningful engagement (scroll + time)
    var scrolled = false;
    window.addEventListener('scroll', function () { scrolled = true; }, { passive: true, once: true });
    setTimeout(function () {
      if (scrolled && window.innerWidth < 820) openModal();
    }, 25000);
  }

})();