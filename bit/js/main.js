if ($(window).width() < 768)
    $('.js-accordion').each(function () {

    var $items = $(this).find('.js-accordion-el');
    var $buttons = $(this).find('.js-accordion-btn');
    var toogle = 0;

    $buttons.each(function (i, btn) {

        $(btn).click(function () {
            if (!$(this).hasClass('tariffs__button--active') && toogle == 0) {

                toogle = 1; //защита от быстрых кликов

                //Меняем состояние кнопки
                $buttons.removeClass('tariffs__button--active');
                $(this).addClass('tariffs__button--active');

                //Прячем все раскрытые элементы
                $items.removeClass('tariffs-item--active');
                $items.not($items.eq(i)).slideUp().promise().done(function () {
                    //показываем нужный блок в аккордионе ПОСЛЕ скрытия ненужных
                    $items.eq(i).slideDown();
                    $items.eq(i).addClass('tariffs-item--active');
                    toogle = 0;
                });;
            }
        });
    });
});

$('.js-anchors').each(function () {

    var $anchors_wrapper = $(this);
    //var $anchor = $anchors_wrapper.find('.js-anchor');
    var $anchor = $(document).find('.js-anchor');
    var $anchor_object = $('.js-anchor-object');
    $(window).on('scroll', function () {

        // фиксим якоря вверху экрана
        $('.anchors-wrapper').addClass('is-fixed');

        $anchor_object.each(function () {
            var anchors_bottom = $(window).scrollTop();

            // выделяем активный якорь в соответствии с тем блоком, который вверху экрана
            if (anchors_bottom >= $(this).offset().top && anchors_bottom < $(this).offset().top + $(this).height()) {
                $anchor.removeClass('is-active');
                $anchor.filter('[data-anchor="' + $(this).attr('data-anchor-object') + '"]').addClass('is-active');
            }
            if (anchors_bottom <= $anchor_object.eq(0).offset().top) {
                $anchor.removeClass('is-active');
            }
        });
    });

    $anchor.each(function () {

        // при клике по якорю проматываем к соответствующему блоку
        $(this).on('click', function (e) {
            e.preventDefault();
            if ($('.anchors').hasClass('topdown')) {
                $('.js-anchors-wrapper').fadeOut(100, "linear").closest('.anchors').removeClass('topdown');
            }
            $('body,html').animate({ scrollTop: $anchor_object.filter('[data-anchor-object="' + $(this).attr('data-anchor') + '"]').offset().top  - ($(window).width()>=1200 ? $anchors_wrapper.height():0) }, 1000);

        });
    });
});

var carouselContainer = document.querySelector('.team__slider-container');
var carouselElements = document.querySelectorAll('.team__wrapper');
var prevButton = document.querySelector('.team__button--back');
var nextButton = document.querySelector('.team__button--forward');
var carouselElementLeft = document.querySelector('.team__wrapper--before');
var carouselElementCenter = document.querySelector('.team__wrapper--active');
var carouselElementRight = document.querySelector('.team__wrapper--after');

console.log(carouselElements);


var moveRight = function (list) {
  for (var i = 0; i < list.length; i++ ) {
    if (list[list.length - 1].classList.contains('team__wrapper--after')) {
      console.log('end');
      return;
    }
    if (list[i].classList.contains('team__wrapper--before')) {
      list[i].classList.remove('team__wrapper--before');
      list[i+1].classList.remove('team__wrapper--active');
      list[i+1].classList.add('team__wrapper--before');

      list[i+2].classList.remove('team__wrapper--after');
      list[i+2].classList.add('team__wrapper--active');

      list[i+3].classList.add('team__wrapper--after');
      return;
    }

  }
};

var moveLeft = function (list) {
  for (var i = 0; i < list.length; i++ ) {
    if (list[0].classList.contains('team__wrapper--before')) {
      console.log('begin');
      return;
    }
    if (list[i].classList.contains('team__wrapper--before')) {

      list[i].classList.remove('team__wrapper--before');
      list[i].classList.add('team__wrapper--active');

      list[i-1].classList.add('team__wrapper--before');

      list[i+1].classList.remove('team__wrapper--active');
      list[i+1].classList.add('team__wrapper--after');

      list[i+2].classList.remove('team__wrapper--after');
      return;
    }

  }
};

nextButton.addEventListener('click', function() {
  console.log('next click');
  //carouselContainer.style['transform'] = 'translateX(-290px)';
  carouselElements = document.querySelectorAll('.team__wrapper');
  moveRight(carouselElements);
});

prevButton.addEventListener('click', function() {
  carouselElements = document.querySelectorAll('.team__wrapper');
  moveLeft(carouselElements);
});

$(document).ready(function () {
    window.jQuery || document.write('<script src="js/libs/jquery-3.2.1.min.js"><\/script>');
});

var navToggle = document.querySelector(".main-nav__toggle");
var navClose = document.querySelector(".main-nav__close");
var navMain = document.querySelector(".main-nav");
var formSubmit = document.querySelectorAll(".form__submit");
var orderPopup = document.querySelector(".order-call__link");
var popupCall = document.querySelector(".popup--call");
var overlay = document.querySelector(".overlay");
var popupInfo = document.querySelector(".popup--info");
var popupAgreement = document.querySelector(".popup--agreement");
var tariffs = document.querySelectorAll(".tariffs-item__button");
var howWorkButton = document.querySelector(".how-work__button");
var agreementLink = document.querySelector(".form__personal-info--span");
//открытие закрытие мобильного меню
navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    navToggle.blur();
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    navToggle.blur();
  }
});

//открытие закрытие попапов на формах
for(var i = 0; i < formSubmit.length; i++) {
  formSubmit[i].addEventListener('click', function(evt) {
    evt.preventDefault();
    showPopup("info");
  });
}

//открытие закрытие попапа на кнопке "заказать звонок"
orderPopup.addEventListener('click', function(evt) {
  evt.preventDefault();
  showPopup("call");
});

//открытие закрытие попапа на кнопке "Оставить заявку" в блоке тарифы
for(var i = 0; i < tariffs.length; i++) {
  tariffs[i].addEventListener('click', function(evt) {
    evt.preventDefault();
    var title = evt.target.parentNode.querySelector(".tariffs-item__title").textContent;

    console.log(title);
    showPopup("tarrif", title);
  });
}

//открытие закрытие попапа на кнопке "Сделать первый шаг" в блоке "как мы работаем"
howWorkButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  showPopup("call");
});

agreementLink.addEventListener('click', function(evt) {
  evt.preventDefault();
  showPopup("agreement");
});

//функция показа попапа в зависимости от параметра
var showPopup = function(popupType, titleSpanText) {
  var popup;
  if (popupType === "call") {
    popup = popupCall;
  }

  if (popupType === "tarrif") {
    popup = popupCall;
    popup.classList.add("popup--tarrif");
    popupInfo.classList.add("popup--tarrif-info");
    var titleSpan = popup.querySelector(".popup__tarrif-title--selected");
    titleSpan.textContent = titleSpanText;
    var titleSpanInfo = popupInfo.querySelector(".popup__tarrif-title--selected");
    titleSpanInfo.textContent = titleSpanText;
    var popupInfoTitle = popupInfo.querySelector(".popup__title");
    popupInfoTitle.innerHTML = "Спасибо за Вашу заявку!<br> Вы сделали хороший выбор!";
    if (titleSpanText === "Система продаж") {
      popupInfoTitle.innerHTML = "Спасибо за Вашу заявку!<br> Вы выбрали самый выгодный тариф и Вы не пожалеете!";
    }

  }

  if (popupType === "info") {
    popup = popupInfo;
  }

  if (popupType === "agreement") {
    popup = popupAgreement;
  }

  popup.classList.add("popup--show");
  overlay.classList.add("overlay--active");
  var closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener('click', function() {
    popup.classList.remove("popup--show");
    popup.classList.remove("popup--tarrif");
    popupInfo.classList.remove("popup--tarrif-info");
    overlay.classList.remove("overlay--active");
  });
};

$('.js-portfolio-filter').each(function () {

    var $btns = $(this).find('.js-portfolio-filter-item');
    var $items = $(this).find('.js-portfolio-filter-object');
    var $showMoreBtn = $(this).find('.js-portfolio-view-more');
    var count = getVisibleBlocksCount($items);
    var firstCount = count;

    $btns.each(function () {
        $(this).on('click', function () {
            if ($(this).attr('data-portfolio') == 'all') {
                $items.not($items.slice(0, count)).hide();  //прячем все лишние элементы
                var i = 0;
                var animate = setTimeout(function run() {
                    if (i != count) {
                        $items.eq(i).show(100);
                        i++;
                    }
                    else {
                        count == $items.length ? $showMoreBtn.hide() : $showMoreBtn.show(); //скрываем или показываем кнопку в зависимости от кол-ва элементов
                        return clearTimeout(animate);
                    }
                    setTimeout(run, 0);
                }, 0);
            }
            else {
                var i = 0;
                $items.show(); //нужна видимость для полного фильтра, иначе выберутся только видимые элементы 
                var showArray = $items.filter('[data-portfolio-object="' + $(this).attr('data-portfolio') + '"]');  //нужные элементы
                var animate = setTimeout(function run() {
                    if (i != $items.length - showArray.length) {
                        $items.not(showArray).eq(i).hide(100); //скрываем ненужные элементы
                        i++;
                    }
                    else {
                        getVisibleBlocksCount($items) > firstCount ? $showMoreBtn.hide() : $showMoreBtn.show(); //скрываем или показываем кнопку в зависимости от кол-ва элементов
                        return clearTimeout(animate);
                    }
                    setTimeout(run, 10);
                }, 0);
            }
        });
    });

    $showMoreBtn.click(function () {
        for (i = 0; i != count + firstCount / 2; i++) {
            $items.eq(i).show();  //показываем элементы по умолчанию + раскрываем еще один ряд
        }
        count = getVisibleBlocksCount($items); 
        if (count == $items.length) {
            $(this).hide();  //скрываем кнопку, когда показали все ряды
        }
    });

});

function getVisibleBlocksCount(items) {
    var count = 0;
    items.each(function () {
        if ($(this).css('display') != 'none') count++;  //количество блоков по умолчанию
    });
    return count;
};

$(".select").each(function () {
  var $selectBlock = $(this);
  var $current = $(".select__current", $selectBlock);

  $selectBlock.on("click", function (evt) {
    if (evt.target === $current[0]) {
      if (!$selectBlock.hasClass("select--active")) {
        $(".select__list", $selectBlock).slideDown(200);
        $selectBlock.addClass("select--active");
      } else {
        $(".select__list", $selectBlock).slideUp(200);
        $selectBlock.removeClass("select--active");
      }
    }
  });

  //выбираем элементы списка
  $(".select__item", $selectBlock).each(function () {
    var $selectedButton = $(this);

    //клик по элементу списка
    $selectedButton.on("click", function () {
      //копируем текст из выбранного элемента списка в верхний
      $current.val($selectedButton.text());
      //закрываем список
      //$selectBlock.removeClass("select--active");
      $(".select__list", $selectBlock).slideUp(200);
      $selectBlock.removeClass("select--active");
    });
  });

  //закрываем список при клике вне списка
  $(document).on("click", function (evt) {
    if($selectBlock.has(evt.target).length === 0 && $selectBlock.hasClass("select--active")) {
      //$selectBlock.removeClass("select--active");
      $(".select__list", $selectBlock).slideUp(200);
      $selectBlock.removeClass("select--active");
    }
  });
});

if ($(window).width() > 767)
    $('.js-tariffs').each(function () {

    var $items = $(this).find('.js-tariffs-el');
    var $button = $(this).find('.js-tariffs-btn');
    var allLines = $items.eq(0).children().length;
    var showHideLines = 5; //сколько оставим строк при скрытии 

    $items.each(function () {
        $(this).height(showHideLines * $(this).find(">:first-child").outerHeight()); //изначальное состояние скрытности
    });

    $button.on('click', function () {
        if ($(this).hasClass('js-show')) {
            $items.each(function () {
                $(this).animate({ height: allLines * $(this).find(">:first-child").outerHeight() }, 300); //показываем все строки
            });
            $(this).removeClass('js-show').text('- СКРЫТЬ ОПЦИИ');
        }
        else {
            $items.each(function () {
                $(this).animate({ height: showHideLines * $(this).find(">:first-child").outerHeight() }, 300); //скрываем до нужного количества строк
            });
            
            $('body,html').animate({
                scrollTop: $items.eq(0).children().eq(showHideLines).offset().top //скролл при скрытии чтобы не было скачка
            });
            $(this).addClass('js-show').text('+ ПОКАЗАТЬ ОПЦИИ');
        }
    });
});
