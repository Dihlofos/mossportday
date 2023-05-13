"use strict";
(function () {
  const contentsEls = document.querySelectorAll(".js-content");
  const thumbs = document.querySelectorAll(".js-thumb");

  const swiperSlider = new Swiper(".js-slider", {
    // Optional parameters
    slidesPerView: 4,
    spaceBetween: 0,
    initialSlide: 0,
    speed: 0,
    draggable: false,
    pagination: false,
    loop: false,
    allowTouchMove: false,
    slideToClickedSlide: false,
    on: {
      slideChange: function (e) {
        const vw = window.innerWidth;

        if (vw > 743) {
          return;
        }

        const currentSlide = e.slides[e.realIndex];

        if (!currentSlide) return;

        const locationNumber = currentSlide.dataset.thumbIndex;

        toggleContent(locationNumber);
      },
    },

    navigation: {
      nextEl: ".swiper__next",
      prevEl: ".swiper__prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
        draggable: true,
        allowTouchMove: true,
        centeredSlides: true,

      },

      744: {
        slidesPerView: 2,
        spaceBetween: 30,
        draggable: true,
        allowTouchMove: true,
        speed: 300,
      },

      1025: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  const map = document.querySelector('.js-map');
  const mapScroller = document.querySelector('.js-map-scroll');
  const mapModal = document.querySelector('.js-map-modal');
  const modalText = mapModal.querySelector('.js-map-modal-text');
  const modalGoTo = mapModal.querySelector('.js-map-modal-goto');
  const modalClose = mapModal.querySelector('.js-map-modal-close');

  const figures = map.querySelectorAll('.figure');

  const locations = {
    '1': 'Велком',
    '5': 'Спортивная зона челленджей',
    '6': 'Фестиваль городских видов спорта',
    '7': 'Шахматы',
    '8': 'МИНИ-ФУТБОЛ',
    '9': 'Сайклинг',
    '10': 'ЛЕГКАЯ АТЛЕТИКА',
    '11': 'Фигурное катание',
    '12' : 'Стритбол',
    '13' : 'Детская зона',
    '14' : 'Настольный теннис',
    '15' : 'Зона экстремальных видов спорта',
    '16' : 'Фан',
    '17' : 'Стантрайдинг',
    '18' : 'Брейк-данс',
    '19' : 'Воркаут',
    '20' : 'Паркур и Трикинг',
    '21' : 'Фехтование',
    '22' : 'Полоса препятствий',
    '23' : 'Стронгмен',
    '24' : 'Фитнес',
    '25' : 'Пейнтбол и Лазертаг',
    '26' : 'Медиа-футбол',
    '27' : 'Регби',
    '28' : 'Стретчинг',
    '29' : 'Кино',
    '30' : 'Концерт',
  }

  // ACTIONS
  mapScroller?.scroll({left: 275})

  figures.forEach((figure) => {
    figure.addEventListener('click', () => {
      // все классы фигур идут вид "figure /*номер*/" поэтому смело берем [1]
      onFigureClick(figure)
    })
  })

  modalGoTo.addEventListener('click', () => {
    const locationNumber = modalGoTo.dataset.locationNumber;
    onGoToLocation(locationNumber);
    closeModal();
  })

  modalClose.addEventListener('click', () => {
    closeModal();
  })


  thumbs.forEach((item) => {
    const thumbIndex = item.dataset.thumbIndex;
    item.addEventListener('click', () => {
      toggleContent(thumbIndex);
    })
  });


  // FUNCTIONS

  function onFigureClick(figure) {
    const locationNumber = figure.classList[1];

    if (locationNumber === '30') {
      modalGoTo.href = '#concert';
    } else {
      modalGoTo.href = '#locations';
    }

    if (figure.classList.contains('is-active')) {
      resetFigures();
      closeModal(locationNumber);
    } else {
      resetFigures();
      figure.classList.add('is-active');
      openModal(locationNumber);
    }
  }

  function resetFigures() {
    figures.forEach((figure) => {
      figure.classList.remove('is-active');
    })
  }

  function openModal(locationNumber) {
    if (!locations[locationNumber]) return;

    modalText.textContent = locations[locationNumber]
    modalGoTo.dataset.locationNumber = locationNumber;
    mapModal.classList.add('is-active');
  }

  function closeModal() {
    mapModal.classList.remove('is-active');
    setTimeout(()=>{
      modalText.textContent = ''
      modalGoTo.dataset.locationNumber = '';
    }, 300)
    resetFigures();
  }

  function onGoToLocation(locationNumber) {

    if (locationNumber === '30') return;
    toggleContent(locationNumber);
    closeModal();


    swiperSlider.slideTo(getSlideIndex(locationNumber));
    // добавить скролл
  }

  function getSlideIndex(locationNumber) {
    const element = document.querySelector(`.js-thumb[data-thumb-index="${locationNumber}"]`);
    const elIndex = Array.from(element.parentNode.children).indexOf(element);
    return Number(elIndex);
  }


  function toggleContent(locationNumber) {
    contentsEls.forEach((item) => {
      const contentIndex = item.dataset.contentIndex;
      if (Number(contentIndex) === Number(locationNumber)) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });

    thumbs.forEach((item) => {
      const thumbIndex = item.dataset.thumbIndex;
      if (Number(thumbIndex) === Number(locationNumber)) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });
  };








})();
