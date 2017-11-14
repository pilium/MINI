'use strict';

var images = document.images,
  imagesTotalCount = images.length,
  imagesLoadedCount = 0,
  preloader = document.getElementById('page-preloader'),
  persDisplay = document.getElementById('percentage');

for (var i = 0; i < imagesTotalCount; i++) {
  imageClone = new Image();
  imageClone.onload = imageLoaded;
  imageClone.onerror = imageLoaded;
  imageClone.src = images[i].src;
}

function imageLoaded() {
  imagesLoadedCount++;

  persDisplay.innerHTML = (( (100 / imagesTotalCount) * imagesLoadedCount ) << 0) + '%';

  if(imagesLoadedCount >= imagesTotalCount) {
    setTimeout(function() {
      if(!preloader.classList.contains('done')) {
        preloader.classList.add('done');
      }
    }, 500);
  }
}

$(function() {
  $('a').click(function(e) {
    e.preventDefault();
  });

  $('.tabs a').click(function() {
    $(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
    $(this).parent().siblings().removeClass('active');
    var id = $(this).attr('href');
    $(id).removeClass('hide');
    $(this).parent().addClass('active');
    return false;
  });

  $('.banner-slider, .testimonial-slider').slick({
    arrows: false,
    dots: true,
  });

  $('.portfolio-slider').slick({
    dots: true,
    appendArrows: '.portfolio-slider__buttons',
    prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>'
  });
});

function initMap() {
  var coordinates = {lat: -37.806006, lng: 144.961291}, // Координаты центра карты 
    markerImg = 'img/marker.png', //  Иконка для маркера  

    // создаем карту и настраеваем 
    map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      zoom: 16, // определяет первоначальный масштаб
      disableDefaultUI: true, // убирает элементы управления
      scrollwheel: false, // отключает масштабирование колесиком мыши (бывает полезно, если карта на всю ширину страницы и перебивает прокрутку вниз).

    });

  // маркер
  marker = new google.maps.Marker({
    position: coordinates, // координаты маркера 
    map: map, //  ставим маркер в карту с id map
    animation: google.maps.Animation.DROP, // анимация маркера DROP / BOUNCE
    icon: markerImg,
  });

}

// Запускаем карту при загрузки страницы
google.maps.event.addDomListener(window, 'load', initMap);
