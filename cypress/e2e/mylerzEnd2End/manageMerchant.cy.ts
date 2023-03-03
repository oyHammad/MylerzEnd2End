/// <reference types = "Cypress"/>

import { AddMerchant } from "../../support/modules/merchant/addMerchant";
import { EditMerchant } from "../../support/modules/merchant/editMerchant";
import { Merchants } from "../../support/modules/merchant/merchant";
import { generateRandamEmail, generateRandomstring } from "../../support/modules/utilize/randamString";

const merchants = new Merchants();
const addMerchant = new AddMerchant();
const editMerchant = new EditMerchant;
const merchantName = generateRandomstring('merchantName');
const merchantDisplatName = generateRandomstring(' merchantDisplayName');
const userName = generateRandomstring('userName');
const email = generateRandamEmail();
const pickupLocation = generateRandomstring('pickupLocation');
const position = generateRandomstring('position');
const fullName = generateRandomstring('fullName');
const fullAddress = generateRandomstring('Address');
describe('Manage add and edit merchant ', () =>
{
    beforeEach(() =>
    {
        cy.Login(Cypress.env('userName'), Cypress.env('password'));
    });
    it('Add and edit new merchant', { tags: "@smoke" }, () =>
    {
        merchants.merchants().should('be.visible').click();
        merchants.addNewMerchantButton().should('be.visible').click();
        addMerchant.merchantNameInput().should('be.enabled').type(merchantName);
        addMerchant.merchantDisplayNameInput().should('be.enabled').type(merchantDisplatName);
        addMerchant.businessCategory().should('be.visible').select('Individual');
        addMerchant.usernameInput().should('be.enabled').type(userName);
        addMerchant.emailInput().should('be.enabled').type(email);
        addMerchant.pickupLocationInput().should('be.enabled').type(pickupLocation);
        addMerchant.fullAddressInput().should('be.enabled').type(fullAddress);
        addMerchant.city().should('be.visible').select('Giza');
        addMerchant.zone().should('be.visible').select('Dokki');
        addMerchant.subZone().select('Dokki-26 July Axis');
        addMerchant.latInput().should('be.enabled').type('31.280278');
        addMerchant.longInput().should('be.enabled').type('30.081955');
        addMerchant.positioninput().should('be.enabled').type(position);
        addMerchant.fullNameinput().should('be.enabled').type(fullName);
        addMerchant.phoneInput().should('be.enabled').type('01000000000');
        addMerchant.checkboxTerms().click();
        addMerchant.savebutton().should('be.enabled').click();

        merchants.merchants().click();
        merchants.searchInput().type(merchantName).then(() =>
        {
            cy.contains("tbody tr td", merchantName).click();
        });

        editMerchant.merchantNationalIdInput().should('be.enabled').type('28512121111111');
        editMerchant.savebutton().should('be.enabled').click();
        cy.get('[role="document"]').should('contain', 'Merchant Edited');
    });
});