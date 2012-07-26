function youtubePost(comment)
{
  //TODO: should use youtube api instead of haccking the current window
  if (!bombard.unsafeWindow)
  {
    bombard.unsafeWindow = getFGWindow();
  }

    bombard.unsafeWindow.document.querySelectorAll('.comments-textarea-label')[0].click();
    bombard.unsafeWindow.document.querySelectorAll('textarea.yt-uix-form-textarea.comments-textarea')[0].value=comment;
    bombard.unsafeWindow.document.querySelectorAll('.comments-post-buttons span.yt-uix-button-content')[0].click();
    return;
}

function setBombardBackground() {
  var videoWindow;
  switch (bombard.domain){
    case 'www.youtube.com':
	    videoWindow = document.querySelectorAll('#watch-player > embed')[0];
      videoWindow.style.zIndex = '1000';
      break;
    case 'localhost':
    case 'dev.demobo.com':
    case 'www.bombard.tv':
      videoWindow = jQuery('#ytPlayer')[0];
      videoWindow.parentNode.style.zIndex = '1000';
      break;
    default:
      break;
  }

  //the trick for extension to get Window outside its scope
	var testDiv = document.createElement('div');
	testDiv.setAttribute('id', 'testDiv');
	testDiv.setAttribute('onclick', 'return window;');

	// create a background div
	var backgroundDiv = document.createElement('div');
	backgroundDiv.setAttribute('id', 'backgroundDiv');
  localStorage.setItem('gb_bomb',1);
//	backgroundDiv.setAttribute('style',
//			'display:block;background-color:rgba(0,0,0,0.6);width:'
//					+ document.width + 'px;height:' + document.height
//					+ 'px;position:absolute;top:0px;z-index:999');
	// set the video window z-index

	// append the background div
	document.body.appendChild(backgroundDiv);
	document.body.appendChild(testDiv);
	//console.log('setBombardBackground finished');
	return 0;
}

function removeBombardElements(){
  bombard=undefined; 
  $('#textInput').remove();
  $('#centerDivWrapper').remove();
  $('#backgroundDiv').remove();
  $('.animated-comment').remove();
  $('.bbd-script').remove();
}

function toggleBackground() {
	var display = bombard.backgroundOn;
	if (display==1){ 
    bombard.backgroundOn = 0;
	}else{ 
    bombard.backgroundOn = 1;
  }  
	renderBombardBackground();
}
function renderBombardBackground() {
	var bDiv = jQuery('#backgroundDiv')[0];
	var display = bombard.backgroundOn;
	if (display==1) {
		bDiv.style.display = 'block';
		localStorage.setItem('gb_bomb',1);
//		bg_worker();
	} else {
		bDiv.style.display = 'none';
		jQuery('.animated-comment').remove();
		localStorage.setItem('gb_bomb',0);
	}
}
function renderPlayPause() {
	var PLAYING = 1;
    if (bombard.yt_player.getPlayerState()==PLAYING)
    {
      localStorage.setItem('gb_bomb',0);
    	animateInput('||');
    	bombard.yt_player.pauseVideo();
//    	jQuery('.animated-comment').pause();
    }
    else
    {
      localStorage.setItem('gb_bomb',1);
    	animateInput('&#x25b6;');
    	bombard.yt_player.playVideo();
//    	jQuery('.animated-comment').resume();
//    	bg_worker();
    }
}
// get the absolute position of an element. return an empty object if element is
// null
function getAbsPosition(element) {
	if (element) {
		var oLeft = 0;
		var oTop = 0;
		var o = element;
		do {
			oLeft += o.offsetLeft;
			oTop += o.offsetTop;
		} while (o = o.offsetParent);

		return {
			'left' : oLeft,
			'top' : oTop
		};
	} else {
		return {};
	}
}

// helper function
function getTimeFromPublished(timeStamp) {
	var pattern = /[\+\-A-Z\:\.]/g;
	return parseInt(timeStamp.replace(pattern, ''));
}

// get start time of a comment
function getStartTime(raw_comment) {
	var pattern = /[0-9]{1,2}\:[0-9]{2}/i;
	var time = raw_comment.content.match(pattern);
	if (!time) {
		return getTimeFromPublished(raw_comment.published);
	} else {
		var temp = time[0].split(':');
		return parseInt(temp[1]) + 60 * parseInt(temp[0]);
	}
}

function getFGWindow() {
	return jQuery('#testDiv')[0].onclick();
}

function getFBComments()
{
  //console.log('here at getFBComments');
	var ytplayer = bombard.yt_player;
	var videoDuration = parseInt(ytplayer.getDuration());
	var videoKey = getVideoId();

  var link = 'https://graph.facebook.com/search?q='+videoKey+'&type=post';

  function extractComment2(response) {
    return jQuery.map(response.data, function(entry, index){
      var raw_comment = {
        'published' : entry.created_time,
        'content' : entry.message
      };
      if (raw_comment.content){
			  if (raw_comment.content.length < 400) {
			  	var start = getStartTime(raw_comment) % videoDuration;
			  	if (bombard.c[start]) {
			  		bombard.c[start].push( {
			  			'text' : raw_comment.content,
              'source': 'FB'
			  		});
			  	} else {
			  		bombard.c[start] = [ {
			  			'text' : raw_comment.content,
              'source' : 'FB'
			  		} ];
			  	}
			  }
      }

    });
  }

  function getRawComments(){
      jQuery.ajax( {
				url :link, 
        dataType : 'json',
				async : true,
				success : extractComment2
			});
  }

  getRawComments();
}
// get YT comments for a specific video
function getYTComments(maxResults) {
	var ytplayer = bombard.yt_player;
	var videoDuration = parseInt(ytplayer.getDuration());
	var videoKey = getVideoId();

	// handler of youtube feed

	function extractComment2(data) {
		if (!data.feed.entry){
			return;
		}
		else{
			return jQuery.map(data.feed.entry, function(entry, index) {
				var raw_comment = {
					'published' : entry.published.$t,
					'content' : entry.content.$t
				};
				if (raw_comment.content.length < 300) {
					var start = getStartTime(raw_comment) % videoDuration;
					if (bombard.c[start]) {
						bombard.c[start].push( {
							'text' : raw_comment.content,
              'source' : 'YT'
						});
					} else {
						bombard.c[start] = [ {
							'text' : raw_comment.content,
              'source' : 'YT'
						} ];
					}
				}
			});
		}
	}

	function getRawComments() {
		for (startIndex = 1; startIndex <= maxResults; startIndex += 50) {
			jQuery.ajax( {
				url : youtubeLink(videoKey, startIndex, Math.min(50, maxResults
						- startIndex + 1)),
				dataType : 'json',
				async : true,
				success : extractComment2
			});
		}
	}

  getRawComments();
}

//get bombard comments
function getBBComments(maxResult){
  var ytplayer = bombard.yt_player;
	var videoDuration = parseInt(ytplayer.getDuration());

  RPC.loadComment(getVideoId(), maxResult, function (comments) {
    console.log(comments);
    jQuery.each(JSON.parse(comments), function(index, commentObj) {
      //assume the bombard comments are in the right format
      console.log('bbcomment: '+commentObj);
      var raw_comment = commentObj.comment;
      var temp = raw_comment.indexOf(']');
      var start = parseInt(raw_comment.substr(4, temp-4)) % videoDuration;
      var comment = raw_comment.substr(temp+1);
      
  		if (bombard.c[start]) {
  			bombard.c[start].push( {
  				'text' : comment,
          'source' : 'BB'
  			});
  		} else {
  			bombard.c[start] = [ {
  				'text' : comment,
          'source' : 'BB'
  			} ];
  		}
    });
  });
}


// query youtube once
function youtubeLink(key, start, max) {
	return 'https://gdata.youtube.com/feeds/api/videos/' + key
			+ '/comments?start-index=' + start + '&max-results=' + max
			+ '&alt=json';
}

function removeLink(text)
{
  var pattern = /http[\S]+youtube[\S]+/g;
  //console.log('@REMOVELINK '+text+'; '+text.replace(pattern, ''));
  return text.replace(pattern, '');
}

function animateFBComment(comment){
  if(!comment.text)
    return;
  comment.text = removeLink(comment.text);
  animateComment(comment);
}

// animate a comment
function animateComment(comment) {
	if (!comment.text)
		return;

  //do processing here according to the source
  switch (comment.source){
    case 'FB':
      comment.text = removeLink(comment.text);
      break;
    case 'YT':
      break;
    default:
      break;
  }
	var wordCount = comment.text.split(' ').length;
	var charCount = comment.text.length;
	if (wordCount<=5 && charCount<20) animateSpecial(comment);
	else animateDefault(comment);
}

function onPlayerStateChange(newState) {
	if (newState==1) jQuery('.animated-comment').resume();
	else jQuery('.animated-comment').pause();
}

function bg_worker2() {
	if (!bombard.yt_player) {
	    switch (getCurrentDomain()){
	      case 'www.youtube.com':
			    bombard.yt_player = getFGWindow().yt.getConfig('PLAYER_REFERENCE');
	        var videoWindow = document.querySelectorAll('#watch-player > embed')[0];
	        var pos = getAbsPosition(videoWindow);
	        bombard.yt_player['bbwidth'] = parseInt(videoWindow.width);
	        bombard.yt_player['bbheight'] = parseInt(videoWindow.height);
	        bombard.yt_player['bbtop'] = pos['top'];
	        bombard.yt_player['bbleft'] = pos['left'];
	        break;
	      case 'localhost':
	      case 'www.bombard.tv':
	        bombard.yt_player = jQuery('#ytPlayer')[0];
	        var pos = getAbsPosition(bombard.yt_player);
	        bombard.yt_player['bbwidth'] = parseInt(bombard.yt_player.width);
	        bombard.yt_player['bbheight'] = parseInt(bombard.yt_player.height);
	        bombard.yt_player['bbtop'] = pos['top'];
	        bombard.yt_player['bbleft'] = pos['left'];
	        break;
	      default:
	        return;
	    }
	    bombard.yt_player.addEventListener("onStateChange", "onPlayerStateChange");
	}

  if (localStorage.getItem('gb_bomb')=='1'){
		if (bombard.yt_player.getPlayerState() == 1) {
			var t = Math.floor(bombard.yt_player.getCurrentTime());
			if (!bombard.c) {
        bombard.c={};
        getYTComments(250);
        getFBComments();
        getBBComments(10);
			}

			if (bombard.c && bombard.c[t]) {
				jQuery.each(bombard.c[t], function(index, comment) {
          comment.height = bombard.yt_player.bbheight;
          comment.width = bombard.yt_player.bbwidth;
          comment.left = bombard.yt_player.bbleft;
          comment.top = bombard.yt_player.bbtop;
					animateComment(comment);
				});
			}
		}
	}
}


function getCurrentDomain(){
  return document.domain?document.domain:window.location.hostname; 
}

function getVideoId(){
  return bombard.yt_player.video_id?bombard.yt_player.video_id:bombard.yt_player.getVideoData().video_id;
}
