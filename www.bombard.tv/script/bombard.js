if (!window.jQuery) {
  var script = document.createElement('script');
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
  script.onload = loadjQueryUI;
  document.body.appendChild(script);
}else{
  loadjQueryUI();
}

function loadjQueryUI(){
  console.log('jquery loaded, here at loadjQueryUI');
  var s = document.createElement('script');
  s.src = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js';
  s.onload = loadjQueryPause;
  document.body.appendChild(s);
}

function loadjQueryPause(){
  console.log('jQueryUI loaded, here at loadjQueryPause');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/jquery.pause.min.js';
  s.onload = loadAnimation;
  document.body.appendChild(s);
}

function loadAnimation(){
  console.log('jQueryPause loaded, here at loadAnimation');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/animation.js';
  s.onload = loadUtil;
  document.body.appendChild(s);
}

function loadUtil(){
  console.log('animation loaded, here at loadUtil');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/util.js';
  s.onload = loadRPC;
  document.body.appendChild(s);
}

function loadRPC(){
  console.log('util loaded, here at loadRPC');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/rpc.js';
  s.onload = loadMessaging;
  document.body.appendChild(s);
}

function loadMessaging(){
  console.log('rpc loaded, here at loadMessaging');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/messaging.js';
  s.onload = loadMain;
  document.body.appendChild(s);
}

function loadMain(){
  console.log('messaging loaded, here at loadjQueryPause');
  var s = document.createElement('script');
  s.src = 'http://www.bombard.tv/script/main.js';
  s.onload = loadUtil;
  document.body.appendChild(s);
}
