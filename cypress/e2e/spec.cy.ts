describe('Search page', () => {
  it('contains search bar', () => {
    cy.visit('http://localhost:3000');
    cy.get('input');
  });

  it('shows a loading spinner when a character is typed', () => {
    cy.visit('http://localhost:3000');
    const spinner = cy.get('.spinner-border');
    spinner.should('not.be.visible');
    cy.get('input').type('a');
    spinner.should('be.visible');
  });

  it('shows search results when typing', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').type('France');
    const countries = cy.get('.search-dropdown-menu').contains('Countries').nextAll('li');
    countries.should('have.length', 1);
    countries.contains('France');
  });

  it('hides search results when clicking clear button', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').type('France');
    const results = cy.get('.search-dropdown-menu').get('li');
    results.should('have.length.gt', 0);
    cy.get('.fa-close').click();
    results.should('have.length.gt', 0);
  });

  it('redirects to country page when clicked', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').type('France');
    const france = cy.get('.search-dropdown-menu').contains('Countries').nextAll('li');
    france.click();
    cy.location('pathname').should('match', /\/countries\/[a-z0-9]{24}/);
    cy.contains('France');
  });

  // TODO Many other things
});
