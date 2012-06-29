function animate11words(words){
	var newElement = document.createElement('section');
	var colors=['white','white','white','orange','orange'];
	newElement.setAttribute('id','stage');
    newElement.setAttribute('class','animated-comment');
	newElement.innerHTML = '<dd id="scene1" style="color:'+colors[Math.floor(Math.random()*5)]+'"><p class="start"><span class="take1">'+words[0]+'</span></p><p class="act1"><span class="take1">'+words[1]+'</span> <span class="take2">'+words[2]+'</span><span class="take3">'+words[3]+'</span></p><p class="act2"><span class="take1">'+words[4]+'</span><span class="take2">'+words[5]+'</span> <span class="take3">'+words[6]+'</span></p><p class="act3"><span class="take1">'+words[7]+'</span><span class="take2">'+words[8]+'</span><span class="take3">'+words[9]+'</span> <span class="take4">'+words[10]+'</span> </p></dd>';
	document.body.appendChild(newElement);
	setTimeout(function(){document.body.removeChild(newElement);},5000);
	return;
}

function animate3words(words){
	  var newElement = document.createElement('section');
	  var colors=['white','white','white','orange','orange'];
	  newElement.setAttribute('id','stage');
	  newElement.setAttribute('class','animated-comment');
	  newElement.innerHTML = '<dd id="scene2" style="color:'+colors[Math.floor(Math.random()*5)]+'"><p class="act4"><span class="take1">'+words[0]+'</span><span class="take2">'+words[1]+'</span> <span class="take3">'+words[2]+'</span></p></dd>';
	  document.body.appendChild(newElement);
	  setTimeout(function(){document.body.removeChild(newElement);},5000);
	return;
}

function animate2words(words){
  
  	var newElement = document.createElement('section');
  	var colors=['white','white','white','orange','orange'];
  	newElement.setAttribute('id','stage');
    newElement.setAttribute('class','animated-comment');
  	newElement.innerHTML = '<dd id="scene3" style="color:'+colors[Math.floor(Math.random()*5)]+'">	<p class="act5"><span class="take1">'+words[0]+'</span> <span class="take2">'+words[1]+'</span> 	</p>	</dd>';
  	document.body.appendChild(newElement);
  	setTimeout(function(){document.body.removeChild(newElement);},5000);
	return;
}

function animate20words(words){
	var newElement = document.createElement('section');
	var colors=['white','white','white','orange','orange'];
	newElement.setAttribute('id','stage');
	newElement.setAttribute('class','animated-comment');
	newElement.innerHTML = '<dd id="scene4" style="color:'+colors[Math.floor(Math.random()*5)]+'"> <p class="act6"> <span class="take1">'+words[0]+'</span> <span class="take2">'+words[1]+'</span> <span class="take3">'+words[2]+'</span> <span class="take4">'+words[3]+'</span> <span class="take5">'+words[4]+'</span> </p> <p class="act7"> <span class="take1">'+words[5]+'</span> <span class="take2">'+words[6]+'</span> <span class="take3">'+words[7]+'</span> <span class="take4">'+words[8]+'</span> <span class="take5">'+words[9]+'</span> </p> <p class="act8"> <span class="take1">'+words[10]+'</span> <span class="take2">'+words[11]+'</span> <span class="take3">'+words[12]+'</span> <span class="take4">'+words[13]+'</span> </p> <p class="act9"> <span class="take1">'+words[14]+'</span> <span class="take2">'+words[15]+'</span> <span class="take3">'+words[16]+'</span> <span class="take4">'+words[17]+'</span> <span class="take5">'+words[18]+'</span> </p> <p class="act10"> <span class="take1">'+words[19]+'</span> </p> </dd>';
	document.body.appendChild(newElement);
// setTimeout(function(){document.body.removeChild(newElement);},5000);
	return;
}
var row = [];
function animateDefault(comment) {
	if (comment.text.length > 140)
		return;
	else if (comment.text.length % 2 == 0)
		var height = (getRand1()[0]*32 + 10) + 'px' || '80px';
	else
		var height = (getRand2()[0]*35 + 600) + 'px' || '80px';
	var fontSize = (Math.floor(Math.random() * 10 + 10))*2 + 'px' || '30px';
	var pos = ['top', 'bottom'];
	var commentText = comment.text || 'hello from Danteng';
	var colors=['white','white','orange'];
	var newComment = $('<div class="animated-comment">'+commentText+'</div>');
    newComment.css({width:'1000%',position:'absolute', color: colors[Math.floor(Math.random()*5)], left:'100%', 'top':height,'font-family': "Arial Black", 
    'font-size': fontSize, 'font-weight': 'bolder','-webkit-transition':'-webkit-transform 0.6s ease-out', 'z-index':'9999'});
    jQuery('body').append(newComment);
    newComment.animate({left : '-200%',}, 30000, function() 
      {
        newComment.remove();
      }
    );
}
var getRand1 = (function() {
    var nums = [0,1,2,3,4];
    var current = [];
    function rand(n) {
        return (Math.random() * n)|0;
    }
    return function() {
      if (!current.length) current = nums.slice();
      return current.splice(rand(current.length), 1);
    }
}());
var getRand2 = (function() {
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