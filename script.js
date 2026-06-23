const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = [...document.querySelectorAll('.nav-links a')];

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const setActiveNav = () => {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) current = section.id;
  });
  navItems.forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
revealItems.forEach((item) => observer.observe(item));

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hide', !matches);
    });
  });
});

const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(contactForm);
  const name = form.get('name') || '';
  const email = form.get('email') || '';
  const subject = form.get('subject') || 'Portfolio contact';
  const message = form.get('message') || '';
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
  window.location.href = `mailto:moinsanzida4@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
});
const backToTopBtn = document.getElementById('backToTop');

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
document.getElementById('year').textContent = new Date().getFullYear();
