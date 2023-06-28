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
    '1': 'Зона регистрации',
    '2': 'Арт-объект с оркестром',
    '3': 'Лучшие спортивные фотографии',
    '4': 'Ретроспектива-фотозоны',
    '5': 'Спортивная зона челленджей',
    '6': 'Фестиваль городских видов спорта',
    '7': 'Шахматы',
    '8': 'МИНИ-ФУТБОЛ',
    '9': 'Детская зона',
    '10': 'ЛЕГКАЯ АТЛЕТИКА',
    '11': 'Брейк-данс',
    '12' : 'Фигурное катание',
    '13' : 'Стритбол',
    '14' : 'Мода',
    '15' : 'Настольный теннис',
    '16' : 'Зона экстремальных видов спорта',
    '17' : 'Фудкорт',
    '18' : 'Стантрайдинг',
    '19' : 'Воркаут',
    '20' : 'Паркур и Трикинг',
    '21' : 'Фехтование',
    '22' : 'Полоса препятствий',
    '23' : 'Кроссфит',
    '24' : 'Стронгмен',
    '25' : 'Семейный фестиваль',
    '26' : 'Луктаг и Лазертаг',
    '27' : 'Сайклинг',
    '28' : 'Медиа-футбол',
    '29' : 'Регби',
    '30' : 'Стретчинг',
    '31' : 'Футбольный матч',
    '32' : 'Кино',
    '33' : 'ФАН-ВСТРЕЧИ',
    '34' : 'Зоны футбольных клубов',
    '35' : 'Концерт',
  }

  // 32 убрать, когда заработает.
  const numbersWithoutAction = ['2','3','4','17','33', '31', '34', '14', '23']

  const concertNumber = '35';
  const artObject = '2';
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


  init();


  // FUNCTIONS

  function init() {
    const locationNumber = findGetParameter('locationId');
    const artObjectLinks = document.querySelectorAll('.js-art-object-link');
    if (locationNumber) {
      onGoToLocation(locationNumber);
    }
    artObjectLinks.forEach((link) => {
      link.addEventListener('click', ()=>{
        const figure = document.getElementById(`figure ${artObject}`);
        onFigureClick(figure);
      })
    })

  }

  function onFigureClick(figure) {
    modalGoTo.classList.remove('is-hidden');
    const locationNumber = figure.classList[1];

    if (locationNumber === concertNumber) {
      modalGoTo.href = '#concert';
    } else {
      modalGoTo.href = '#locations';
    }
    if (numbersWithoutAction.includes(locationNumber)) {
      modalGoTo.classList.add('is-hidden');
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
    if (numbersWithoutAction.includes(locationNumber))  {
      return;
    }

    if (locationNumber === concertNumber) return;
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

  function insertUrlParam(key, value) {
    if (history.pushState) {
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      console.log(window.location);
      let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname  + '?' + searchParams.toString() + window.location.hash;
      window.history.pushState({path: newurl}, '', newurl);
    }
  }

  function removeUrlParameter(paramKey) {
    const url = window.location.href
    var r = new URL(url)
    r.searchParams.delete(paramKey)
    const newUrl = r.href
    window.history.pushState({ path: newUrl }, '', newUrl)
  }


  function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}





})();
