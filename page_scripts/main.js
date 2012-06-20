$(document).ready(function() {
	if (!$('#qrcode')[0]) {
		var styles = document.createElement('style');
		styles.innerHTML = '\
			#bombardComment {\
				color: #fff;\
				position: absolute;\
				right: 10%;\
				top: 30px;\
				font-family: "Arial Black";\
				font-size: 40px;\
				font-weight: bolder;\
				-webkit-transition: -webkit-transform 0.6s ease-out;\
				z-index: 9999;\
			}\
			';
		document.body.appendChild(styles);

		window.bombardComment = document.createElement('div');
		bombardComment.setAttribute('id', 'bombardComment');
		document.body.appendChild(bombardComment);
//    var dfd = $.Deferred();
//    dfd.done(setBombardBackground, getYTComments);
//    dfd.resolve(50);

		setBombardBackground();
		
		$(function(){
		    $(window).bind('blur', function(){
//		    	disconnect();
		    });

		    $(window).bind('focus', function(){
		    	connect();
		    });
		    // IE EVENTS
		    $(document).bind('focusout', function(){
//		    	disconnect();
		    });

		    $(document).bind('focusin', function(){
		    	connect();
		    });
		});
	}
});
