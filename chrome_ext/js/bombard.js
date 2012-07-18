function loadCSS(){
//  console.log('jquery loaded, here at loadCSS');
  var l = document.createElement('link');
  l.setAttribute('rel', 'stylesheet');
  l.setAttribute('type', 'text/css');
  l.setAttribute('href', 'http://www.bombard.tv/css/bombard.css');
  document.body.appendChild(l);
  loadjQueryUI();
}

function loadjQueryUI(){
//  console.log('css loaded, here at loadjQueryUI');
  var s = document.createElement('script');
  s.src = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js';
  s.onload = loadjQueryPause;
  document.body.appendChild(s);
}

function loadjQueryPause(){
//  console.log('jQueryUI loaded, here at loadjQueryPause');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/jquery.pause.min.js';
  s.onload = loadAnimation;
  document.body.appendChild(s);
}

function loadAnimation(){
//  console.log('jQueryPause loaded, here at loadAnimation');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/animation.js';
  s.onload = loadUtil;
  document.body.appendChild(s);
}

function loadUtil(){
//  console.log('animation loaded, here at loadUtil');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/util.js';
  s.onload = loadRPC;
  document.body.appendChild(s);
}

function loadRPC(){
//  console.log('util loaded, here at loadRPC');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/rpc.js';
  s.onload = loadMessaging;
  document.body.appendChild(s);
}

function loadMessaging(){
//  console.log('rpc loaded, here at loadMessaging');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/messaging.js';
  s.onload = loadMain;
  document.body.appendChild(s);
}

function loadMain(){
//  console.log('messaging loaded, here at loadjQueryPause');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/main.js';
  document.body.appendChild(s);
}

function deleteElementById(id){
  var elem = document.getElementById(id);
  elem.parentNode.removeChild(elem);
}

function deleteElementByPattern(pattern){
  var collection = document.querySelectorAll(pattern);
  var len = collection.length;
  for (i=0;i<len;i++){
    var elem = collection[i];
    elem.parentNode.removeChild(elem);
  }
}

function removeBombardElements(){
  bombard=undefined; 
  deleteElementById('textInput');
  deleteElementById('centerDivWrapper');
  deleteElementById('backgroundDiv');
  deleteElementByPattern('.animated-comment');
}


function toggleBombard(){
  console.log(localStorage.getItem('bombardLoading'));
  console.log(localStorage.getItem('bombarder'));
  if (!localStorage.getItem('bombardLoading')){
    if (!!localStorage.getItem('bombarder')){
      localStorage.setItem('bombardLoading',1);
      bombardLoading=1;
      clearInterval(localStorage.getItem('workerId'));
      removeBombardElements();
      localStorage.removeItem('bombardLoading');
      localStorage.removeItem('bombarder');
      bombarder=undefined;
      bombardLoading=undefined;
    }else{
      localStorage.setItem('bombardLoading',1);
      localStorage.setItem('bombarder',1);
      bombardLoading=1;
      bombarder=1;
      if (!window.jQuery) {
        var script = document.createElement('script');
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
        script.onload = loadCSS;
        document.body.appendChild(script);
      }else{
        loadCSS();
      }
    }
  }
}
console.log('sending');
chrome.extension.sendMessage('testing sendMessage');
console.log('finish sending request');

function onMessage(message, sender, sendResponse) {
  console.log('here at front end: '+message);
  if (message=='toggleBombard'){
    console.log(message);
    toggleBombard();
    sendResponse({});
  }
};

chrome.extension.onMessage.addListener(onMessage);

localStorage.removeItem('bombardLoading');
localStorage.removeItem('bombarder');
toggleBombard();



