'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var X_LEFT = 50;
var X_RIGHT = 1150;
var Y_TOP = 130;
var Y_BOTTOM = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ADS_QUANTITY = 8;

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var generateNumberInRange = function (max, min) {
  if (min === undefined) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var takeRandomElement = function (array) {
  return array[(generateNumberInRange(array.length - 1))];
};

var generateAdsData = function (quantity) {
  var ads = [];
  for (var i = 0; i < quantity; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: takeRandomElement(TYPES)
      },
      location: {
        x: generateNumberInRange(X_RIGHT, X_LEFT),
        y: generateNumberInRange(Y_BOTTOM, Y_TOP)
      }
    };
    ads.push(ad);
  }
  return ads;
};

var generatedAdsData = generateAdsData(ADS_QUANTITY);

map.classList.remove('map--faded');

var renderAds = function (adsData) {
  var adElements = document.createDocumentFragment();
  for (var i = 0; i < adsData.length; i++) {
    var adElement = pinTemplate.cloneNode(true);
    adElement.style.left = adsData[i].location.x - (PIN_WIDTH / 2) + 'px';
    adElement.style.top = adsData[i].location.y - PIN_HEIGHT + 'px';
    adElement.querySelector('.map__pin img').src = adsData[i].author.avatar;
    adElement.querySelector('.map__pin img').alt = adsData[i].offer.type;
    adElements.appendChild(adElement);
  }
  return adElements;
};

var AdsOnMap = renderAds(generatedAdsData);

mapPins.appendChild(AdsOnMap);
