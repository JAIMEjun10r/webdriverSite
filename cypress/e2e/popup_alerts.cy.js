/// <reference types="cypress" />
describe('Lidando com Popups e Alerts', () => {
  beforeEach(() => {
    cy.visit('/Popup-Alerts/index.html')
  });
  it('Javascript Alert', () => {
    cy.get('#button1')
      .click()
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('I am an alert box!')
    })
  })

  it('Modal Popup', () => {
    cy.get('#button2')
      .click()
    // Removing whitespace from the beginning and end of the string (just for fun)
    cy.get('.modal-body').invoke('text').then((text) => {
      const txtEsperado = 'We can inject and use JavaScript code if all else fails! Remember always try to use WebDriver Library method(s) first such as WebElement.click(). (The Selenium development team have spent allot of time developing WebDriver functions etc).'
      const txtNaPagina = text.trim()

      expect(txtNaPagina).to.equal(txtEsperado)
    })
    cy.get('.modal-content')
      .find('.modal-footer')
      .contains('Close')
      .click()
  })

  // Gleb has refactore this code. 
  it('Outra maneira para o Modal Popup', () => {
    cy.intercept('/**').as('googleAnalytics');
    cy.get('p > a')
      .click()
    cy.get('.loader')
      .should('not.exist')
    cy.wait('@googleAnalytics')
    cy.get('#button1 > p')
      .click()
    //I have created this function just for fun (it was to show to a friendo of mine)
    cy.get('.modal-body').invoke('text').then((text) => {
      const txtEsperado = 'The waiting game can be a tricky one; this exercise will hopefully improve your understandings of the various types of waits.'
      const txtNaPagina = text.trim()

      expect(txtNaPagina).to.equal(txtEsperado)
    })
    cy.contains('Close')
      .click()

  });

  it('Javascript ConfirmBox - Pressing Cancel - I have never done it like this before', () => {
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(false);
    });

    // Clica no botão que aciona a Confirm Box
    cy.get('#button4').click();
    const algo = 'Press a button!'

    // Espera pela execução do stub
    cy.window().its('confirm').should('have.been.calledOnceWith', algo);

    // Asserts relacionados à mensagem após pressionar Cancelar
      const txtCancelar = 'You pressed Cancel!';
      cy.get('#confirm-alert-text').should('be.visible').and('contain', txtCancelar)
  })

  it.only('Javascript ConfirmBox - Pressing Cancel - I have always done it this way', () => {
    cy.get('#button4').click()
    cy.on('window:confirm', () => false)
    
    const txtConfirm = 'You pressed Cancel!'
    cy.contains('#confirm-alert-text', txtConfirm).should('be.visible')
  })

  it.only('Javascript ConfirmBox - Accepting', () => {
    cy.get('#button4').click()
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Press a button!')
    })
    const txtConfirm = 'You pressed OK!'
    cy.contains('#confirm-alert-text', txtConfirm).should('be.visible')
  })

})

  
