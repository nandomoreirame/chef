const Sidebar = (() => {
  let accordionTrigger
  let accordionContent

  const accordions = document.getElementsByClassName('js-accordion')

  for (let i = 0; i < accordions.length; i++) {
    accordionTrigger = accordions[i].getElementsByClassName('js-accordion-trigger')

    for (let c = 0; c < accordionTrigger.length; c++) {
      accordionTrigger[c].addEventListener('click', toggleAccordion)
    }
  }

  function toggleAccordion (e) {
    e.preventDefault()
    accordionContent = this.parentNode
    accordionContent.classList.toggle('is-active')
  }
})()

module.exports = Sidebar
