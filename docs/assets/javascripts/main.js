//= include prism/prism.js

(function () {
  'use strict';

  var accordions, i;

  if (!document.querySelectorAll || !document.body.classList)
    return;

  function makeAccordion(accordion) {
    var targets, currentTarget, i;

    targets = accordion.querySelectorAll('.js-accordion');

    for(i = 0; i < targets.length; i++) {
      targets[i].addEventListener('click', function () {
        console.log(currentTarget);
        if (currentTarget)
          currentTarget.classList.remove('is-open');

        currentTarget = this.parentNode;
        currentTarget.classList.add('is-open');
      }, false);
    }

    // accordion.classList.add('js');
  }

  accordions = document.querySelectorAll('.js-accordion');

  for(i = 0; i < accordions.length; i++) {
    makeAccordion(accordions[i]);
  }

})();
