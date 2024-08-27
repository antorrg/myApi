document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector("#myCarousel");
    const items = carousel.querySelectorAll(".carousel-item");
    const indicators = carousel.querySelectorAll(".carousel-indicators button");
    const prevButton = carousel.querySelector(".carousel-control-prev");
    const nextButton = carousel.querySelector(".carousel-control-next");
    let currentIndex = 0;
    let intervalId = null;

    function updateCarousel() {
      items.forEach((item, index) => {
        item.classList.toggle("active", index === currentIndex);
        indicators[index].classList.toggle("active", index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = (index + items.length) % items.length;
      updateCarousel();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        goToSlide(index);
        resetInterval();
      });
    });

    prevButton.addEventListener("click", () => {
      prevSlide();
      resetInterval();
    });

    nextButton.addEventListener("click", () => {
      nextSlide();
      resetInterval();
    });

    function startInterval() {
      intervalId = setInterval(nextSlide, 5000); // Cambia de slide cada 5 segundos
    }

    function resetInterval() {
      clearInterval(intervalId);
      startInterval();
    }

    updateCarousel();
    startInterval();
  });
