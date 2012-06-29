function youtubePost(comment)
{
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
	var testDiv = document.createElement('div');
	testDiv.setAttribute('id', 'testDiv');
	testDiv.setAttribute('onclick', 'return window;');

	// create a background div
	var backgroundDiv = document.createElement('div');
	backgroundDiv.setAttribute('id', 'backgroundDiv');
  var display=localStorage.getItem('bombard_background');
  if ( display=='1' )
  {
    display = 'block';
    localStorage.setItem('gb_bomb',1);
  }
  else
  {
    localStorage.setItem('gb_bomb',0);
    display = 'none';
  }
  //console.log(display);
	backgroundDiv.setAttribute('style',
			'display:'+display+';background-color:rgba(0,0,0,0.6);width:'
					+ document.width + 'px;height:' + document.height
					+ 'px;position:absolute;top:0px;z-index:999');
	// set the video window z-index
	var videoWindow = document.querySelectorAll('#watch-player > embed')[0];
	videoWindow.style.zIndex = '1000';

	// append the background div
	document.body.appendChild(backgroundDiv);
	document.body.appendChild(testDiv);
	//console.log('setBombardBackground finished');
	return 0;
}
function toggleBackground() {
	var display = localStorage.getItem('bombard_background');
	if (display=='1') localStorage.setItem('bombard_background','0');
	else localStorage.setItem('bombard_background','1');
	renderBombardBackground();
}
function renderBombardBackground() {
	var bDiv = jQuery('#backgroundDiv')[0];
	var display = localStorage.getItem('bombard_background');
	if (display=='1') {
		bDiv.style.display = 'block';
		localStorage.setItem('gb_bomb',1);
		bg_worker();
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
    	animateInput('||');
    	bombard.yt_player.pauseVideo();
    	jQuery('.animated-comment').pause();
    }
    else
    {
    	animateInput('&#x25b6;');
    	bombard.yt_player.playVideo();
    	jQuery('.animated-comment').resume();
    	bg_worker();
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
	var ytplayer = getFGWindow().yt.getConfig('PLAYER_REFERENCE');
	var videoDuration = parseInt(ytplayer.getDuration());
	var videoKey = ytplayer.getVideoData().video_id;

  var link = 'https://graph.facebook.com/search?q='+videoKey+'&type=post';

  var raw_comments = [];

  function extractComment(response) {
    return jQuery.map(response.data, function(entry, index){
      var rComment = {
        'published' : entry.created_time,
        'content' : entry.message
      };
      raw_comments.push(rComment);
    });
  }

  function getRawComments(){
      jQuery.ajax( {
				url :link, 
        dataType : 'json',
				async : false,
				success : extractComment
			});
      return;
  }

  var comments = {};

  function getDoneComments(){
  	jQuery.each(raw_comments,
			function(index, raw_comment) {
        //console.log('DEBUG '+raw_comment.content);
        if (raw_comment.content){
				  if (raw_comment.content.length < 400) {
				  	var start = getStartTime(raw_comment) % videoDuration;
				  	if (comments[start]) {
				  		comments[start].push( {
				  			'text' : raw_comment.content,
                'source': 'FB'
				  		});
				  	} else {
				  		comments[start] = [ {
				  			'text' : raw_comment.content,
                'source' : 'FB'
				  		} ];
				  	}
				  }
        }

			});
    return;
  }
	var dfd = jQuery.Deferred();
	dfd.done(getRawComments, getDoneComments);
	dfd.resolve();
	//console.log(raw_comments);
	return comments;
}
// get YT comments for a specific video
function getYTComments(maxResults) {
	var ytplayer = getFGWindow().yt.getConfig('PLAYER_REFERENCE');
	var videoDuration = parseInt(ytplayer.getDuration());
	var videoKey = ytplayer.getVideoData().video_id;
	//console.log('here at getYTComments');
	// debugging
	//console.log(videoDuration + '; ' + videoKey);
	// return;

	var raw_comments = [];
	var comments = {};

	// handler of youtube feed
	function extractComment(data) {
		if (!data.feed.entry){
			return;
		}
		else{
			return jQuery.map(data.feed.entry, function(entry, index) {
				var rComment = {
					'published' : entry.published.$t,
					'content' : entry.content.$t
				};
				raw_comments.push(rComment);
			});
		}
		
	}

	function getRawComments() {
		//console.log('in raw ');
		for (startIndex = 1; startIndex <= maxResults; startIndex += 50) {
			// jQuery.getJSON(
			// youtubeLink(videoKey, startIndex, Math.min(50,
			// maxResults-startIndex+1)),
			// extractComment);
			//console.log('raw comment: '+startIndex);
			jQuery.ajax( {
				url : youtubeLink(videoKey, startIndex, Math.min(50, maxResults
						- startIndex + 1)),
				dataType : 'json',
				async : false,
				success : extractComment
			});
		}
	}


	function getDoneComments() {
		//console.log('in done');
		jQuery.each(raw_comments,
				function(index, raw_comment) {
					//console.log('Here at in done:',raw_comment.content)
					if (raw_comment.content.length < 300) {
						var start = getStartTime(raw_comment) % videoDuration;
						if (comments[start]) {
							comments[start].push( {
								'text' : raw_comment.content
							});
						} else {
							comments[start] = [ {
								'text' : raw_comment.content
							} ];
						}
					}

				});
	}
	var dfd = jQuery.Deferred();
	dfd.done(getRawComments, getDoneComments);
	dfd.resolve();
	return comments;
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
	var wordCount = comment.text.split(' ').length;
	var charCount = comment.text.length;
	if (wordCount<=5 && charCount<20) animateSpecial(comment);
	else animateDefault(comment);
}

function bg_worker() {
	if (!bombard.yt_player) {
		bombard.yt_player = getFGWindow().yt.getConfig('PLAYER_REFERENCE');
		//console.log(bombard.yt_player);
	}
//	if (bombard.gb_bomb == 1) {
	// //console.log('here at bg_worker: '+localStorage.getItem('gb_bomb'));
  if (localStorage.getItem('gb_bomb')=='1'){
		if (bombard.worker_running == 0
				&& bombard.yt_player.getPlayerState() == 1) {
			bombard.worker_running += 1;
			var t = Math.floor(getFGWindow().yt.getConfig('PLAYER_REFERENCE')
					.getCurrentTime());
			if (!bombard.ytc) {
				//console.log('bombard.ytc doesn\'t exist');
				bombard.ytc = getYTComments(250);
				//console.log(bombard.ytc);
			}

      if (!bombard.fbc) {
        //console.log('bombard.fbc doesn\'t exist');
        bombard.fbc = getFBComments();
        //console.log(bombard.fbc);
      }
			if (bombard.ytc[t]) {
				jQuery.each(bombard.ytc[t], function(index, comment) {
					animateComment(comment);
				});
			}
      if (bombard.fbc[t])
      {
        jQuery.each(bombard.fbc[t], function (index, comment) {
          animateFBComment(comment);
        })
      }

			bombard.worker_running -= 1;
		}
		setTimeout(bg_worker, 1000);
	}
}
