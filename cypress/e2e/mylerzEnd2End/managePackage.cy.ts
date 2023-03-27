/// <reference types = "Cypress"/>

import { AddPackage } from "../../support/modules/packages/addPackage";
import { Packages } from "../../support/modules/packages/packages";
import { SideMenu } from "../../support/modules/sideMenu/sideMenu";
import { generateRandomstring } from "../../support/modules/utilize/randamString";

const sideMenu = new SideMenu;
const packages = new Packages;
const addPackage = new AddPackage;
describe('Manage package', () =>
{
    beforeEach(() =>
    {
        cy.Login(Cypress.env('userName'), Cypress.env('password'));
    });
    describe('Validate create and edit package using add new button', () =>
    {
        it('Validate create and edit delivery same day "Door To Door" package', { tags: "@smoke" }, () =>
        {
            let packageBarCode: string;
            cy.intercept('POST', 'api/package/SavePackageList').as('package');
            const merchantName: string = 'End2EndMerchant';
            const pakageDescription = generateRandomstring('Description');
            const customerName = generateRandomstring('customerName');
            const customerStreet = generateRandomstring('Street');
            sideMenu.packagesButton().click();
            sideMenu.uploadPackagesButton().click();
            packages.merchantNameInput().should('be.enabled').type(merchantName);
            packages.merchantNameInput().should('be.visible').click();
            packages.merchantDrobDown().should('be.visible').click();
            packages.merchantPickupLocationDropDown().should('contain', merchantName);
            packages.addNewButton().should('be.visible').click();
            addPackage.serviceType().select('Door-to-Door');
            addPackage.packageService().select('Same Day');
            addPackage.servieCategory().select('Delivery');
            addPackage.paymentType().select('Pre-Paid');
            addPackage.packageDescriptionInput().type(pakageDescription);
            addPackage.consigneesDetails().click();
            addPackage.customerNameInput().type(customerName);
            addPackage.customerMobileInput().type('01000000000');
            addPackage.streetInput().type(customerStreet);
            addPackage.City().select('Giza');
            addPackage.Neighborhood().select('Dokki');
            addPackage.subZone().select('Dokki-26 July Axis');
            addPackage.addressCategory().select('Home');
            addPackage.saveAndCloseButton().click();
            packages.saveAndCloseButton().click();
            cy.wait('@package');
            cy.get('@package').then((res: any) =>
            {
                packageBarCode = res.response.body.Value.PackageList[0].BarCode;
                console.log(packageBarCode);
                cy.get('#mainSearch').type(packageBarCode);
                cy.get('.search-parent > .fa').click();
                cy.get('.mt-3 > :nth-child(6)').click();
            });

            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            cy.get('body > app-root > div.container-fluid.m-0 > div > div.main-content > package > app-packages-list > div:nth-child(5) > div:nth-child(1) > ul > li > app-package-summary > div > div > div.col-sm-12.info-block > a:nth-child(2)').click();


        });
    });
});