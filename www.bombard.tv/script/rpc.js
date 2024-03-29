//
// As mentioned at http://en.wikipedia.org/wiki/XMLHttpRequest
//
if (!window.XMLHttpRequest)
  XMLHttpRequest = function() {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0")
    } catch (e) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0")
    } catch (e) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP")
    } catch (e) {
    }
    try {
      return new ActiveXObject("Microsoft.XMLHTTP")
    } catch (e) {
    }
    throw new Error("Could not find an XMLHttpRequest alternative.")
  };

//
// Makes an AJAX request to a local server function w/ optional arguments
//
// functionName: the name of the server's AJAX function to call
// opt_argv: an Array of arguments for the AJAX function
//
function Request(function_name, opt_argv) {

  if (!opt_argv)
    opt_argv = new Array();

  // Find if the last arg is a callback function; save it
  var callback = null;
  var len = opt_argv.length;
  if (len > 0 && typeof opt_argv[len - 1] == 'function') {
    callback = opt_argv[len - 1];
    opt_argv.length--;
  }
  var async = (callback != null);

  // Encode the arguments in to a URI
  var query = 'action=' + encodeURIComponent(function_name);
  for ( var i = 0; i < opt_argv.length; i++) {
    var key = 'arg' + i;
    var val = JSON.stringify(opt_argv[i]);
    query += '&' + key + '=' + encodeURIComponent(val);
  }
  query += '&time=' + new Date().getTime(); // IE cache workaround

  // Create an XMLHttpRequest 'GET' request w/ an optional callback handler
  var req = new XMLHttpRequest();
  var serverUrl = 'http://www.bombard.tv';
  req.open("POST", serverUrl + '/rpc', async);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  if (async) {
    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        var response = null;
        try {
          response = JSON.parse(req.responseText);
        } catch (e) {
          response = req.responseText;
        }
        callback(response);
      }
    };
  }
  req.send(query);
}

// Adds a stub function that will pass the arguments to the AJAX call
function InstallFunction(obj, functionName) {
  obj[functionName] = function() {
    Request(functionName, arguments);
  };
}


// RPC object that will contain the callable methods
var RPC = {};

// Insert 'Add' as the name of a callable method
InstallFunction(RPC, 'saveComment');
InstallFunction(RPC, 'loadComment');
InstallFunction(RPC, 'likeComment');
InstallFunction(RPC, 'dislikeComment');
