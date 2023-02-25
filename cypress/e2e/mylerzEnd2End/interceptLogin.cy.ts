/// <reference types = "Cypress"/>

import { Login } from "../../support/modules/login/login";

const login = new Login;
describe("", () =>
{

    beforeEach(() =>
    {
        // cy.intercept('./login?').as("login");
        // cy.Login(Cypress.env('userName'), Cypress.env('password'));
        // cy.wait('@login');
        cy.visit('/');

    });
    it("", () =>
    {
        cy.intercept("POST", "/Token").as('Token');
        login.userNameInput().should('be.enabled').type(Cypress.env('userName'));
        login.passwordInput().should('be.enabled').type(Cypress.env('password'));
        login.loginButton().should('be.visible').click();
        cy.wait('@Token');

        cy.get('@Token').then((res: any) =>
        {
            cy.log(res);
            console.log(res);
            let responceBody = res.response?.body;
            expect(responceBody.access_token).not.to.null;
            expect(res.response.statusCode).to.eq(200);
            expect(responceBody.userName).to.eq("HUBSuper");
        });
        cy.location('pathname').should('eq', '/pickup');
    });
    it("", () =>
    {
        cy.intercept("POST", "/Token", (req) =>
        {
            req.body = "grant_type=password&username=MylerzTest&password=Ot@123456";


        }).as('Token');
        login.userNameInput().should('be.enabled').type(Cypress.env('userName'));
        login.passwordInput().should('be.enabled').type(Cypress.env('password'));
        login.loginButton().should('be.visible').click();
        cy.wait('@Token');

        cy.get('@Token').then((res: any) =>
        {
            cy.log(res);
            console.log(res);
            let responceBody = res.response?.body;
            expect(responceBody.access_token).not.to.null;
            expect(res.response.statusCode).to.eq(200);
            expect(responceBody.userName).to.eq("MylerzTest");
        });
        cy.location('pathname').should('eq', '/pickup');
    });
});