/// <reference types="cypress" />

context('navigation', () => {
  it('user sees correct logged-out state', () => {
    cy.visit('/')
    cy.location('pathname').should('include', '/login')
    cy.contains("Login")
    cy.contains("Sign Up")
  })

  it('user sees correct logged-in state', () => {
    cy.task('run', 'mix seed_user')
    cy.login()
    cy.visit('/')
    cy.location('pathname').should('equal', '/')
    cy.contains("Logout")
    cy.contains("Dash")
    cy.contains("namefixture@mail.com")
  });
});
