$(document).ready(function() {

	// all data needed by bombard
		bombard = {};
		// bombard.gb_bomb = 0;
		bombard.backgroundOn = 1;
		bombard.ytc = null;
		bombard.fbc = null;
		bombard.c = null;
		bombard.yt_player = null;
		bombard.unsafeWindow = null;
		bombard.workerId = null;
		bombard.domain = getCurrentDomain();

		// set bombard's background
		setBombardBackground();

		// initiate bg_worker
		// setTimeout(bg_worker, 5000);

		// hidden input field which helps non-english input
		var textInput = document.createElement('input');
		textInput.setAttribute('id', 'textInput');
		textInput.setAttribute('type', 'text');
		document.body.appendChild(textInput);
		$(textInput).focus();

		// div to wrap comment typed by user
		var centerDivWrapper = document.createElement('div');
		centerDivWrapper.setAttribute('id', 'centerDivWrapper');
		document.body.appendChild(centerDivWrapper);

		// set up keyboard binding
		$(function() {
			// TODO: instead of document, need a more specific DOM object
			$(document).keyup(function(e) {
				var code = (e.keyCode ? e.keyCode : e.which);
        var activeElem = document.activeElement;
        //typing in input areas other than textInput
        if (activeElem.nodeName=='INPUT' && activeElem.id!='textInput'){
          
				}else if (bombard.backgroundOn) {
					// the user is typing
					if (isInputting()) {
						// if user presses ENTER, bomb the comment
						if (code == 13) {
							commitComment();
						} else {
							$('#textInput').focus();
							updateComment(code);
						}

						// user is not typing
					} else {
						if (code == 13) { // enter
							e.preventDefault();
						} else if (code == 27) { // esc
							e.preventDefault();
							toggleBackground();
							$('#textInput').blur();
						} else if (code == 32) { // space
							e.preventDefault();
							renderPlayPause();

							// alphanumerical keys
						} else if (code > 47 && code < 91) {
							$('#textInput').focus();
              setTimeStamp();
							updateComment(code);
						}
					}
				} else {
					if (code == 27) {
						e.preventDefault();
						toggleBackground();
						$('#textInput').focus();
					}
				}
			});
			$(document).click(function(e) {
				if (e.srcElement.tagName=="INPUT") return;
				$('#textInput').focus();
			});
		});
		if (!bombard.workerId) {
			bombard.workerId = setInterval(bg_worker2, 1000);
			localStorage.setItem('workerId', bombard.workerId);
		}
    if ('onpagehide' in window){
      window.addEventListener('pagehide', sendComments, false); 
    }else{
      window.addEventListener('unload', sendComments, false);
    }
		localStorage.removeItem('bombardLoading');
		bombardLoading = undefined;
	});
