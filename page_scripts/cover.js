function setBombardBackground()
{
  var testDiv = document.createElement('div');
  testDiv.setAttribute('id','testDiv');
  testDiv.setAttribute('onclick','return window;');

  //create a background div
  var backgroundDiv = document.createElement('div');
  backgroundDiv.setAttribute('id','backgroundDiv');
  backgroundDiv.setAttribute('style', 'background-color:rgba(0,0,0,0.6);width:'+document.width+'px;height:'+document.height+'px;position:absolute;top:0px;z-index:999');
  //set the video window z-index
  var videoWindow = document.querySelectorAll('#watch-player > embed')[0];
  videoWindow.style.zIndex='1000';

  //append the background div
  document.body.appendChild(backgroundDiv);
  document.body.appendChild(testDiv);
  console.log('setBombardBackground finished');
  console.log('getYTcomments begins');
  return 0;
}

function toggleBackground()
{
//  var bDiv = document.getElementById('backgroundDiv');
  var bDiv = jQuery('#backgroundDiv')[0];
  if (bDiv.style.display=='none')
  {
    bDiv.style.display='block';
  }
  else
  {
    bDiv.style.display='none';
  }
}
//get the absolute position of an element. return an empty object if element is null
function getAbsPosition(element)
{
  if(element)
  {
    var oLeft = 0;
    var oTop = 0;
    var o = element;
    do
    {
      oLeft+=o.offsetLeft;
      oTop+=o.offsetTop;
    }while(o=o.offsetParent);

    return {'left':oLeft,'top':oTop};
  }
  else
  {
    return {};
  }
}

