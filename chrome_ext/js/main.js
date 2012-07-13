$(document).ready(function() {
//    //
//		window.bombardComment = document.createElement('div');
//		bombardComment.setAttribute('id', 'bombardComment');
//		document.body.appendChild(bombardComment);
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
    //TODO: instead of document, we need a more specific dom object
		$(document).keydown(function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			if (code == 13) {  // enter
      	e.preventDefault();
        commitComment();
			}     
			else if (code == 27) {	// esc
				toggleBackground();
			}   
			else if (code == 32) {	// space
				e.preventDefault();
        if (isInputting()){
          updateComment(code);
        }else{
				  renderPlayPause();
        }
			}else{
        updateComment(code);
      }
		});
	});

});
