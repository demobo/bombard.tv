chrome.extension.onConnect.addListener(function(port) {
  if (port.name === 'scripts') {
	  setController();
	  console.log('demobo background init');
    port.onMessage.addListener(function(msg) {
      console.log(msg.cmd,msg.string);
      if (msg.cmd=='disconnect') {
    	  $.demobo.disconnect();
      } else if (msg.cmd=='connect') {
    	  $.demobo.connect();
    	  setController();
      } else if (msg.string) {
        sendToPhone(msg.string);
      } else {
        alert('unhandled message to background.html: ' + JSON.stringify(msg));
      }
    });
  } else {
    alert('unknown attempt to connect. port.name must equal \'scripts\' ');
  }
});


