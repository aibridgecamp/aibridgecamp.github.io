const wrapper = document.querySelector(".main");

(function fadeArrowIcon() {
  const arrowIcon = document.querySelector(".down-arrow");

  wrapper.addEventListener("scroll", () => {
    var scrollAmount = wrapper.scrollTop;
    if (scrollAmount > 200) {
      arrowIcon.style.opacity = 0;
      arrowIcon.style.bottom = "-100px";
    } else {
      arrowIcon.style.opacity = 1;
      arrowIcon.style.bottom = 0;
    }
  });
})();



(function showInView() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }

  wrapper.addEventListener('scroll', () => {
    elements.forEach((element) => {
      if (isElementInView(element)) {
        element.classList.add('show');
      }
    });
  });
})();