addLoadEvent(function() {
    this.nav = document.getElementsByClassName('navsurround')[0];
    this.MINSCROLLHEIGHT = getPos(nav).y;
    this.submenu = document.getElementsByClassName('submenu')[0];
    this.main = document.getElementsByTagName('MAIN')[0];
    this.navclass = nav.className;
    if(submenu != null)
    	this.submenuclass = submenu.className
    this.topButton = document.createElement('DIV');
    topButton.className="topbutton";
    topButton.innerHTML="<div></div><div></div>";
    topButton.addEventListener('click',toTop,false);
    document.addEventListener('scroll',scrollHandler,false);
    scrollHandler();
});
//need to add stuff that detects the current one, and see if submenu needed
//fixing and topbutton
function scrollHandler(){
		var navPosition = nav.getBoundingClientRect(); //position of navigation relative to screen
		var mainChilds = [].slice.call(main.childNodes);
		var newMainPos = getPos(main).y - getPos(nav).y;
		if(window.innerWidth<=1220){
				if(getPagePos().top>=205)
					addTopButton(true);
				else if(mainChilds.indexOf(topButton)>0)
					addTopButton(false);
			}			
		if(navPosition.top <= 0&&nav.className==navclass){
			nav.className=navclass+" navfixed";
			if(submenu != null && window.innerWidth > 1023)
				submenu.className = submenuclass+" submenufixed";		
			main.className = "boost";
			if(mainChilds.indexOf(topButton)<0&&window.innerWidth>1220){
				addTopButton(true);
			}
			}
		if(getPagePos().top<=MINSCROLLHEIGHT){
			nav.className=navclass;
			if(submenu != null && window.innerWidth > 1023){
					submenu.className = submenuclass;
			}
			main.className="";
			if(mainChilds.indexOf(topButton)>0&&window.innerWidth>1220)
				addTopButton(false);
			}
	}
function addTopButton(state){
		if(state){
			main.appendChild(topButton);
					style = window.getComputedStyle(topButton).opacity;
			}
		else{
			main.removeChild(topButton);
			}
		}
function getPagePos(){ //returns position of page relative to screen
		var doc = document.documentElement;
		return{
			left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
  	  top: (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
			};
	}
var getPos = function(el) {
    for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop,
        el = el.offsetParent);
    return {
        x: lx,
        y: ly
   		};
};
//var smoothScroll = new smoothObject(0,0,1);
var toTop = function(e){
		window.smoothScroll = new smoothObject(getPagePos().top,0,.5, 50);
		smoothIterator();
	}
function smoothIterator(){
		if(getPagePos().top<smoothScroll.getScrollIncrement()){
				window.scrollTo(0,0);
			}
		else{
			window.scrollTo(getPagePos().left,getPagePos().top-smoothScroll.getScrollIncrement());
			var timer = setTimeout(smoothIterator,smoothScroll.getTimeIncrement);
			}
	}
function smoothObject(fromPos, toPos, timeTaken, repeatedInterval){ //s = d/t
		this.initialPos = fromPos;
		this.finalPos = toPos;
		this.time = timeTaken; //in seconds
		this.intervals = repeatedInterval;
		this.scrollIncrement = (fromPos-toPos)/repeatedInterval >> 0; //amount scrolled per second (or speed)
		this.getScrollIncrement = function(){ //how much to scroll by every increment
			return this.scrollIncrement;
			};
		this.getTimeIncrement = function(){ //time between increments
			return 1000*this.time / this.intervals >> 0;	
			}
	};
