function click(e) {
	chrome.tabs.getSelected(null, function(tab) {
    	chrome.tabs.executeScript(tab.id, { code: "toggleBackground()" });
	});
//	window.close();
}

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('#bombardToggle').addEventListener('click', click);
});