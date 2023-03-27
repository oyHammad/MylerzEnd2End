/// <reference types = "Cypress"/>

import { AddNewResource } from "../../support/modules/resources/addNewResouce";
import { EditNewResource } from "../../support/modules/resources/editNewResouce";
import { Resources } from "../../support/modules/resources/Resources";
import { SideMenu } from "../../support/modules/sideMenu/sideMenu";
import { generateRandamEmail, generateRandomNationalID, generateRandomstring } from "../../support/modules/utilize/randamString";

const sideMenu = new SideMenu;
const resources = new Resources;
const addNewResource = new AddNewResource;
const editNewResoure = new EditNewResource;
const firstName = generateRandomstring('First');
const middleName = generateRandomstring('Middle');
const lastName = generateRandomstring('Last');
const email = generateRandamEmail();
const nationalID = generateRandomNationalID();
const userName = generateRandomstring('userName');
const editUserName = generateRandomstring('editUserName');
describe('Manage Resources', () =>
{
    beforeEach(() =>
    {
        cy.Login(Cypress.env('userName'), Cypress.env('password'));
    });
    it('Validate create and edit new staff member', () =>
    {
        cy.step('Open Resources module');
        sideMenu.ResourcesButton().should('be.visible').click();
        sideMenu.staffButton().should('be.visible').click();

        cy.step('open the new staff member form');
        resources.addNewButton().click();

        cy.step('fulfil the new member information');
        addNewResource.firstNameInput().should('be.enabled').type(firstName);
        addNewResource.middleNameInput().should('be.enabled').type(middleName);
        addNewResource.lastNameInput().should('be.enabled').type(lastName);
        addNewResource.permittedHubs().click();
        addNewResource.allHubs().click();
        addNewResource.staffRole().click();
        addNewResource.rolesDropDownList().invoke('attr', 'type').then(() =>
        {
            cy.get('div:nth-child(3) > ul > li:nth-child(2) > label').click();
        });
        addNewResource.contactTelephoneInput().type('01000000000');
        addNewResource.emailInput().should('be.enabled').type(email);
        addNewResource.nationalIDInput().should('be.enabled').type(nationalID);
        addNewResource.userNameInput().should('be.enabled').type(userName);
        addNewResource.passwordInput().should('be.enabled').type(Cypress.env('userPassword'));
        addNewResource.confirmPasswordInput().should('be.enabled').type(Cypress.env('userConfirmPassword'));
        addNewResource.confirmButton().should('be.visible').click();
        resources.alertMessage().invoke('text').should('include', 'Member is added successfully ');
        resources.closeAlertButton().click();

        cy.step('Edit the new member');
        resources.searchInput().type(userName);
        resources.searchButton().click();
        resources.ellipseButton().click();
        resources.editButton().click();
        editNewResoure.userNameInput()
            .clear()
            .type(editUserName);
        editNewResoure.confirmButton().click();
        resources.alertMessage().invoke('text').should('include', 'updated successfully');
    });
});