const views = document.querySelectorAll('.view');
const navButtons = document.querySelectorAll('[data-target]');
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

const headerLogo = document.getElementById('headerLogo');
const logosByView = {
  home: 'assets/images/logo-header-home.png',
  oralblue: 'assets/images/logo-oralblue.png',
  maisblue: 'assets/images/logo-maisblue.png',
  sabemi: 'assets/images/logo-sabemi.png'
};
const logoAltByView = {
  home: 'Oral Blue, Mais Blue e Sabemi',
  oralblue: 'Oral Blue Plano Odontológico',
  maisblue: 'Mais Blue Clube de Benefícios',
  sabemi: 'Sabemi'
};

function updateHeaderLogo(viewName) {
  if (!headerLogo) return;
  const logoPath = logosByView[viewName] || logosByView.home;
  if (headerLogo.getAttribute('src') === logoPath) return;
  headerLogo.classList.add('logo-changing');
  window.setTimeout(() => {
    headerLogo.src = logoPath;
    headerLogo.alt = logoAltByView[viewName] || logoAltByView.home;
    headerLogo.classList.remove('logo-changing');
  }, 120);
}

function createCards() {
  document.querySelectorAll('[data-list]').forEach((grid) => {
    const key = grid.dataset.list;
    grid.innerHTML = DATA[key].map((item, index) => `
      <article class="mini-card">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <h4>${item}</h4>
      </article>
    `).join('');
  });
}

function createFaqs() {
  document.querySelectorAll('[data-faq]').forEach((grid) => {
    const key = grid.dataset.faq;
    grid.innerHTML = DATA[key].map(([question, answer], index) => `
      <article class="faq-item ${index === 0 ? 'open' : ''}">
        <button class="faq-question" type="button">
          ${question}<i>${index === 0 ? '−' : '+'}</i>
        </button>
        <div class="faq-answer"><p>${answer}</p></div>
      </article>
    `).join('');
  });

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const icon = button.querySelector('i');
      item.classList.toggle('open');
      icon.textContent = item.classList.contains('open') ? '−' : '+';
    });
  });
}

function showView(target) {
  const nextTarget = target || 'home';
  views.forEach((view) => view.classList.toggle('active', view.dataset.view === nextTarget));
  document.querySelectorAll('.nav-link').forEach((btn) => btn.classList.toggle('active', btn.dataset.target === nextTarget));
  updateHeaderLogo(nextTarget);
  mobileNav.classList.remove('open');
  mobileToggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  requestAnimationFrame(observeReveals);
}

function observeReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function setupNavigation() {
  navButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = button.dataset.target;
      if (!target) return;
      event.preventDefault();
      showView(target);
    });
  });

  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function setupWhatsappForm() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = `Olá! Meu nome é ${name}.\nEmail: ${email}\nAssunto: ${subject}`;
    window.open(`https://wa.me/5591981643641?text=${encodeURIComponent(message)}`, '_blank');
    form.reset();
  });
}

createCards();
createFaqs();
setupNavigation();
setupWhatsappForm();
observeReveals();
