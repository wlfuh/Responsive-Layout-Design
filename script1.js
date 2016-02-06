var cookies;
var changeFace = function (e){
	console.log('success');
	}
window.onload = function() { 
		setTextListener();
		setCopyYear();
    checkCookie();
    setMedia();
    this.transition = getCorrectProperty({
            'transition':'transition',
            'MozTransition':'MozTransition ',
            'WebkitTransition':'WebkitTransition'
        });
    this.transitionend = getCorrectProperty({
            'transition':'transitionend',
            'OTransition':'otransitionend', 
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        });
  	initSearch();
  	this.face = document.getElementById('face');
  	if(face == null) return;
  	if(window.innerWidth <= 400)
  		resizeFace();
  	document.getElementsByClassName('hdrsurround')[0].addEventListener('load', changeFace, false);
  	face.addEventListener('load', changeFace, false);
	};

function setTextListener() {
		this.txtChilds = [].slice.call(document.getElementById('textAdjustor').getElementsByTagName('A'));
		for(i = 0; i < txtChilds.length; i++){
			if(txtChilds[i].tagName == 'A'){
				txtChilds[i].addEventListener('click', process, false);
				}
			}
	}
function setCopyYear(){
		document.getElementById('year').innerHTML=(new Date()).getFullYear();
	}
function checkCookie(){
		var theSize = getCookie("textSize");
		if(theSize != "")
			changeText(parseInt(theSize));
	}
function setMedia(){
		var scNode = document.getElementById('social').childNodes;
		this.socialimgCache=[];
		for(i = 0; i < scNode.length; i++){
			if(scNode[i].tagName=='A'){
				scNode[i].addEventListener('mouseenter', toggleColor, false);
				scNode[i].addEventListener('touchend', toggleColor, false);
				scNode[i].addEventListener('mouseleave', toggleColor, false);
				var colorImg = scNode[i].childNodes[0];
				var bwImg = new Image();
				bwImg.src=colorImg.src.substring(0,colorImg.src.indexOf('.png'))+'_bw.png';
				socialimgCache.push(bwImg.src);
				socialimgCache.push(colorImg.src);
				}
			}
	}
function initSearch() {
		var myCallback = function() {
		  if (document.readyState == 'complete') {
		    // Document is ready when CSE element is initialized.
		    // Render an element with both search box and search results in div with id 'search-box'.
		    var a = google.search.cse.element.render(
		        {
		          div: "search-box",
		          tag: 'search'
		         });
		      var searchField = document.getElementById('gsc-i-id1');
		      searchField.placeholder = "Search";
		      searchField.style.cssText = searchField.style.cssText+"margin:7px;";
		      initMobile(); 
		         
		  	} else {
		    // Document is not ready yet, when CSE element is initialized.
		    google.setOnLoadCallback(function() {
		       // Render an element with both search box and search results in div with id 'search-box'.
		        google.search.cse.element.render(
		            {
		              div: "search-box",
		              tag: 'search'
		            });
		    }, true);
		  		}
		};
		// Insert it before the CSE code snippet so that cse.js can take the script
		// parameters, like parsetags, callbacks.
		window.__gcse = {
		  	parsetags: 'explicit',
		  	callback: myCallback
		};

		(function() {
		  	var cx = '013941808584080770434:lxqyuqj2rxi'; // Insert your own Custom Search engine ID here
		  	var gcse = document.createElement('script'); gcse.type = 'text/javascript';
		  	gcse.async = true;
		  	gcse.src = (document.location.protocol == 'https' ? 'https:' : 'http:') +
		  	    '//www.google.com/cse/cse.js?cx=' + cx;
		  	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
		})();
	}
var toggleColor = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
		if(target.tagName == 'A')
			target = target.childNodes[0];
    var subLoc = target.src.indexOf('_bw');
      if(subLoc > -1){
    		target.src = socialimgCache[socialimgCache.indexOf(target.src)+1];
    		}
    	else{
    		target.src = socialimgCache[socialimgCache.indexOf(target.src)-1];
    		}
	};
var process = function (e){
			e = e || window.event;
    	var target = e.target || e.srcElement;
    	if(target.tagName == 'A'){
    		var toSize = 	txtChilds.indexOf(target);
    		}
    	else{
    		return;
    		}
			changeText(toSize);		
	};
function changeText(size){
			if(size == 1)
				document.body.style.fontSize='';
			else
				document.body.style.cssText = "font-size:" + (100 + (size - 1) * 10) + "%";
			setCookie("textSize", size, 1);
	}
function setCookie(cname,cvalue,exdays){
			var d = new Date();
			d.setTime(d.getTime()+(exdays*24*60*60*1000));
			var expires = "expires=" + d.toGMTString();
			document.cookie = cname + "=" + cvalue + "; " + expires;
	}
function getCookie(cname){
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) 
			{
 			 		var c = ca[i].trim();
 			 		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  			}
			return "";
	}
window.onresize = function(){
	if(face == null) return;
	source = face.src;
	var faceWidth = parseInt(source.substring(source.indexOf('width') + 6, source.indexOf('width') + 9));
	if(window.innerWidth <= 400)
			resizeFace();
	else if(faceWidth != 377){
				console.log(source);
				newsource = source.substring(0, source.indexOf('width')) + "width=" + 377 + source.substring(source.indexOf('width') + 9, source.length);
				face.src = newsource;
		}
	}
function resizeFace(){		
				source = face.src;
				console.log(source);
				newsource = source.substring(0, source.indexOf('width')) + "width=" + (window.innerWidth - 30) + source.substring(source.indexOf('width') + 9, source.length);
				face.src = newsource;
	}

/*Utility Functions*/
function addLoadEvent(func) {
  		var oldonload = window.onload;
  		if (typeof window.onload != 'function') {
  		  window.onload = func;
  		} else {
  		  window.onload = function() {
  		    if (oldonload) {
  		      oldonload();
  		    }
  		    func();
  		  }
  		}
	}
function getCorrectProperty (properties) {
    	var i,
    	    undefined,
    	    el = document.createElement('div');
    	for (i in properties) {
    	    if (properties.hasOwnProperty(i) && el.style[i] !== undefined) {
    	        return properties[i];
    	    }
    	}
	}
function swap(arr,i,j){
			var temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
	}