var writeUsPopup = document.querySelector(".modal-write-us");
var mapPopup = document.querySelector(".modal-map");
var cartPopup = document.querySelector('.modal-cart');

var writeUs = document.querySelector('.contacts .button');
var form = document.querySelector('.modal-write-us form');
var nameField = document.querySelector('#user-name');
var emailField = document.querySelector('#user-email');
var commentField = document.querySelector('#user-comment');

var map = document.querySelector('.contacts a:first-of-type');

var addToCartButtons = document.querySelectorAll('.item-cover a');

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

var tabsLink = document.querySelectorAll('.services-item a');
var currentTab = document.querySelector('.services-item .active');

var currentSlide = 0;
var slides = document.querySelectorAll(".offers-slider section");
var radio = document.querySelectorAll(".slider-controls i");

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (e) {
  isStorageSupport = false;
}

var openModal = function (button, modal) {
  button.addEventListener("click", function (evt) {
    evt.preventDefault();
    modal.classList.add("modal-show");
    if (modal === writeUsPopup) {
      formValidate(writeUsPopup);
    }
    closePopup();
  });
};

var formValidate = function (modal) {
  nameField.focus();
  if (storageName) {
    nameField.value = storageName;
    emailField.focus();
  }
  if (storageEmail) {
    emailField.value = storageEmail;
    commentField.focus();
  }
  if (!storageName && storageEmail) {
    nameField.focus();
  }
  form.addEventListener("submit", function (evt) {
    if (!nameField.value || !emailField.value) {
      evt.preventDefault();
      modal.classList.remove("modal-error");
      modal.offsetWidth = modal.offsetWidth;
      modal.classList.add("modal-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("name", nameField.value);
        localStorage.setItem("email", emailField.value);
      }
    }
  });
};

var closePopup = function () {
  var closePopup = document.querySelector(".modal-show .modal-close");
  var popup = document.querySelector(".modal-show");

  closePopup.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.classList.remove("modal-show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      popup.classList.remove("modal-error");
      popup.classList.remove("modal-show");
    }
  });

  if (popup === cartPopup) {
    var returnToShopping = document.querySelector(".modal-cart .button-white");

    returnToShopping.addEventListener("click", function (evt) {
      evt.preventDefault();
      popup.classList.remove("modal-show");
    });
  }
};

if (writeUs) {
  openModal(writeUs, writeUsPopup);
}

if (map) {
  openModal(map, mapPopup);
}

if (tabsLink) {
  tabsLink.forEach(function (elem) {
    elem.addEventListener("click", function (evt) {
      elem.classList.add('active');
      if (currentTab !== elem) {
        currentTab.classList.remove('active');
        currentTab = elem;
      }
    });
  });
}

if (addToCartButtons) {
  addToCartButtons.forEach(function (button) {
    openModal(button, cartPopup);
  });
}

if (slides) {
  var nextSlide = function () {
    var next = currentSlide + 1;
    showSlides(next);
  };

  var previousSlide = function () {
    var previous = currentSlide - 1;
    showSlides(previous);
  };

  var showSlides = function (number) {
    if (number > slides.length - 1) {
      number = 0;
    } else if (number < 0) {
      number = slides.length - 1;
    } else if (number === currentSlide) {
      return;
    }
    slides[number].classList.add("active");
    slides[currentSlide].classList.remove("active");
    radio[number].classList.add("active");
    radio[currentSlide].classList.remove("active");
    currentSlide = number;
  };
}
