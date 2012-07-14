$(document).ready(function() {
  
  //set bombard's background
	setBombardBackground();
  
  //all data needed by bombard
	bombard = {};
	// bombard.gb_bomb = 0;
  bombard.backgroundOn = 1;
	bombard.worker_running = 0;
	bombard.ytc = null;
	bombard.fbc = null;
	bombard.yt_player = null;
	bombard.unsafeWindow = null;
  
  //initiate bg_worker
	setTimeout(bg_worker, 5000);

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
    //TODO: instead of document, need a more specific DOM object
		$(document).keyup(function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
      
      if (bombard.backgroundOn){
          //the user is typing
        if (isInputting()){
          //if user presses ENTER, bomb the comment
          if (code == 13){
            commitComment();
          }else{
            $('#textInput').focus();
            updateComment(code);
          }
          
        //user is not typing  
        }else{
			    if (code == 13) {  // enter
    	     	e.preventDefault();
			   	}else if (code == 27) {	// esc
            e.preventDefault();
			   		toggleBackground();
            $('#textInput').blur();
			   	}else if (code == 32) {	// space
			   		e.preventDefault();
			   		renderPlayPause();
           
          //alphanumerical keys 
    	    }else if (code>47 && code<91){
    	       $('#textInput').focus();
    	       updateComment(code);
    	    }
        }
      }else{
        if (code == 27){
          e.preventDefault();
          toggleBackground();
          $('#textInput').focus();
        }
      }
    });
  	$(document).click(function(e){
  		$('#textInput').focus();
  	});
 	});
  bombardLoading=undefined;
});
