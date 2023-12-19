/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() =>{
    cy.task('seedDatabase')
  })
  it('should display a list of fetched takeaways', () => {
    cy.visit('/')
    cy.get('[data-cy= "takeaway-item"]').should('have.length', 2)
  });

  it('should add a new takeaway', ()=>{
    cy.intercept('POST', '/takeaways/new*', 'success').as('createTakeaways')
    cy.login()
    cy.contains('Add a new takeaway').click()
    cy.visit('/takeaways/new')
    cy.get('[data-cy="title"]').click()

    cy.get('[data-cy="title"]').type("Newtitle")
    cy.get('[data-cy="body"]').type("NewBody")
    cy.contains('Create').click()

    cy.wait('@createTakeaways')
    .its('request.body')
    .should('match', /Newtitle.*NewBody/)

  })
});