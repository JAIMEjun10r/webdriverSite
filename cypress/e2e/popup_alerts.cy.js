/// <reference types="cypress" />
describe('Lidando com Popups e Alerts', () => {
  beforeEach(() => {
    cy.visit('/Popup-Alerts/index.html')
  })

  // need to ensure the alert actually happens
  it('Javascript Alert', () => {
    cy.get('#button1').click()

    const text = 'I am an alert box!'
    cy.on('window:alert', cy.stub().as('alert'))
    cy.get('@alert', { timeout: 1000 }).should('have.been.calledOnceWith', text)
  })

  // refactor to use cy.contains command
  // and confirm the dialog disappears when closed
  it('Modal Popup', () => {
    cy.get('#button2').click()
    // Removendo espaços em branco do início e do final da string
    const txtEsperado =
      'We can inject and use JavaScript code if all else fails! Remember always try to use WebDriver Library method(s) first such as WebElement.click(). (The Selenium development team have spent allot of time developing WebDriver functions etc).'
    cy.contains('.modal-body', txtEsperado).should('be.visible')
    cy.get('.modal-content')
      .find('.modal-footer')
      .contains('button', 'Close')
      .click()
    cy.get('.modal-body').should('not.be.visible')
  })

  // use a better selector for to click the ajax loader
  // confirm the loader is visible before checking that it does not exist
  // use precise network matcher for google analytics, otherwise everything matches
  // use cy.contains command
  // use precise selector for the close button
  // confirm the modal does not exist after closing it
  it('Outra maneira para o Modal Popup', () => {
    cy.intercept({
      hostname: 'www.google-analytics.com',
    }).as('googleAnalytics')
    cy.contains('.thumbnail', 'Ajax Loader').find('a').click()
    cy.get('#loader').should('be.visible')
    cy.get('#loader').should('not.be.visible')
    cy.wait('@googleAnalytics')
    cy.contains('#button1', 'CLICK ME!').click()
    const txtEsperado =
      'The waiting game can be a tricky one; this exercise will hopefully improve your understandings of the various types of waits.'
    cy.contains('.modal-body', txtEsperado).should('be.visible').wait(1000)
    cy.contains('button', 'Close').click()
    cy.contains('.modal-body').should('not.exist')
  })
})