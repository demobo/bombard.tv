$(document).ready(function() {
  //create the div that used to show user's typing comment
  window.bombardComment = document.createElement('div');
	bombardComment.setAttribute('id', 'bombardComment');
	document.body.appendChild(bombardComment);
  
  //set bombard's background
	setBombardBackground();
  
  //all data needed by bombard
	bombard = {};
	// bombard.gb_bomb = 0;
	bombard.background_on = 0;
	bombard.worker_running = 0;
	bombard.ytc = null;
	bombard.fbc = null;
	bombard.yt_player = null;
	bombard.unsafeWindow = null;
  localStorage.setItem('bombard',JSON.stringify(bombard)) ;
  console.log('the initial bombard object in localStorage: '+localStorage.getItem('bombard'));
  
  //initiate bg_worker
	setTimeout(bg_worker, 5000);

  //may delete later, dont know purpose now
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
