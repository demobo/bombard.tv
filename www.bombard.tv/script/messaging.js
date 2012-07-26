//animate information when SPACE is pressed
function animateInput(info) {
	// get the position and DOM object of the player
	var videoWindow = document.querySelector('#watch-player > embed');
	var pos = getAbsPosition(videoWindow);

	// handle the case that SPACE is pressed when last animation is not finished
	jQuery('#demobo-infoDiv').remove();

	var infoDiv = document.createElement('div');
	infoDiv.setAttribute('id', 'demobo-infoDiv');

	// position the div
	infoDiv.style.top = (pos.top + parseInt(videoWindow.height) / 2 - 50) + 'px';
	infoDiv.style.left = (pos.left + parseInt(videoWindow.width) / 2 - 50) + 'px';
	infoDiv.innerHTML = '<div>' + info + '</div>';
	document.body.appendChild(infoDiv);

	// do the animation
	jQuery('#demobo-infoDiv').animate( {
		'opacity' : 0
	}, 2000, function() {
		jQuery('#infoDiv').remove();
	});
}

// check whether is typing comment
function isInputting() {
	return jQuery('#live-comment').length > 0
			&& jQuery('#live-comment').text() != '';
}

function setTimeStamp() {
	bombard.tempTimeStamp = Math.floor(bombard.yt_player.getCurrentTime());
}

function sendComments() {
	if (bombard.commentsToSave) {
		var vid = bombard.yt_player.video_id;
		jQuery.each(bombard.commentsToSave, function(index, comment) {
			RPC.saveComment(vid, '[bbd' + comment['time'] + ']'
					+ processUserComment(comment['comment']));
		});
		bombard.commentsToSave = null;
	}
}

// update comment as the user is typing
function updateComment(code) {

	var val = $('#textInput').val();

	// remove heading zeroes
	var temp = val.search(/\S/);
	if (temp > 0) {
		$('#textInput').val(val.substr(temp));
	}

	if (!val) {
		$('#textInput').val(String.fromCharCode(code));
	}
	var c = document.getElementById('live-comment');
	// console.log(c);
	if (!c) {
		c = document.createElement('div');
		c.setAttribute('id', 'live-comment');
		document.getElementById('centerDivWrapper').appendChild(c);
		$(c).addClass('running-comment');
	}

	$(c).text($('#textInput').val());
}

// process the comment typed by user, i.e. add timestamp, filtering, .....
function processUserComment(comment) {
	// now just return raw comment
	return comment;
}

// User hit ENTER after typing comment
function commitComment() {
	var c = jQuery('#live-comment');
	// console.log(bombard.yt_player.getVideoData().video_id);
	// console.log(c.val());

	if (c.length == 1) {
		// TODO: increase the speed of RPC. as tested, it really slows down the
		// whole page.
		// RPC.saveComment(bombard.yt_player.getVideoData()['video_id'],processUserComment());
		var temp = bombard.tempTimeStamp;
		if (!bombard.commentsToSave) {
			bombard.commentsToSave = [ {
				'time' : temp + '',
				'comment' : c.text()
			} ];
		} else {
			bombard.commentsToSave.push( {
				'time' : temp + '',
				'comment' : c.text()
			});
		}

		if (!bombard.c[temp]) {
			bombard.c[temp] = [ {
				'text' : c.text(),
				'source' : 'BB'
			} ];
		} else {
			bombard.c[temp].push( {
				'text' : c.text(),
				'source' : 'BB'
			});
		}

		// TODO: timestamp should be got when user starts typing instead of
		// after typing
		// var time = bombard.yt_player.getCurrentTime();
		// TODO: youtubePost needs to use API
		// youtubePost(parseInt(time/60)+':'+parseInt(time%60)+' ' +
		// document.getElementById('live-comment').innerHTML);
		c.attr('id', 'running-live-comment');
		jQuery('#textInput').val('');
		animateUserComment(c);
	}
}
