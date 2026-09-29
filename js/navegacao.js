const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#menu-principal');
const submenuButton = document.querySelector('.submenu-toggle');
const submenuItem = document.querySelector('.submenu-item');

function fecharSubmenu() {
  submenuButton.setAttribute('aria-expanded', 'false');
  submenuItem.classList.remove('is-open');
}

function fecharMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  fecharSubmenu();
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  if (!open) fecharSubmenu();
});

submenuButton.addEventListener('click', () => {
  const open = submenuButton.getAttribute('aria-expanded') !== 'true';
  submenuButton.setAttribute('aria-expanded', String(open));
  submenuItem.classList.toggle('is-open', open);
});

// Ao escolher uma rota, o menu móvel não deve continuar cobrindo o conteúdo novo.
nav.addEventListener('click', event => {
  if (event.target.closest('a')) fecharMenu();
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const focoNoSubmenu = submenuItem.contains(document.activeElement);
  fecharMenu();
  if (focoNoSubmenu) submenuButton.focus();
});

document.addEventListener('click', event => {
  if (!submenuItem.contains(event.target)) fecharSubmenu();
  if (!event.target.closest('header')) fecharMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 600) fecharMenu();
});
