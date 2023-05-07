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
