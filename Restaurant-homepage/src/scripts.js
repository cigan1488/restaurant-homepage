const overlay = document.getElementById('overlay');
const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
const navright = document.getElementById("header-right");
const slide = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.circle svg');
const arrowrightBtn = document.querySelector('.arrow-right');
const arrowleftBtn = document.querySelector('.arrow-left');


overlay.addEventListener('click', () => {
  menu.classList.remove('menu--active');
  navright.classList.remove("header--active");
  overlay.classList.remove('active');
  burger.setAttribute('aria-expanded',"false");
});

burger.addEventListener('click', () => {
  menu.classList.toggle('menu--active');
  navright.classList.toggle("header--active");
  overlay.classList.toggle('active');
  const isExpanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', !isExpanded);
});

(function (){
  if (window.innerWidth <= 767) return;
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const underline = document.createElement('div');

  underline.classList.add('nav-underline');
  header.appendChild(underline); // добавляем в .site-header
  // НЕ меняем position у .site-header — он должен быть fixed в CSS

  const extra = 2;

  function moveUnderlineTo(link) {
    const linkRect = link.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();

    const width = linkRect.width + extra;
    const left = linkRect.left - headerRect.left - extra / 2;

    underline.style.width = `${width}px`;
    underline.style.left = `${left}px`;
  }

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => moveUnderlineTo(link));
  });

  // Устанавливаем на первую ссылку при загрузке
  moveUnderlineTo(navLinks[0]);
})();



let currentIndex = 0;
const totalSlides = slide.length;

function showSlide(index) {
  if (index >= totalSlides) index = 0;
  if (index < 0) index = totalSlides - 1;
  currentIndex = index;

  slide.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentIndex);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

// Показать первый слайд сразу
showSlide(currentIndex);

// Клик по кнопкам переключения
arrowleftBtn.addEventListener('click', () => {
showSlide(currentIndex - 1);
});

arrowrightBtn.addEventListener('click', () => {
showSlide(currentIndex + 1);
});

let slideshowInterval;

function initSlideshow() {
  // Не включать слайдшоу, если ширина экрана 600px или меньше
  if (window.innerWidth <= 600) return;

  // Запустить слайдшоу
  slideshowInterval = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 5000);
  
  arrowrightBtn.addEventListener('click', onNext);
  arrowleftBtn.addEventListener('click', onPrev);
}

function onPrev() {
  showSlide(currentIndex - 1);
}

function onNext() {
  showSlide(currentIndex + 1);
}

function destroySlideshow() {
  clearInterval(slideshowInterval);
  arrowrightBtn.removeEventListener('click', onPrev);
  arrowleftBtn.removeEventListener('click', onNext);
}

// Вызывать при загрузке
initSlideshow();

// (опционально) следить за изменением размера экрана
window.addEventListener('resize', () => {
  destroySlideshow();
  initSlideshow();
});





const group = document.getElementById('heroButtons');
const buttons = group.querySelectorAll('button, a.button');
const bg = document.getElementById('buttonBg');
let active = group.querySelector('.active') || buttons[0];

function moveBackgroundTo(el) {
  if (window.innerWidth <= 767) return;
  const elRect = el.getBoundingClientRect();
  const groupRect = group.getBoundingClientRect();
  bg.style.width = `${elRect.width}px`;
  bg.style.left = `${elRect.left - groupRect.left}px`;
}

buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => moveBackgroundTo(btn));
  btn.addEventListener('mouseleave', () => moveBackgroundTo(active));
  btn.addEventListener('click', () => {
    active.classList.remove('active');
    active = btn;
    active.classList.add('active');
    moveBackgroundTo(active);
  });
});

// При загрузке страницы
moveBackgroundTo(active);