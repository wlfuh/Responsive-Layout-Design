# Responsive-Layout-Design
A template of a web page design that changes based on screen size.
<script>
    var links = document.querySelectorAll( '.post-content a' );  
    for (var i = 0, length = links.length; i < length; i++) {  
        if (links[i].hostname != window.location.hostname) {
            links[i].target = '_blank';
        }
    }
</script>
<b>Features of this page include:</b>
<ul>
<li> Text Resizer </li>
<li> Custom Google Search </li>
<li> Responsive Navigation with changing layouts for different resolutions </li>
<li> Sticky Navigation Bar that stays on the top of the page </li>
<li> Image Slider <br>
<ul>
<li> Left and right arrows for transitioning</li>
<li> Bottom bullet navigation to skip to specific slide </li>
<li> Fade in and out transition using mouse click </li>
<li> Slide in and out transition using touch swipe </li>
</ul>
</li>
<li> Embedded Facebook Feed </li>
<li> Randomized Quote Generator (from a selection) </li>
<li> Back to top button </li>
</ul>
</br>
To see the page live click <a target="_blank" href="http://abri-sports.com/william/Responsive/">here</a>.
</br>
You may borrow code from this design, but <b> do not </b> use for business purposes.
