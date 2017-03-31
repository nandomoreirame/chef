export default (() => {
  const accordions = document.getElementsByClassName('js-accordion')

  for (let i = 0; i < accordions.length; i++) {
    let accordionTrigger = accordions[i].getElementsByClassName('js-accordion-trigger')

    for (let c = 0; c < accordionTrigger.length; c++) {
      accordionTrigger[c].addEventListener('click', toggleAccordion)
    }
  }

  function toggleAccordion (e) {
    e.preventDefault()
    let accordionContent = this.parentNode
    accordionContent.classList.toggle('is-active')
  }
})()
