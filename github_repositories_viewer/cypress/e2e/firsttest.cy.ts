describe('My First Test', () => {

it('Test search user and history', () => {
  cy.visit('localhost:5173');
  cy.get('[data-cy="search_txt"]').type("jirisuster")
  cy.get('[data-cy="search_btn"]').click()
  cy.get('[data-cy="username"]').should('exist')
  cy.get('[data-cy="history_route"]').click()
  cy.get('[data-cy="image"]').should('exist')
  cy.get('[data-cy="image"]').click()
  cy.get('[data-cy="repo"]').should('exist')
  cy.get('[data-cy="repo"]').first().click()
  cy.get('[data-cy="redirect"]').should('exist')
  cy.get('[data-cy="redirect"]').first().click()
  //cy.location('host').should('eq', 'github.com'); not possible because different origin
  cy.origin('https://github.com', () => { //fix recommended directly by cypress
    cy.location('host').should('eq', 'github.com');
  });

})

});
