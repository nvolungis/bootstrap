import '@testing-library/cypress/add-commands';

const body = {
  query: `mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      headerToken
      payloadToken
      combinedToken
      headerRefresh
      payloadRefresh
      combinedRefresh
    }
  }`,
  operationName: "loginMutation",
  variables: {input: {login:{email:"namefixture@mail.com","password":"pw"}}}
};

Cypress.Commands.add('login', () => {
  cy.window().then((window) => {
    cy.request({
      url: "http://localhost:4000/api",
      method: "POST",
      body,
      headers: { "content-type": "application/json" }
    })
    .its("body")
    .then(({data}) => {
      const {email, name} = JSON.parse(atob(data.login.payloadToken));
      window.localStorage['token'] = data.login.combinedToken
      window.localStorage['refresh'] = data.login.combinedRefresh
      window.localStorage['email'] = email
      window.localStorage['name'] = name
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
