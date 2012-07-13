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

    var textInput = document.createElement('input');
    textInput.setAttribute('id', 'textInput');
    textInput.setAttribute('type', 'text');
    document.body.appendChild(textInput);


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
				renderPlayPause();
      }
		});
  	$(document).click(function(e){
  		$('#textInput').focus();
  	});
  	$(document).keyup(function(e){
  		$('#textInput').focus();
  		var val = $('#textInput').val();
  		if (!val) $('#textInput').val(String.fromCharCode(e.keyCode));
      var c = document.getElementById('live-comment');
      //console.log(c);
      if (!c){
        c = document.createElement('div');
        c.setAttribute('id','live-comment');
        document.getElementById('centerDivWrapper').appendChild(c);
      }
  		$(c).text($('#textInput').val());
//      .effect('bounce', { times: 2 }, 50);
  	});

	});

});
