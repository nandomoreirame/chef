const sidebar = (function() {
  const accordions = document.getElementsByClassName('js-accordion');

  // Add click listeners to all the accordion triggers
  for (let i = 0; i < accordions.length; i++) {
    accordionTrigger = accordions[i].getElementsByClassName('js-accordion-trigger');

    for (let c = 0; c < accordionTrigger.length; c++) {
      accordionTrigger[c].addEventListener('click', toggleAccordion);
    }
  }

  function toggleAccordion(e) {
    e.preventDefault();
    accordionContent = this.nextElementSibling;
    accordionContent.classList.toggle('is-hidden');
  }
})();
