try {
  var port = chrome.extension.connect({name: 'scripts'});
} catch(e) {
  console.error('CAUGHT ERROR:', e);
}
function sendSelection(string) {
  try {
    port.postMessage({'string': string});
  } catch(e) {
    console.error('CAUGHT ERROR when sending:' + string +  ' from page_scripts/message.js to background:');
    console.error(e);
  }
}
// TODO: demobo namespace
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
  //console.log(e);
//  var yt = jQuery('#testDiv')[0].onclick().yt;
  var yt = getFGWindow().yt;
  var player = yt.getConfig('PLAYER_REFERENCE');
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
    if (player.getPlayerState()==PLAYING)
    {
      player.pauseVideo();
    }
    else
    {
      player.playVideo();
      console.log(getYTComments(50));
      animateComment({});
    }
		break;
	case 'phone_input':
		break;
	}
}
