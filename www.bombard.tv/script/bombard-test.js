if (typeof bombardLoading=='undefined'){
  if (typeof bombarder!='undefined'){
    bombardLoading=1;
    removeBombardElements();
    bombarder=undefined;
    bombardLoading=undefined;
  }else{
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
    
    function loadCSS(){
    //  console.log('jquery loaded, here at loadCSS');
      var l = document.createElement('link');
      l.setAttribute('rel', 'stylesheet');
      l.setAttribute('type', 'text/css');
      l.setAttribute('href', 'http://localhost:1237/css/bombard.css');
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
      s.src = 'http://localhost:1237/script/jquery.pause.min.js';
      s.onload = loadAnimation;
      document.body.appendChild(s);
    }
    
    function loadAnimation(){
    //  console.log('jQueryPause loaded, here at loadAnimation');
      var s = document.createElement('script');
      s.src = 'http://localhost:1237/script/animation.js';
      s.onload = loadUtil;
      document.body.appendChild(s);
    }
    
    function loadUtil(){
    //  console.log('animation loaded, here at loadUtil');
      var s = document.createElement('script');
      s.src = 'http://localhost:1237/script/util.js';
      s.onload = loadRPC;
      document.body.appendChild(s);
    }
    
    function loadRPC(){
    //  console.log('util loaded, here at loadRPC');
      var s = document.createElement('script');
      s.src = 'http://localhost:1237/script/rpc.js';
      s.onload = loadMessaging;
      document.body.appendChild(s);
    }
    
    function loadMessaging(){
    //  console.log('rpc loaded, here at loadMessaging');
      var s = document.createElement('script');
      s.src = 'http://localhost:1237/script/messaging.js';
      s.onload = loadMain;
      document.body.appendChild(s);
    }
    
    function loadMain(){
    //  console.log('messaging loaded, here at loadjQueryPause');
      var s = document.createElement('script');
      s.src = 'http://localhost:1237/script/main.js';
      document.body.appendChild(s);
    }
  }
}
