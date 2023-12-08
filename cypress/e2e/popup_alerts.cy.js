/// <reference types="cypress" />
describe('Lidando com Popups e Alerts', () => {
  beforeEach(() => {
    cy.visit('/Popup-Alerts/index.html')
  });

  //Gleb has refactored this code
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

  // Gleb has refactored this code. Don't write code like that
  it('Outra maneira para o Modal Popup', () => {
    cy.intercept('/**').as('googleAnalytics');
    cy.get('p > a')
      .click()
    cy.get('.loader')
      .should('not.exist')
    cy.wait('@googleAnalytics')
    cy.get('#button1 > p')
      .click()
    //I have created this function just for fun (it was to show it to a friend of mine)
    cy.get('.modal-body').invoke('text').then((text) => {
      const txtEsperado = 'The waiting game can be a tricky one; this exercise will hopefully improve your understandings of the various types of waits.'
      const txtNaPagina = text.trim()

      expect(txtNaPagina).to.equal(txtEsperado)
    })
    cy.contains('Close')
      .click()

  });


  // I have never done it like this before
  it('Javascript ConfirmBox - Pressing Cancel', () => {
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(false);
    });

    // Clica no botão que aciona a Confirm Box
    cy.get('#button4').click();
    const msg = 'Press a button!'

    // Espera pela execução do stub
    cy.window().its('confirm').should('have.been.calledOnceWith', msg);

    // Asserts relacionadas à mensagem após pressionar Cancelar
      const txtCancelar = 'You pressed Cancel!';
      cy.get('#confirm-alert-text').should('be.visible').and('contain', txtCancelar)
  })


  // I have always done it this way
  it('Javascript ConfirmBox - Pressing Cancel - That is the way I have been doing', () => {
    cy.get('#button4').click()
    cy.on('window:confirm', () => false)

    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Press a button!')
    })
    
    const txtConfirm = 'You pressed Cancel!'
    cy.contains('#confirm-alert-text', txtConfirm).should('be.visible')
  })

  // I have always done it this way
  it('Javascript ConfirmBox - Accepting', () => {
    cy.get('#button4').click()
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Press a button!')
    })
    const txtConfirm = 'You pressed OK!'
    cy.contains('#confirm-alert-text', txtConfirm).should('be.visible')
  })

})

  
