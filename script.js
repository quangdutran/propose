
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
  sendMessage("Access detected from " + checkBrowser())
});

function checkBrowser() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var fullVersion  = ''+parseFloat(navigator.appVersion); 
    var majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
      browserName = "Opera";
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
      browserName = "Microsoft Internet Explorer";
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
      browserName = "Chrome";
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
      browserName = "Safari";
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
      browserName = "Firefox";
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
              (verOffset=nAgt.lastIndexOf('/')) ) 
    {
    browserName = nAgt.substring(nameOffset,verOffset);
    fullVersion = nAgt.substring(verOffset+1);
    if (browserName.toLowerCase()==browserName.toUpperCase()) {
      browserName = navigator.appName;
    } }
    return browserName + " " + navigator.appname
}

function sendMessage(message) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://dutq-send-message-app.herokuapp.com/message", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      message: message
  }));
}

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
    sendMessage("No clicked")
  } else {
    rainHeart();
    sendMessage("Yes clicked")
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
