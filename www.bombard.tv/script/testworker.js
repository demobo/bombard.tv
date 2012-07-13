addEventListenner('message', function (e) {
  var data = e.data;
  self.postMessage('hi, '+data+'! Fuck you!');
});
