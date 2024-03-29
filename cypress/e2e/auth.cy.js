/// <reference types="Cypress" />


describe('Authentication', () =>{
    beforeEach(() =>{
        cy.task('seedDatabase')
      })
it('should register a user', ()=>{
    cy.visit('/signup')
    cy.get('[data-cy="auth-email"]').click()
    cy.get('[data-cy="auth-email"]').type('testingemail@example.com')
    cy.get('[data-cy="auth-password"]').type('testpassword')
    cy.get('[data-cy="auth-submit"]').click()
    cy.location('pathname').should('eq', "/takeaways");
    cy.getCookie('__session').its('value').should('not.be.empty')
})


it('should login a user', ()=>{
    cy.visit('/login')
    cy.get('[data-cy="auth-email"]').click()
    cy.get('[data-cy="auth-email"]').type('test@example.com')
    cy.get('[data-cy="auth-password"]').type('testpassword')
    cy.get('[data-cy="auth-submit"]').click()
    cy.location('pathname').should('eq', "/takeaways");
    cy.getCookie('__session').its('value').should('not.be.empty')
})

it('should logout a user', ()=>{
    cy.login()

    cy.contains('Logout').click()
    cy.location('pathname').should('eq', '/');
    cy.getCookie('__session').its('value').should('be.empty')

})
})


// End of Cypress for now, Will revisit later


// You can also target the element by findByPlaceholderText()

You can also use cy.log() instead of console.log() to make sure that the tests 
run synchronously

