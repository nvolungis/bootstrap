/// <reference types="cypress" />

context('account actions', () => {
  it('user can log in', () => {
    cy.task('run', 'mix seed_user')
    cy.visit('/')
    cy.location('pathname').should('include', '/login')
    cy.findByLabelText('Email').type('namefixture@mail.com')
    cy.findByLabelText('Password').type('pw')
    cy.findByText('Submit').click()
    cy.contains("Dashboard")
  })

  it('user can log out', () => {
    cy.task('run', 'mix seed_user')
    cy.login()
    cy.visit('/')
    cy.findByText('Logout').click()
    cy.location('pathname').should('include', '/login')
    cy.contains("Login")
  })

  it('user can sign up', () => {
    cy.visit('/')
    cy.findByText('Sign Up').click()
    cy.location('pathname').should('include', '/signup')
    cy.findByLabelText('Name').type('signup name')
    cy.findByLabelText('Email').type('signupfixture@mail.com')
    cy.findByLabelText('Password').type('pw')
    cy.findByText('Submit').click()
    cy.contains("User signupfixture@mail.com created")
    cy.location('pathname').should('include', '/login')
  })

  it('three incorrect logins shows reset prompt', () => {
    cy.task('run', 'mix seed_user')
    cy.visit('/')

    // fill out login incorrectly
    cy.findByLabelText('Email').type('namefixture@mail.com')
    cy.findByLabelText('Password').type('wrongpw')
    cy.findByText('Submit').click().wait(100)
    cy.contains('Incorrect login credentials')
    cy.findByLabelText('Password').type('a')
    cy.findByText('Submit').click().wait(100)
    cy.findByLabelText('Password').type('b')
    cy.findByText('Submit').click().wait(100)
    cy.contains('Trouble logging in?')
    cy.findByText('Resetting password').click()
    cy.location('pathname').should('include', '/generate-reset-token')
  });

  it('allows users to reset password', () => {
    cy.task('run', 'mix seed_user')
    cy.visit('/generate-reset-token')

    // fill out login incorrectly
    cy.findByLabelText('Email').type('namefixture@mail.com')
    cy.findByText('Submit').click().wait(100)
    cy.contains('instructions')

    // get the link from an email api and visit it
    cy.visitResetLink()

    // create a new password
    cy.findByLabelText('Password').type('newpw')
    cy.findByLabelText('Confirm').type('newpw')
    cy.findByText('Submit').click()
    cy.contains('Password for namefixture@mail.com has been reset')

    // verify we can log in with the new pw
    cy.findByLabelText('Email').type('namefixture@mail.com')
    cy.findByLabelText('Password').type('newpw')
    cy.findByText('Submit').click()
    cy.contains("Dashboard")
  });
});
