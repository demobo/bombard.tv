$(document).ready(function() {

    //set bombard's background
		setBombardBackground();

    //all data needed by bombard
		bombard = {};
		// bombard.gb_bomb = 0;
		setTimeout(bg_worker, 5000);
		bombard.background_on = 0;
		bombard.worker_running = 0;
		bombard.ytc = undefined;
		bombard.fbc = undefined;
		bombard.yt_player = undefined;
		bombard.unsafeWindow = undefined;

    //hidden input field which helps non-english input
    var textInput = document.createElement('input');
    textInput.setAttribute('id', 'textInput');
    textInput.setAttribute('type', 'text');
    document.body.appendChild(textInput);

    //div to wrap comment typed by user
		var centerDivWrapper = document.createElement('div');
		centerDivWrapper.setAttribute('id', 'centerDivWrapper');
		document.body.appendChild(centerDivWrapper);

    //set up keyboard binding
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
        if (!isInputting()){
 				  renderPlayPause();
        }
      }
		});
  	$(document).click(function(e){
  		$('#textInput').focus();
  	});
  	$(document).keyup(function(e){
  		$('#textInput').focus();
      updateComment(e.keyCode);
  	});
	});
});
