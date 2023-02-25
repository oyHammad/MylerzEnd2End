/// <reference types="cypress" />


// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.on('uncaught:exception', (err, runnable) =>
{
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

Cypress.Commands.add('Login', (userName: string, password: string) =>
{
    cy.visit('https://test.egypt.mylerz.com/login');
    cy.get('#userName').type(userName);
    cy.get('#password').type(password);
    cy.contains('button', 'Login').click();
    cy.location('pathname').should('eq', '/pickup');
});
Cypress.Commands.add("getByPlaceholder", (input: string) =>
{
    /**
 * Get DOM element based on placeholder text value
 * @param input placeholder text value
 */
    return cy.get(`[placeholder="${input}"]`);
});

import 'cypress-file-upload';
