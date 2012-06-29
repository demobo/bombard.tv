try {
  var port = chrome.extension.connect({name: 'scripts'});
} catch(e) {
  console.error('CAUGHT ERROR:', e);
}

function connect() {
	port.postMessage({cmd: 'connect'});
}
function disconnect() {
	port.postMessage({cmd: 'disconnect'});
}
function init() {
	port.postMessage({cmd: 'init'});
}

function handleBackgroundEvent(e) {
	if (!bombard.yt_player) bombard.yt_player = getFGWindow().yt.getConfig('PLAYER_REFERENCE');
	switch (e.type) {
		case 'phone_textchange':
			var obj = jQuery('#bombardComment');
			obj.text(e.value.toUpperCase());
			if (obj.effect) obj.effect('bounce', { times: 2 }, 50);
			break;
		case 'phone_textreturn':
			var obj = jQuery('#bombardComment');
			obj.animate( {
				right : '110%',
			}, 5000, function() {
				obj.remove();
				window.bombardComment = document.createElement('div');
				bombardComment.setAttribute('id', 'bombardComment');
				document.body.appendChild(bombardComment);
			});
			break;
		case 'phone_button':
		    var PLAYING = 1;
		    if (bombard.yt_player.getPlayerState()==PLAYING)
		    {
		    	bombard.yt_player.pauseVideo();
		    }
		    else
		    {
		    	bombard.yt_player.playVideo();
		      bg_worker();
		    }
			break;
		case 'phone_input':
			handleInputEvent(e);
			break;
	}
}
function handleInputEvent(e) {
  console.log(e.source);
	switch (e.source) {
		case 'commentItem':
			console.log(e.value);
			break;
		case 'videoItem':
			if (!bombard.unsafeWindow)
			{
			    bombard.unsafeWindow = getFGWindow();
			}
			console.log(e.value);
			bombard.unsafeWindow.location = 'watch?v='+e.value;
			setTimeout(renderBombardBackground,5000);
			break;
		case 'slider1':
			animateInput(e.value);
			bombard.yt_player.setVolume(e.value);
			break;
		case 'bombardToggle':
		    if (e.value=='yes'){
		    	localStorage.setItem('bombard_background','1');
		    }else{
		    	localStorage.setItem('bombard_background','0');
		    }
	      	renderBombardBackground();
			break;
		case 'play_button':
			renderPlayPause();
			break;
		case 'screen_button':
			if (!document.querySelectorAll('#watch-player')[0].style.zoom) document.querySelectorAll('#watch-player')[0].style.zoom = 1.5;
			else document.querySelectorAll('#watch-player')[0].style.zoom = "";
			break;
		case 'bombard_button':
      var c = jQuery('#live-comment');
      if (c.length==1)
      {
         var time = bombard.yt_player.getCurrentTime();
         youtubePost(parseInt(time/60)+':'+parseInt(time%60)+' ' + document.getElementById('live-comment').innerHTML);
         c.animate(
         {
          'right' : '-20%',
          'top' : '150px',
          'zoom' : '0.5'
         }, 
         2000
         , 
         function(){
           setTimeout(
            function(){
              c.animate(
              {
                'right':'200%'
              },8000, function(){ c.remove();});
            }, 500);
         }
         );
      }
			break;
		case 'comment':
	    var c = document.getElementById('live-comment');
      console.log(c);
	    if (!c){
	      c = document.createElement('table');
	      c.setAttribute('id','live-comment');
	      document.getElementById('centerDivWrapper').appendChild(c);
	    }
  	  c.innerHTML = e.value;
      console.log(e.value);
			break;
	}
}

function animateInput(info)
{
  var videoWindow = document.querySelector('#watch-player > embed');
  var pos = getAbsPosition(videoWindow);
  if(jQuery('#infoDiv').length>0)
  {
    jQuery('#infoDiv').remove();
  }
// switch (info)
// {
// case:'play'
// case:'pause'
// default:
      var infoDiv = document.createElement('div');
      infoDiv.setAttribute('id','infoDiv');
      infoDiv.style.top = (pos.top+parseInt(videoWindow.height)/2-50)+'px';
      infoDiv.style.left = (pos.left+parseInt(videoWindow.width)/2-50)+'px';
      infoDiv.innerHTML = '<div>'+info+'</div>';
      document.body.appendChild(infoDiv);
      jQuery('#infoDiv').animate({'opacity':0}, 2000, function(){jQuery('#infoDiv').remove();});
// }
}