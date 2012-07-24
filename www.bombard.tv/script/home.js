google.load("swfobject", "2.1");
google.load('search', '1');
    
function OnLoad() {
	// Create a search control
	var searchControl = new google.search.SearchControl();		
	// So the results are expanded by default
	options = new google.search.SearcherOptions();
	options.setExpandMode(google.search.SearchControl.EXPAND_MODE_OPEN);		
	// Create a video searcher
	var videoSearch = new google.search.VideoSearch();		
	// Set the result order of the search - check docs for other
	// orders
	videoSearch.setResultOrder(google.search.Search.ORDER_BY_DATE);
	
	// Add our searcher to the control
	searchControl.addSearcher(videoSearch, options);
	
	// create a drawOptions object
    var drawOptions = new google.search.DrawOptions();
    
    // tell the searcher to draw itself in linear mode
    // drawOptions.setDrawMode(google.search.SearchControl.DRAW_MODE_TABBED);
	
	// Draw the control onto the page
	searchControl.draw(document.getElementById("Searchbar"), drawOptions);
	
	// Set the result set to large
	videoSearch.setResultSetSize(google.search.Search.LARGE_RESULTSET);
	
	searchControl.execute("ytfeed:most_viewed.this_month");
	
	searchControl.setSearchCompleteCallback(this, OnSearchComplete);
}
google.setOnLoadCallback(OnLoad);
    
OnSearchComplete = function(sc, searcher) {
	$("#Videoresults").html("");
	for (var i=0; i<searcher.results.length; i++) {
		console.log(searcher.results[i]);
		var vid = searcher.results[i].tbUrl.split('/')[4];
		var videoresult = $('<div class="videoresult"><a onclick="javascript:loadVideo(\''+vid+'\')"><img src="'+searcher.results[i].tbUrl+'"></a></div>');
//		$('#visualizer').qtip({
//			content: e.result, 
//			show: {ready: true, effect: function(offset) {$(this).slideDown(100);}}, 
//			position: {my: 'right bottom', at:'center'}, 
//			style: {classes: 'ui-tooltip-blue ui-tooltip-youtube', width: 300, height: 100} 
//		} );
		$("#Videoresults").append(videoresult);
	}
	videoID = vid;
	init();
};

// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
  	alert("An error occured of type:" + errorCode);
}

// This function is automatically called by the player once it
// loads
function onYouTubePlayerReady(playerId) {
  	ytplayer = document.getElementById("ytPlayer");
  	ytplayer.addEventListener("onError", "onPlayerError");
	ytplayer.video_id = videoID;
}

function loadVideo(videoID) {
//  	if(ytplayer) {
//    	ytplayer.loadVideoById(videoID);
//		ytplayer.video_id = videoID;
//  	}
  	window.location = "/?vid=" + videoID;
}