const overlay = document.getElementById('overlay');
const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
const navright = document.getElementById("header");
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

(function() {
  const navContainer = document.querySelector('.nav-links'); // контейнер ссылок
  const navLinks = navContainer.querySelectorAll('.nav-link'); // все ссылки
  const underline = document.createElement('div'); // псевдоэлемент подчеркивания
  underline.classList.add('nav-underline'); // класс, все стили в CSS

  navContainer.appendChild(underline); // вставляем полосу в DOM

  const firstLink = navLinks[0]; // берём первую ссылку как базовую

  function moveUnderlineTo(link) {
    const linkRect = link.getBoundingClientRect();
    const containerRect = navContainer.getBoundingClientRect();
    underline.style.width = `${linkRect.width}px`;
    underline.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
  }

  moveUnderlineTo(firstLink); // начальная установка под первой ссылкой

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => moveUnderlineTo(link));
    link.addEventListener('mouseleave', () => moveUnderlineTo(firstLink));
  });
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