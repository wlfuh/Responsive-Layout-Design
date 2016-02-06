function initMobile(){
		this.searchIcon  = document.getElementsByClassName('gsc-search-button gsc-search-button-v2')[0];
		this.searchBox   = document.getElementById('gsc-i-id1');
		this.eventCast 	 = null;
		this.currentType = null;
		this.areaNodes   = {
				search: [document.getElementById('gsc-iw-id1'),document.getElementsByClassName('searchBox')[0]],
				menu:		[document.getElementsByClassName('menubar')[0],document.getElementsByClassName('community')[0]],
				text: 	[document.getElementById('textAdjustor')]
			};
		if(document.getElementsByClassName('submenu')[0] != null){
			areaNodes.menu.push(document.getElementsByClassName('submenu')[0]);
			}
		this.expandedNodes = [];
		document.getElementById('menuicon').addEventListener('click', toggleMenu, false);
		searchIcon.addEventListener('click', toggleSearch, false);
		document.getElementsByClassName('textsize')[0].addEventListener('click', toggleText, false);
	}
function mobileToggle(nodes, type){
	for(i = 0; i < nodes.length; i++){
    	var selectLoc = nodes[i].className.indexOf(' mobileSelect');
    	if(selectLoc > -1){
    		nodes[i].className = nodes[i].className.substring(0, selectLoc);
    		expandedNodes.splice(expandedNodes.indexOf(type), 1);
    	}
    	else{
    		nodes[i].className = nodes[i].className + ' mobileSelect';
    		}
    	}
   if(nodes[0].className.indexOf(' mobileSelect') == -1)
   	return;
   for(j = 0; j < expandedNodes.length; j++){
   		if(type != expandedNodes[j]){
   			 toggleFunctions[expandedNodes[j]]();
   			 expandedNodes.splice(j, 1);
   			 j--;
   			}
   	}
   	expandedNodes.push(type);
   	currentType = type;
	}
// Toggle Functions
var toggleFunctions = {
		search: function(){toggleSearch()},
		menu: function(){toggleMenu()},
		text: function(){toggleText()}
	};
var toggleMenu = function (e){
		if(window.innerWidth > 1023)
			return;
		e = e || window.event;
    mobileToggle(areaNodes.menu, 'menu');
    if(e != null)
    	toggleOutClick(e);
	};
var toggleSearch = function (e){
		if(window.innerWidth > 960)
			return;
		e = e || window.event;
   	mobileToggle(areaNodes.search, 'search');
   	if(searchIcon.style.cssText === ''){
   		searchIcon.style.cssText = "background-color:white !important;";
   		searchBox.focus();
   	}
   	else
   		searchIcon.style.cssText = "";
   	if(e != null)
   		toggleOutClick(e);
};
var toggleText = function (e){
		e = e || window.event;
		if(window.innerWidth > 480)
			return;
		mobileToggle(areaNodes.text, 'text');
		if(e != null)
   		toggleOutClick(e);
};
var toggleOutClick = function (event){
		if(expandedNodes.length > 0){
			window.addEventListener('click',clickBoundary,false);
			eventCast = event;
		}
		else{
			window.removeEventListener('click',clickBoundary,false);
		}	
	};
//Utility
var clickBoundary = function (e){
		e = e || window.event;
		x = e.pageX;
		y = e.pageY;
		if(eventCast.srcElement == e.srcElement)
			return;
		var nodes = areaNodes[currentType];
		for(i = 0 ;i < nodes.length; i++){
				areaWidth = nodes[i].offsetWidth;
				areaHeight = nodes[i].offsetHeight;
				areaX = nodes[i].getBoundingClientRect().left;
				areaY = nodes[i].getBoundingClientRect().top;
				if(x > areaX + areaWidth || x < areaX || y > areaY + areaHeight || y < areaY)
					toggleFunctions[currentType]();
			}
	};
