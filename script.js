
function autoType(elementClass, typingSpeed){
  var thhis = $(elementClass);
  thhis.css({
    "position": "relative",
    "display": "inline-block"
  });
  thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
  thhis = thhis.find(".text-js");
  var text = thhis.text().trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  thhis.text("|");
  setTimeout(function(){
    thhis.css("opacity",1);
    thhis.prev().removeAttr("style");
    thhis.text("");
    for(var i = 0; i < amntOfChars; i++){
      (function(i,char){
        setTimeout(function() {        
          newString += char;
          thhis.text(newString);
        },i*typingSpeed);
      })(i+1,text[i]);
    }
  },1500);
}

$(document).ready(function(){  
  autoType(".type-js",200);
});

function handleButtons(input) {
  if (input.innerHTML === "Nope") {
    var buttons = $(".mybutton");
    for (var button of buttons) {
        if (button.innerHTML === "Nope") {
          button.innerHTML = "Hell Yeah";
        } else {
          button.innerHTML = "Nope";
        }
    }
  } else {
    rainHeart();
  }
}

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function rainHeart() {

  document.getElementById("overlay").style.display = "block";
  const back = document.getElementById("back");
  back.style.cssText += 'filter: blur(2px);-webkit-filter: blur(4px);';

  setInterval(function(){
    var screenHeight = $(document).height();
    var screenWidth = $(document).width();

    var startLeft = getRandomArbitrary(0,screenWidth);

    var timeRun = getRandomArbitrary(4000,6000);
    var opacityR = Math.random() * (1 - 0.2) + 0.2;
    var sizeR = getRandomArbitrary(5,20);

    var endLeft = getRandomArbitrary(startLeft-100,startLeft+100);

    var overlay = document.getElementById("overlay");
    var snow = document.createElement('span');

    $(snow).addClass('snow-item fa fa-heart').css({
      'position'  : 'absolute',
      'z-index'   : 'auto',
      'color'     : '#ff0000',
      'display'   : 'block',
      'top'       : 0,
      'left'      : startLeft,
      'opacity'   : opacityR,
      'font-size' : sizeR+'px'
    })
      .appendTo(overlay)
      .animate({
      'top'       : screenHeight-sizeR,
      'left'      : endLeft
    },{
      duration : timeRun,
      easing : 'linear',
      complete:function(){
        $(this).fadeOut('fast',function(){
          $(this).remove();
        });
      }
    });

  },500);

  
}