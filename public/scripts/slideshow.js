var slideIndex = 1;
var autoAdvance;
showSlides(slideIndex);

function advanceSlide() {
    showSlides(slideIndex += 1);
}

function backSlide() {
    showSlides(slideIndex -= 1);
}

function showSlides(n, time) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1; /* loop back to start*/
  } 
  if (n < 1) { /* loop to end*/
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; /* only display one slide at a time */
  }
  slides[slideIndex-1].style.display = "block"; /* display same slide as the index corresponds to */
  window.clearInterval(autoAdvance); /* reset so only one interval ever set */
  autoAdvance = setInterval(advanceSlide, 6000) /* auto-advance every six seconds */
}