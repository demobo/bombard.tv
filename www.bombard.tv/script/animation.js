function animateSpecial(comment) {
	if (comment.text.length > 70) return;
	else {
		var top = (comment.top+20 +getRand6()[0]*(comment.height-20)/6 ) + 'px' || '80px';
		var left = (comment.left + Math.floor(Math.random() * (comment.width-50)) ) + 'px' || '80px';
	}
	var fontSize = (Math.floor(Math.random() * 10 + 10))*3 + 'px' || '60px';
	var commentText = comment.text || '';
	switch (comment.source){
		case 'FB':
			var color = '#3B5998';
			var newClass = 'white';
			break;
		case 'BB':
			var color = 'white';
			var newClass = 'dark';
			break;
		default:
			var color = ['white','orange'][Math.floor(Math.random()*2)];
			var newClass='';
			break;
	}
	var newComment = $('<div class="animated-comment '+newClass+'">'+commentText+'</div>');
	newComment.css({position:'absolute', color: color, left: left, 'top': top,'font-family': "Arial Black", 
		'font-size': fontSize, 'font-weight': 'bolder','-webkit-transition':'-webkit-transform 0.6s ease-out', 
		'z-index':'9999', '-webkit-transform': 'translateZ(0)'});
	jQuery('body').append(newComment);
	if (comment.text.length < 15) {
		newComment.effect("bounce",{ times:3 }, 300).animate({opacity : '0.2'}, 4000, function(){
			newComment.remove();
		});
	} else if (comment.text.length < 25) {
		newComment.animate({opacity : '0.2'}, 4000, function(){
			newComment.remove();
		});
	} else {
		newComment.animate({opacity : '0.2'}, 5000, function(){
			newComment.remove();
		});
	}
}

// animate showElement
function animateUserComment(showElement){
	showElement.animate({
		'right' : '-20%',
		'top' : '200px',
		'zoom' : '0.5',
	}, 2000, function(){
		setTimeout(function(){
			showElement.animate({
				'right':'200%'
			},8000, function(){
				showElement.remove();
			});
		}, 500);
	});
}

function animateDefault(comment) {
	if (comment.text.length > 140) return;
	else if (comment.text.length % 3 == 0) {
		var height = (10 + getRand4()[0]*(comment.top-10)/4) + 'px' || '80px';
		var left = Math.floor(Math.random() * 40 + 80)+ "%";
		var fontSize = (Math.floor(Math.random() * 7 + 10))*2 + 'px' || '34px';
	} else {
		var height = (130+comment.top+comment.height + getRand6()[0]*40) + 'px' || '80px';
		var left = Math.floor(Math.random() * 40 + 80)+ "%";
		var fontSize = (Math.floor(Math.random() * 10 + 10))*2 + 'px' || '40px';
	}
	var animateTime = Math.floor(Math.random() * 10000 + 25000);
	var commentText = comment.text || '';
	switch (comment.source){
		case 'FB':
			var color = '#3B5998';
			var newClass = 'white';
			break;
		case 'BB':
			var color = 'white';
			var newClass = 'dark';
			break;
		default:
			var color = ['white','white','orange'][Math.floor(Math.random()*3)];
			var newClass='';
			break;
	}
	var newComment = $('<div class="animated-comment '+newClass+'">'+commentText+'</div>');
	newComment.css({width:'auto', 'white-space':'nowrap', position:'absolute', color: color, left:left, 'top':height,'font-family': "Arial Black", 
		'font-size': fontSize, 'font-weight': 'bolder','-webkit-transition':'-webkit-transform 0.6s ease-out', 'z-index':'9999',
		'-webkit-transform': 'translateZ(0)'});
	jQuery('body').append(newComment);
	newComment.animate({left : '-200%'}, animateTime, function() {
		newComment.remove();
	});
}
var getRand4 = (function() {
	var nums = [0,1,2,3];
	var current = [];
	function rand(n) {
		return (Math.random() * n)|0;
	}
	return function() {
		if (!current.length) current = nums.slice();
		return current.splice(rand(current.length), 1);
	}
}());
var getRand6 = (function() {
	var nums = [0,1,2,3,4,5];
	var current = [];
	function rand(n) {
		return (Math.random() * n)|0;
	}
	return function() {
		if (!current.length) current = nums.slice();
		return current.splice(rand(current.length), 1);
	}
}());