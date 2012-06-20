//helper function
function getTimeFromPublished(timeStamp)
{
  var pattern = /[\-A-Z\:\.]/g;
  return parseInt(timeStamp.replace(pattern,''));
}

//get start time of a comment
function getStartTime(raw_comment)
{
	var pattern = /[0-9]{1,2}\:[0-9]{2}/i;
  var time;
  if (!(time=raw_comment.content.match(pattern)))
  {
	  return getTimeFromPublished(raw_comment.published);
	}
  else
	{
	  var temp = time[0].split(':');
	  return parseInt(temp[1])+60*parseInt(temp[0]);
	}
}

function getFGWindow()
{
  return jQuery('#testDiv')[0].onclick();
}
//get YT comments for a specific video
function getYTComments(maxResults)
{
  var ytplayer = getFGWindow().yt.getConfig('PLAYER_REFERENCE');
  var videoDuration = parseInt(ytplayer.getDuration());
  var videoKey = ytplayer.getVideoData().video_id;
  console.log('here at getYTComments');
//debugging
  console.log(videoDuration+'; '+videoKey);
  // return;

  var raw_comments=[];
  
	//handler of youtube feed
	function extractComment(data)
	{
	  return jQuery.map(
      data.feed.entry,
      function(entry, index)
      {
        var rComment = {
          'published': getTimeFromPublished(entry.published.$t),
          'content': entry.content.$t
        };
        raw_comments.push(rComment);
      }
    ); 
	}

  function getRawComments()
  {
    console.log('in raw ');
    for(startIndex=1; startIndex<=maxResults; startIndex+=50)
    {
//      jQuery.getJSON(
//      youtubeLink(videoKey, startIndex, Math.min(50, maxResults-startIndex+1)), 
//      extractComment);
      jQuery.ajax({
        url: youtubeLink(videoKey, startIndex, Math.min(50, maxResults-startIndex+1)), 
        dataType: 'json',
		async : false,
        success: extractComment});
    }
  }

  var comments={};

  function getDoneComments()
  {
	console.log('in done');
    jQuery.each(raw_comments, function( index, raw_comment )
    {
      var start = parseInt(raw_comment.published) % videoDuration;
      if (comments[start])
      {
        comments[start].push({
          'publishedTimeStamp':Math.floor(Math.random()*150+20)+'px',
    	'importance':Math.floor(Math.random()*10+30)+'px',
    	'text':raw_comment.content
        });
      }
      else
      {
        comments[start] = [{
          'publishedTimeStamp':Math.floor(Math.random()*150+20)+'px',
    	'importance':Math.floor(Math.random()*10+30)+'px',
    	'text':raw_comment.content
        }];
      }

    });
  }
  var dfd = jQuery.Deferred();
  dfd.done(getRawComments, getDoneComments);  
  dfd.resolve();
  return comments;
}

//query youtube once
function youtubeLink(key, start, max)
{
  return 'https://gdata.youtube.com/feeds/api/videos/'+key+'/comments?start-index='+start+'&max-results='+max+'&alt=json';
}


// animate a comment 
function animateComment(comment)
{
  var height = comment.publishedTimeStamp || '80px';
  var fontSize = comment.importance || '40px';
  var commentText = comment.text || 'hello from Danteng';

  var newComment = $('<div>'+commentText+'</div>');
  newComment.css({position:'absolute', color: '#fff', right:'10%', top:height,'font-family': "Arial Black", 
  'font-size': fontSize, 'font-weight': 'bolder','-webkit-transition':'-webkit-transform 0.6s ease-out', 'z-index':'9999'});
  jQuery('body').append(newComment);
  newComment.animate({right : '110%',}, 5000, function() 
  {
     obj.remove();
  }
  );
}



