import '@testing-library/cypress/add-commands';

// const login = () => fetch("http://localhost:4000/api", {
//   "headers": 
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// }).then(resp => resp.json());

const headers = { "content-type": "application/json" };

const body = "{\"query\":\"mutation loginMutation($input: LoginInput!) {\\n  login(input: $input) {\\n    headerToken\\n    payloadToken\\n    combinedToken\\n    headerRefresh\\n    payloadRefresh\\n    combinedRefresh\\n  }\\n}\\n\",\"operationName\":\"loginMutation\",\"variables\":{\"input\":{\"login\":{\"email\":\"namefixture@mail.com\",\"password\":\"pw\"}}}}"


Cypress.Commands.add('login', () => {
  cy.window().then((window) => {
    cy.request({
      url: "http://localhost:4000/api",
      method: "POST",
      body,
      headers
    })
    .its("body")
    .then(({data}) => {
      window.localStorage['token'] = data.login.combinedToken
      window.localStorage['refresh'] = data.login.combinedRefresh
      // cy.reload()
    })
  })
});

Cypress.Commands.add('visitResetLink', () => {
  cy.request({
    url: "http://localhost:4000/email-api/emails.json"
  })
  .its("body")
  .then(entries => entries[0])
  .then(entry => {
    const regex = /href="(.*?)"/g
    const resetLink = regex.exec(entry.html_body)[1]
    cy.visit(resetLink)
  })
});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
