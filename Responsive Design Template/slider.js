addLoadEvent(function() {
    this.slider = document.getElementsByClassName("sliderpart")[0];
    this.slides = [].slice.call(document.getElementsByClassName('slide'));
    this.controller = document.getElementById('controlWrap');
    this.leftArrow = document.getElementById('larrow');
    this.rightArrow = document.getElementById('rarrow');
    initSlides();
    setQuotes();
});
//slider
var counter = 0;
var nextSlide = function(event) {
    slides[counter].className = slides[counter].className.replace('slideFadeOut ','');
    slides[counter].className = slides[counter].className.replace(' slideTransition','');
    slides[counter].className = slides[counter].className.replace(' slideFadeIn',' slideActive');
    changeSelection(counter);
    stasis();
};
var hidetoNext = function(event) {
    slides[counter].className = slides[counter].className.replace(' slideTransition','');
		slides[counter].className = slides[counter].className.replace(' slideActive slideFadeOut','');
    transitionIn(nextNum);
};
var controlClicked = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    for (i = 0; i < circles.length; i++) {
        if (target == circles[i].circleDom) {
            nextNum = i;
            transitionOut();
            break;
        }
    }
	};
var toNext = function(e) {
		toggleArrowListener(false);
    e = e || window.event;
    var target = e.target || e.srcElement;
    while(target.id==""){
    	target = target.parentElement;	
    	}
    if (target.id == "larrow") {
        nextNum = counter - 1;
    }
    transitionOut();
	};
function initSlides() {
    for (i = 0; i < slides.length; i++) {
        slides[i].addEventListener('touchstart',startHandler,false);
        slides[i].addEventListener('touchend',endHandler,false);
    }
    this.swipeState = true;
    addControls();
    stasis();
	}
function stasis() {
    removeAllListeners(slides);
    toggleArrowListener(true);
    if(!swipeState) //if swipe is disabled
    	toggleSwipeListener();
    this.nextNum = counter + 1;
	}
function transitionOut() {
    disableControls();
    toggleArrowListener(false);
    slides[counter].className = slides[counter].className+" slideTransition"; 
    slides[counter].addEventListener(transitionend, hidetoNext, false);
    slides[counter].className = slides[counter].className+" slideFadeOut";    
	}
function transitionIn(slideNum) {
    // Make the element fully transparent.
    if (slideNum == slides.length) {
        slideNum = 0;
    } else if (slideNum == -1) {
        slideNum = slides.length - 1;
    }
    counter = slideNum;
    slides[counter].className = 'slideFadeOut ' + slides[counter].className;
    style = window.getComputedStyle(slides[counter]).opacity;
    slides[counter].className = slides[counter].className + ' slideTransition';
    slides[counter].addEventListener(transitionend, nextSlide, false);
 		slides[counter].className=slides[counter].className + ' slideFadeIn';
	}
var resetSlide = function(e){
		e = e || window.event;
  	var target = e.target || e.srcElement;
		var nextIndex = slides.indexOf(target);
		slides[counter].className = 'slide';
		target.className = 'slide slideActive';
		counter = nextIndex;
		changeSelection(counter);
		stasis();
	};
function removeAllListeners(elemArray) {
    for (i = 0; i < elemArray.length; i++) {
        elemArray[i].removeEventListener(transitionend, hidetoNext, false);
        elemArray[i].removeEventListener(transitionend, nextSlide, false);
        elemArray[i].removeEventListener(transitionend, function(){return;}, false);
        elemArray[i].removeEventListener(transitionend, resetSlide, false);
    }
}
//touch
var startPos, endPos;
var startHandler = function(e){
		startPos = e.changedTouches[0];
	};
var endHandler = function(e){
		e.preventDefault();
		endPos = e.changedTouches[0];
		handleSwipe(e);
	};
function handleSwipe(e){
   var xDist = startPos.pageX-endPos.pageX
   if(Math.abs(xDist) < 100)
      return;
   else
   		e.preventDefault();
   toggleSwipeListener();
   if(xDist<0){ //swipe direction right
   		nextNum = counter-1;
     	slideDir('right', nextNum)
     }
   else{ 
   		slideDir('left', counter+1)
     }
	}
function slideDir(dir, nextSlideNum){ //presets hidden slide into position, assume counter is the current slideNumber
		disableControls();
		toggleArrowListener(false);
		if (nextSlideNum == slides.length) {
  			nextSlideNum = 0;
  		} 
  	else if (nextSlideNum == -1) {
  			nextSlideNum = slides.length - 1;
  	  }
  	slides[counter].addEventListener(transitionend, function(){return;}, false);
		slides[nextSlideNum].addEventListener(transitionend, resetSlide, false);
		if(dir == 'left'){ //if direction of slide leave/ enter is left
				slides[nextSlideNum].className = slides[nextSlideNum].className + ' hiddenSlide slideRight'; //set the next slide to the right of the current
				style = window.getComputedStyle(slides[nextSlideNum]).left;
				slides[counter].className = slides[counter].className + ' slideTransition slideLeft';
				slides[nextSlideNum].className = 'slide hiddenSlide slideTransition slideActive';
			}
		else{ //dir of sliding is right
				slides[nextSlideNum].className = slides[nextSlideNum].className+' hiddenSlide slideLeft'; //set the next slide to the left of the current
				style = window.getComputedStyle(slides[nextSlideNum]).left;
				slides[counter].className = slides[counter].className + ' slideTransition slideRight';
				slides[nextSlideNum].className = 'slide hiddenSlide slideTransition slideActive';
			}
	}
function toggleSwipeListener(){
		if(swipeState){ //to do if want to disable swipe
			for (i = 0; i < slides.length; i++) {
  	      slides[i].removeEventListener('touchstart',startHandler,false);
  	      slides[i].removeEventListener('touchend',endHandler,false);
  	  	}
			}
		else{
			for (i = 0; i < slides.length; i++) {
  	      slides[i].addEventListener('touchstart',startHandler,false);
  	      slides[i].addEventListener('touchend',endHandler,false);
  	  	}
			}
			swipeState=!swipeState;
	}
//controls
var controlsAdded=false;
function CircleSelector() {}
		CircleSelector.prototype.isSelected = false;
		CircleSelector.prototype.number = 0; //starts at 0
		CircleSelector.prototype.circleDom = null;
		CircleSelector.prototype.radius = 8;
		CircleSelector.prototype.addCircle = function(num, isSelected) {
    	var newCircle = document.createElement('input');
    	newCircle.type="button";
    	this.isSelected = isSelected;
    	if (this.isSelected) newCircle.className = "selected";
    	this.number = num;
    	this.circleDom = newCircle;
    	return newCircle;
};
function addControls() {
		if(!controlsAdded)
			controlsAdded=false;
		else
			return;
    this.controls = document.getElementById('controls');
    this.circles = [];
    for (i = 0; i < slides.length; i++) {
        var circ = new CircleSelector();
        circles.push(circ);
        var theCircle = circ.addCircle(i, false);
        if (i === 0) theCircle = circ.addCircle(i, true);
        else {
            circles[i].circleDom.addEventListener('click', controlClicked,
                false);
            theCircle.style.marginLeft = "15px";
        }
        if (i != slides.length - 1) {
            theCircle.style.marginRight = "15px";
        }
        circles[i].circleDom = theCircle;
        controls.appendChild(theCircle);
    }
    controls.style.width = slides.length * 2 * circles[0].radius + (slides.length -
        1) * 30 + "px";
    controls.style.height = "30px";
    controls.style.margin = "0 auto";
}
function toggleArrowListener(state) {
    if (state) {
        leftArrow.addEventListener('click', toNext, false);
        leftArrow.style.opacity = '';
        rightArrow.addEventListener('click', toNext, false);
        rightArrow.style.opacity = '';
        var currentFocused = document.activeElement;
        if(currentFocused.tagName == 'BUTTON'){
        	currentFocused.blur();
        	}
    } else {
        leftArrow.removeEventListener('click', toNext, false);
        leftArrow.style.opacity = '0.3';
        rightArrow.removeEventListener('click', toNext, false);
        rightArrow.style.opacity = '0.3';
    }
	}
function changeSelection(newNum) { //changes circle selection brings back functionality
    for (i = 0; i < circles.length; i++) {
        if (i == newNum) {
            circles[i].isSelected = true;
            circles[i].circleDom.className = "bullet selected";
            circles[i].circleDom.removeEventListener('click',
                controlClicked, false);
        } else {
            circles[i].isSelected = false;
            circles[i].circleDom.className = "bullet";
            circles[i].circleDom.addEventListener('click', controlClicked,
                false);
        }
    }
    controls.style.opacity = "";
	}
function disableControls(){
		controls.style.opacity = "0.5";
    for (i = 0; i < circles.length; i++) circles[i].circleDom.removeEventListener(
        'click', controlClicked, false);
	}
	//quotes
	function setQuotes(){
		this.quoteWrap=document.getElementById('quoteWrap');
		this.quotes=[].slice.call(quoteWrap.getElementsByTagName('blockquote'));
		var afterQuote = "<span class=\"afterquote\"></span>";
		for(i=0;i<quotes.length;i++){
			//add after span
			quotes[i].innerHTML=quotes[i].innerHTML+afterQuote;
			}
		document.getElementById('nextQuote').addEventListener('click',changeQuote,false);
		this.currentQuoteIndex=0;
		changeQuote();
	}
function changeQuote(){
		if(currentQuoteIndex==quotes.length){
				swap(quotes,0,quotes.length-1);
				currentQuoteIndex=1;
			}		
		var randomQuote = Math.random()*(quotes.length-currentQuoteIndex) + currentQuoteIndex >> 0;
		for(i=0;i<quotes.length;i++){
			if(i!=randomQuote)
				quotes[i].className='slideHidden';
			else
				quotes[i].removeAttribute('class');
			}
		swap(quotes,randomQuote,currentQuoteIndex);
		currentQuoteIndex+=1;
	}