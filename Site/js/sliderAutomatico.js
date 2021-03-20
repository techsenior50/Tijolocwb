var slideIndex = 0;
showSlidesX();

function showSlidesX() {
  var i;
  var slides = document.getElementsByClassName("meusSlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlidesX, 3000); // Troca a imagem a cada 3 segundos
}