"use strict";
(function () {
  let upButton = document.querySelector(".up");

  if (upButton) {
    window.onscroll = function () {
      if (window.pageYOffset > 260) {
        upButton.classList.add("up--shown");
      } else {
        upButton.classList.remove("up--shown");
      }
    };
  }
})();

"use strict";
(function () {
  const togglers = document.querySelectorAll(".js-faq-toggler");
  if (!togglers.length) return;

  togglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!target) return;
      const content = target.nextElementSibling;
      if (!content) return;
      target.classList.toggle("active");
      content.classList.toggle("active");
    });
  });
})();

"use strict";
(function () {

  const modal = document.querySelector('.js-modal');
  const modalClose = document.querySelectorAll('.js-modal-close');
  const modalOpen = document.querySelector('.js-modal-open');
  const video = modal.querySelector('video');

  if (!modalClose.length || !modal || !modalOpen) {
    return;
  }

  modalOpen.addEventListener('click', ()=>{
    modal.classList.remove('visually-hidden');
    modal.classList.remove('fadeOut');
    modal.classList.add('fadeIn');
    video.play();
  })
  modalClose.forEach((button) => {
    button.addEventListener('click', ()=>{
      modal.classList.add('fadeOut');
      setTimeout(()=>{
        modal.classList.add('visually-hidden');
        video.pause();
      },300)
    })
  })
})();

"use strict";
(function () {
  new Swiper(".js-slider", {
    // Optional parameters
    loop: true,
    slidesPerView: 'auto',
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper__next",
      prevEl: ".swiper__prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },

      768: {
        slidesPerView: 4,
        spaceBetween: 20,
      },

      1025: {
        slidesPerView: 4,
        spaceBetween: 43,
      },
    },
  });

  if (isTouchDevice()) {
    const slides = document.querySelectorAll('.js-slider .swiper-slide');
    slides.forEach((slide)=>{
      slide.addEventListener('click', ()=>{
        slide.classList.toggle('hover');
      })
    })

} else {
    return;
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}


})();

"use strict";
(function () {
  window.scroll = new SmoothScroll(".js-scroll", {
    speed: 800,
    speedAsDuration: true,
    easing: "easeOutQuad",
  });
})();
