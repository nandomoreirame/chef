const sidebar = (function() {
  const accordions = document.getElementsByClassName('js-accordion');

  for (i = 0; i < accordions.length; i++) {
    accordionTrigger = accordions[i].getElementsByClassName('js-accordion-trigger');

    for (c = 0; c < accordionTrigger.length; c++) {
      accordionTrigger[c].addEventListener('click', toggleAccordion);
    }
  }

  function toggleAccordion(e) {
    e.preventDefault();
    accordionContent = this.parentNode;
    accordionContent.classList.toggle('is-active');
  }
})();
