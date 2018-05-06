var linkForm = document.querySelector(".write-us-link");
var popupForm = document.querySelector(".modal-write-us");
var closeForm = popupForm.querySelector(".modal-close");
var form = popupForm.querySelector("form");
var userName = popupForm.querySelector("[name=name]");
var userEmail = popupForm.querySelector("[name=email]");
var userText = popupForm.querySelector("[name=text]");
var linkMap = document.querySelector(".contacts-map");
var popupMap = document.querySelector(".modal-map");
var closeMap = popupMap.querySelector(".modal-close");
var isStorageSupport = true;
var storage = {
  name: "",
  email: ""
};

try {
  storage.name = localStorage.getItem("userName");
  storage.email = localStorage.getItem("userEmail");
} catch (err) {
  isStorageSupport = false;
}
if(linkForm) {
  linkForm.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupForm.classList.add("modal-show");
    if (storage.name) {
      userName.value = storage.name;
      if (storage.email) {
        userEmail.value = storage.email;
        userText.focus();
      } else {
        userEmail.focus();
      };
    } else {
      userName.focus();
    }
  });
}
closeForm.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupForm.classList.remove("modal-show");
  popupForm.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!userName.value || !userEmail.value || !userText.value) {
    evt.preventDefault();
    popupForm.classList.remove("modal-error");
    popupForm.offsetWidth = popupForm.offsetWidth;
    popupForm.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("userName", userName.value);
      localStorage.setItem("userEmail", userEmail.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popupForm.classList.contains("modal-show")) {
      popupForm.classList.remove("modal-show");
      popupForm.classList.remove("modal-error");
    }
    if (popupMap.classList.contains("modal-show")) {
      popupMap.classList.remove("modal-show");
    }
  }
});

if(linkMap) {
  linkMap.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupMap.classList.add("modal-show");
  });
}

closeMap.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupMap.classList.remove("modal-show");
});

var sliders = document.querySelectorAll(".slider-item");
if(sliders.length !== 0 ) {
  var slidersNav = document.querySelector(".slider-nav");
  var activeSlider = document.querySelector(".slider-show");
  var sliderLinkWrapper = activeSlider.querySelector(".slider-link-wrapper");
  document.querySelector(".slider-nav").remove;
  sliderLinkWrapper.appendChild(slidersNav);

  slidersNav.addEventListener("click",function(evt){
    var target = evt.target;
    if(target.classList.contains("slider-checkbox")) {
      document.querySelector(".slider-nav").remove();
      var slideNum = target.id.split('-')[1];
      for(var j = 0; j < sliders.length; j++) {
        sliders[j].classList.remove("slider-show");
      }
      sliders[slideNum-1].classList.add("slider-show");
      activeSlider = sliders[slideNum-1];
      sliderLinkWrapper = activeSlider.querySelector(".slider-link-wrapper");
      sliderLinkWrapper.appendChild(slidersNav);
      slidersNav.querySelector("input:checked").focus();
    }
  });
}
var services = document.querySelectorAll(".services-description > div");
if(services.length !== 0) {
  var servicesNav = document.querySelector(".services-nav");
  var servicesTab = document.querySelectorAll(".services-tab");

  servicesNav.addEventListener("click",function(evt){
    evt.preventDefault();
    var target = evt.target;
    if(target.classList.contains("services-link")) {
      var parentLi = target.parentElement;
        for(var j = 0; j < services.length; j++) {
          services[j].classList.remove("service-show");
          servicesTab[j].classList.remove("current");
        }
        var serviceDescriptionSelector = ".services-description-" + target.id.split('-')[0];
        var serviceDescriptionBlock = document.querySelector(serviceDescriptionSelector);
        serviceDescriptionBlock.classList.add("service-show");
        parentLi.classList.add("current");
    }
  });
}

var line = document.querySelector(".price-controls");
if(line) {
  var bar = document.querySelector(".bar");
  var minPrice = document.querySelector("input[name='min-price']");
  var maxPrice = document.querySelector("input[name='max-price']");
  var point1 = document.querySelector(".range-toggle-min");
  var point2 = document.querySelector(".range-toggle-max");
  var coordsLine = line.getBoundingClientRect();
  var maxPriceValue = 9000;
  var pixelPriceValue = maxPriceValue/line.clientWidth;
  var downTarget = "";
  var mouseDown = function(evtDown){
    downTarget = evtDown.target;
    var shiftX = evtDown.clientX - downTarget.getBoundingClientRect().left;
    var mouseMove = function(evtMove){
      minPrice.style.pointerEvents = "none";
      maxPrice.style.pointerEvents = "none";
      var coordsPoint1 = point1.getBoundingClientRect();
      var coordsPoint2 = point2.getBoundingClientRect();
      var minPoint1X = coordsLine.left - coordsPoint1.width/2;
      var minPoint1Left = minPoint1X - coordsLine.left;
      var maxPoint1X = coordsPoint2.left - coordsPoint1.width;
      var minPoint2X = coordsPoint1.left + coordsPoint1.width;
      var minPoint2Left = minPoint2X - coordsLine.left;
      var maxPoint2X = coordsLine.right - coordsPoint2.width/2;
      var cursorX = evtMove.clientX - shiftX;
      var movePoint = function(minX, minLeft, maxX, point) {
          if(cursorX >= minX && cursorX <= maxX) {
            downTarget.style.left = cursorX - coordsLine.left + "px";
          }
          if(cursorX < minX) {
            downTarget.style.left = minLeft + "px";
          }
          if(cursorX > maxX) {
            downTarget.style.left = maxX  - coordsLine.left - 2 + "px";
          }
          bar.style.left = point1.offsetLeft + coordsPoint1.width/2 + "px";
          bar.style.width = point2.offsetLeft - point1.offsetLeft + "px";
      }
      if(downTarget.classList.contains("range-toggle-min")) {
        movePoint(minPoint1X, minPoint1Left, maxPoint1X, point1);
      }
      if(downTarget.classList.contains("range-toggle-max")) {
        movePoint(minPoint2X, minPoint2Left, maxPoint2X, point2);
      }
      minPrice.value = (point1.offsetLeft - minPoint1Left) * pixelPriceValue;
      maxPrice.value = (point2.offsetLeft + point2.offsetWidth/2) * pixelPriceValue;
    }
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", function(){
      downTarget = "";
      document.removeEventListener("mousemove", mouseMove);
      minPrice.style.pointerEvents = "auto";
      maxPrice.style.pointerEvents = "auto";
    });
  }
  line.addEventListener("mousedown",mouseDown);
  line.ondragstart = function() {
    return false;
  };
}
