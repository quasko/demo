var linkModal = document.querySelector(".page-header__call-order");
var modalBlock = document.querySelector(".modal");
var form = document.querySelector(".form");
var inputs = form.querySelectorAll("input");
var submitButton = form.querySelector(".modal__submit");
var closeModal = modalBlock.querySelector(".modal__close");
var phoneInput = form.querySelector(".form__input--phone");
var overlay = document.querySelector(".overlay");

linkModal.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalBlock.classList.add("modal--show");
  overlay.classList.add("overlay--active");
});

closeModal.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalBlock.classList.remove("modal--show");
  overlay.classList.remove("overlay--active");
});

overlay.addEventListener("click", function(evt) {
  modalBlock.classList.remove("modal--show");
  overlay.classList.remove("overlay--active");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modalBlock.classList.contains("modal--show")) {
      modalBlock.classList.remove("modal--show");
      overlay.classList.remove("overlay--active");
    }
  }
});

var setCursorPosition = function(pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
};

var mask = function(event) {
  var matrix = this.defaultValue,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
        def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function(a) {
        return val.charAt(i++) || "_"
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this);

};

phoneInput.addEventListener("input", mask, false);
for(var i=0; i<inputs.length; i++) {
  inputs[i].addEventListener("input", function () {
    if(this.checkValidity() == true) {
      this.classList.remove("form__input--invalid");
      this.classList.add("form__input--valid");
    } else {
      this.classList.remove("form__input--valid");
      this.classList.add("form__input--invalid");
    }
  })
}

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  var errors = form.querySelectorAll(".form__error");

    for(var i = 0; i < errors.length; i++) {
    errors[i].parentNode.removeChild(errors[i]);
  };

  for (var i = 0; i < inputs.length; i++) {
    if(inputs[i].checkValidity() == false) {
      var validity = inputs[i].validity;
      var error;

      if(inputs[i].classList.contains("form__input--name")) {
        error = "Введите имя";
      }
      if(inputs[i].classList.contains("form__input--email")) {
        error = "Введите email в формате address@domain.com";
      }
      if(inputs[i].classList.contains("form__input--phone")) {
        error = "Введите телефон в формате +7 (123) 456-78-99";
      }

      inputs[i].classList.add("form__input--invalid");
      inputs[i].insertAdjacentHTML("afterend","<p class='form__error'>" + error + "</p>");
      inputs[i].classList.add("form__input--invalid");
    }
  };
  var errorsCount = form.querySelectorAll(".form__error").length;

  if(errorsCount === 0) {
    var request = new XMLHttpRequest();
    var data = new FormData(form);

    request.open(form.method, form.action);
    request.send(data);
    request.onreadystatechange = function() {
      var DONE = 4;
      var OK = 200;
      if (request.readyState === DONE) {
        if (request.status === OK)
          console.log(request.responseText);
          cleanForm();
      } else {
      console.log('Error: ' + request.status);
      }
    };
  }
});

var cleanForm = function() {
  form.reset();
  var errors = form.querySelectorAll(".form__error");
  for(var i = 0; i < errors.length; i++) {
    errors[i].parentNode.removeChild(errors[i]);
  };

  for(var i = 0; i< inputs.length; i++) {
    inputs[i].classList.remove("form__input--valid");
    inputs[i].classList.remove("form__input--invalid");
  }
};

var menu = document.querySelector(".main-nav");
var body = document.querySelector("body");
var sections = document.querySelectorAll("section");
var menuItems = document.querySelectorAll(".main-menu__item");
var firstItem = document.querySelector(".main-menu__item:first-child");
var refElements = [];
var menuTopY = menu.offsetTop;

var links = document.querySelectorAll(".main-menu a[href*='#'");
var scrollSpeed = 0.5;

for(var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function(event) {
    event.preventDefault();
    var currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    var href = this.getAttribute("href");
    var targetY = document.querySelector(href).getBoundingClientRect().top;
    var start = null;
    var step = function(time) {
      if (start === null) start= time;
      var progress = time - start;
      var jump = (targetY < 0 ? Math.max(currentPosition - progress/scrollSpeed,currentPosition+targetY): Math.min(currentPosition + progress/scrollSpeed, currentPosition + targetY));
      window.scrollTo(0, jump);
      if (jump != currentPosition+targetY) {
        requestAnimationFrame(step);
      } else {
        location.hash = href;
      }
    }
    requestAnimationFrame(step);
  });
};

var scrollMenu = function() {
  var currentPosition = window.pageYOffset || document.documentElement.scrollTop;
  if (currentPosition > menuTopY) {
    menu.classList.add("main-nav--fixed");
  } else {
    menu.classList.remove("main-nav--fixed");
    firstItem.classList.add("main-menu__item--active");
  }

  for(var i=0; i<menuItems.length; i++) {
    menuItems[i].querySelector("a").blur();
    var href = menuItems[i].querySelector("a").getAttribute("href");
    var element = document.querySelector(href);
    var elementTop = element.offsetTop;
    var elementHeight = element.getBoundingClientRect().height;

    if(elementTop <= currentPosition && elementTop + elementHeight > currentPosition) {
      menuItems[i].classList.add("main-menu__item--active");
    } else {
      menuItems[i].classList.remove("main-menu__item--active");
    }

    if(currentPosition <= menuTopY) {
      firstItem.classList.add("main-menu__item--active");
    }
  };
};

window.addEventListener("scroll", scrollMenu);
