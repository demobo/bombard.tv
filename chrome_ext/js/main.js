$(document).ready(function() {
	if (!$('#qrcode')[0]) {
		window.bombardComment = document.createElement('div');
		bombardComment.setAttribute('id', 'bombardComment');
		document.body.appendChild(bombardComment);
		setBombardBackground();
		bombard = {};
		// bombard.gb_bomb = 0;
		setTimeout(bg_worker, 5000);
		bombard.background_on = 0;
		bombard.worker_running = 0;
		bombard.ytc = undefined;
		bombard.fbc = undefined;
		bombard.yt_player = undefined;
		bombard.unsafeWindow = undefined;
		var centerDivWrapper = document.createElement('div');
		centerDivWrapper.setAttribute('id', 'centerDivWrapper');
		document.body.appendChild(centerDivWrapper);
		$(function() {
			$(document).keydown(function(e) {
				var code = (e.keyCode ? e.keyCode : e.which);
				if (code == 13) {  // enter
//					e.preventDefault();
//					renderPlayPause();
				}     
				else if (code == 27) {	// esc
					toggleBackground();
				}   
				else if (code == 32) {	// space
					e.preventDefault();
					renderPlayPause();
				}
			});
			$(window).bind('blur', function() {
				disconnect();
			});

			$(window).bind('focus', function() {
				connect();
			});
			// IE EVENTS
			$(document).bind('focusout', function() {
				disconnect();
			});

			$(document).bind('focusin', function() {
				connect();
			});
		});
	}
});
