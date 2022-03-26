describe('basic application functionality', () => {
  it('opens the page', () => {
    cy.visit('/');
    cy.get('div#app');
    cy.get('header').should('include.text', 'Yoyo Pets App');
  });

  it('shows loading message when waiting for api response', () => {
    cy.intercept('pets', (req) => {
      req.continue(res => {
        res.delay = 1000;
        res.send();
      });
    });

    cy.visit('/');
    cy.get('[data-cypress="loading-indicator"]');
  });

  it('shows error message when api request is not successful', () => {
    cy.intercept('pets', { statusCode: 500 });

    cy.visit('/');
    cy.get('[data-cypress="error-banner"]');
  });

  it('refreshing app with successful response clears out the error', () => {
    cy.reload();
    cy.get('[data-cypress="error-banner"]').should('not.exist');
  });

  it('shows pets in groups', () => {
    cy.get('[data-cypress="pet-group"]').should('have.length', 3);
  });

  it('shows 3 cards in bird group', () => {
    cy.get('[data-cypress-secondary="bird-group"]').children().should('have.length', 3);
  });

  it('shows adaptability and maintenance ranks in pet card', () => {
    cy.get('[data-cypress-secondary="bird-group"]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-cypress="adaptability-rate"]');
        cy.get('[data-cypress="maintenance-rate"]');
      })
  });
});
