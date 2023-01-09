/// <reference types = "Cypress"/>

import { Login } from "../../support/modules/login/login";

const login = new Login;
describe('Manage Login', () =>
{
    beforeEach(() =>
    {
        cy.visit('/');

    });
    it('Valadate mylerz portal login using valid userName and password', () =>
    {
        login.userNameInput().type('hubsuper');
        login.passwordInput().type('P@ssw0rd');
        login.loginButton().click();
        cy.location('pathname').should('eq', '/pickup');

    });
});
