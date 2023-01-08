/// <reference types = "Cypress"/>

import { config } from "cypress/types/bluebird";

1;
describe('Manage Login', () =>
{
    beforeEach(() =>
    {
        cy.visit('/');
    });
    it('Valadate mylerz portal login using valid userName and password', () =>
    {
        cy.get('#userName').type('hubsuper');
        cy.get('#password').type('P@ssw0rd');
        cy.contains('button', 'Login').click();
    });
});
