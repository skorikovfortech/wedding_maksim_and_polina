const weddingDate = new Date('2026-08-14T16:00:00+03:00');
const units = { days: document.querySelector('#days'), hours: document.querySelector('#hours'), minutes: document.querySelector('#minutes'), seconds: document.querySelector('#seconds') };

function updateCountdown() {
  const distance = Math.max(0, weddingDate - new Date());
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
  Object.entries(values).forEach(([key, value]) => units[key].textContent = String(value).padStart(key === 'days' ? 3 : 2, '0'));
}
updateCountdown(); setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((el, index) => { el.style.transitionDelay = `${(index % 3) * 90}ms`; observer.observe(el); });

const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => { if (window.scrollY < window.innerHeight) heroBg.style.transform = `translateY(${window.scrollY * .16}px) scale(1.05)`; }, { passive: true });

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); menuButton.setAttribute('aria-expanded', open); });
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));

document.querySelector('#rsvp-form').addEventListener('submit', event => {
  event.preventDefault();
  const status = event.currentTarget.querySelector('.form-status');
  const name = new FormData(event.currentTarget).get('name').trim().split(' ')[0];
  status.textContent = `${name}, спасибо! Ваш ответ сохранён ♡`;
  event.currentTarget.querySelector('button').textContent = 'Ответ отправлен ✓';
});
