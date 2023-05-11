"use strict";
(function () {
  const contentsEls = document.querySelectorAll(".js-content");
  const thumbs = document.querySelectorAll(".js-thumb");

  const swiperSlider = new Swiper(".js-slider", {
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 0,
    initialSlide: 0,
    speed: 1000,
    draggable: false,
    pagination: false,
    loop: false,
    allowTouchMove: false,
    slideToClickedSlide: true,

    navigation: {
      nextEl: ".swiper__next",
      prevEl: ".swiper__prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: true,
      },

      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },

      1025: {
        slidesPerView: "auto",
        spaceBetween: 30,
      },
    },
  });

  const map = document.querySelector('.js-map');
  const mapModal = document.querySelector('.js-map-modal');
  const modalText = mapModal.querySelector('.js-map-modal-text');
  const modalGoTo = mapModal.querySelector('.js-map-modal-goto');
  const modalClose = mapModal.querySelector('.js-map-modal-close');

  const figures = map.querySelectorAll('.figure');

  const locations = {
    '1': 'Велком',
    '2': 'Арт объект с оркестром',
    '3': 'Лучшие спортивные фотографии',
    '4': 'Ретроспектива - фотозоны',
    '5': 'Спортивная зона челленджей',
    '6': 'Фестиваль городских видов спорта',
    '7': 'Шахматы',
    '8': 'Массовый турнир по футболу',
    '9': 'Сайклинг',
    '10': 'Первенство России по ЛА',
    '11': 'Фестиваль Фигурного катания',
    '12' : 'Стритбол, 100 колец',
    '13' : 'Детская зона',
    '14' : 'Настольный теннис',
    '15' : 'Зона экстремальных видов спорта',
    '16' : 'Фан-встречи и автограф-сессии',
    '17' : 'Стантрайдинг',
    '18' : 'Брейк-данс',
    '19' : 'Воркаут',
    '20' : 'Паркур и Трикинг',
    '21' : 'Фехтование',
    '22' : 'Полоса препятствий',
    '23' : 'Кубок мира по Стронгмену',
    '24' : 'Зона фитнеса',
    '25' : 'Пейнтбол и Лазертаг',
    '26' : 'Медиа футбол',
    '27' : 'Регби',
    '28' : 'Стретчинг',
    '29' : 'Кинопоказ',
    '30' : 'Концерт',
  }

  // ACTIONS

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
    toggleContent(locationNumber);
    closeModal();
    const scrollNumber = Number(locationNumber) > 3 ? Number(locationNumber) - 2 : 0;
    swiperSlider.slideTo(scrollNumber);
    // добавить скролл
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
