/// <reference types = "Cypress"/>

import { Login } from "../../support/modules/login/login";

const login = new Login;

describe('Manage mylerz portal Login', () =>
{
    beforeEach(() =>
    {
        cy.visit('/');
    });
    it('Valadate mylerz portal login using valid userName and password', { tags: "@smoke" }, () =>
    {
        login.userNameInput().should('be.enabled').type(Cypress.env('userName'));
        login.passwordInput().should('be.enabled').type(Cypress.env('password'));
        login.loginButton().should('be.visible').click();
        cy.location('pathname').should('eq', '/pickup');
    });
    it('validate mylerz portal login using valid username and invalid password', () =>
    {
        login.userNameInput().should('be.enabled').type(Cypress.env('userName'));
        login.passwordInput().should('be.enabled').type(Cypress.env('invalidPassword'));
        login.loginButton().should('be.visible').click();
        login.alertMessage().should('contain', 'Invalid username or password');
    });
    it('Validate mylerz portal login using invalid usreName and valid password', () =>
    {
        login.userNameInput().should('be.enabled').type(Cypress.env('invalidUserName'));
        login.passwordInput().should('be.enabled').type(Cypress.env('password'));
        login.loginButton().should('be.visible').click();
        login.alertMessage().should('contain', 'Invalid username or password');
    });
    it('Validate mylerz portal login without userName and password', () =>
    {
        login.userNameInput().should('be.enabled').clear();
        login.passwordInput().should('be.enabled').clear();
        login.loginButton().should('be.visible').click();
        cy.location('pathname').should('eq', '/login');
    });
});
