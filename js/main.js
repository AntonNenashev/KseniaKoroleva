document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link');

  // Функция смены иконки
  function changeIcon() {
    if (navMenu.classList.contains('nav__menu--open')) {
      navToggle.classList.replace('ri-menu-3-line', 'ri-close-line');
    } else {
      navToggle.classList.replace('ri-close-line', 'ri-menu-3-line');
    }
  }

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav__menu--open');
    document.body.classList.toggle('no-scroll');
    changeIcon(); // Добавляем смену иконки

    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('nav__overlay');

    if (navMenu.classList.contains('nav__menu--open')) {
      document.body.appendChild(overlay);
      overlay.classList.add('nav__overlay--show');
    } else {
      const existingOverlay = document.querySelector('.nav__overlay');
      if (existingOverlay) existingOverlay.remove();
    }

    // Close menu when clicking on overlay
    overlay.addEventListener('click', () => {
      navMenu.classList.remove('nav__menu--open');
      overlay.classList.remove('nav__overlay--show');
      document.body.classList.remove('no-scroll');
      changeIcon(); // Добавляем смену иконки
      setTimeout(() => {
        overlay.remove();
      }, 300);
    });
  });

  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav__menu--open');
      const overlay = document.querySelector('.nav__overlay');
      if (overlay) overlay.remove();
      document.body.classList.remove('no-scroll');
      changeIcon(); // Добавляем смену иконки
    });
  });

  // Change header background on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scroll');
    } else {
      header.classList.remove('header--scroll');
    }
  });

  // Scroll to top button
  const scrollUp = document.getElementById('scroll-up');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollUp.classList.add('scrollup--show');
    } else {
      scrollUp.classList.remove('scrollup--show');
    }
  });

  // Обработчик клика для плавного скролла вверх
  scrollUp.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Testimonials slider с эффектом coverflow
  const testimonialSwiper = new Swiper('.testimonial__wrapper', {
    loop: true,
    spaceBetween: 30,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    effect: "coverflow", // Добавляем эффект coverflow
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      520: {
        slidesPerView: "auto",
      },
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      }
    }
  });

  // Typed.js animation
  const typed = new Typed('.typed-text', {
    strings: ['Дизайнер интерьеров', '3D визуализатор', 'Декоратор'],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    smartBackspace: true,
    backDelay: 1500,
    startDelay: 500
  });

  // Scroll reveal animations с более детальными настройками
  const sr = ScrollReveal({
    origin: 'top',
    distance: '100px',
    duration: 800,
    delay: 300,
    reset: false
  });

  sr.reveal('.hero__content, .about__content');
  sr.reveal('.hero__img, .hero__img-wrapper', {
    origin: 'top'
  });
  sr.reveal('.section__header', {
    origin: 'top'
  });

  sr.reveal(
    '.hero__info-wrapper, .skills__title, .skills__content, .qualification__name, .qualification__item, .service__card, .project__content, .testimonial__wrapper, .footer__content', {
      delay: 500,
      interval: 100,
    }
  );

  sr.reveal('.qualification__footer-text, .contact__content', {
    origin: 'left',
  });

  sr.reveal('.qualification__footer .btn, .contact__btn', {
    origin: 'right'
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav__link[href*=${sectionId}]`).classList.add('active');
      } else {
        document.querySelector(`.nav__link[href*=${sectionId}]`).classList.remove('active');
      }
    });
  });
});