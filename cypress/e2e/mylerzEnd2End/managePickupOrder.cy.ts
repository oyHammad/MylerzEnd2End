///<reference types="Cypress"/>

import { PickupOrder } from "../../support/modules/pickupOrders/addPickupOrder";
import EditPickupOrder from "../../support/modules/pickupOrders/editPickupOrder";
import { PickupOrders } from "../../support/modules/pickupOrders/pickupOrders";
import { generateRandomstring } from "../../support/modules/utilize/randamString";

const pickupOrders = new PickupOrders;
const pickupOrder = new PickupOrder;
const editPickupOrder = new EditPickupOrder;

describe('Manage create and edit pickup order', () =>
{
    beforeEach(() =>
    {
        cy.Login(Cypress.env('userName'), Cypress.env('password'));
    });
    describe('Manage create and edit pickup order useing add new button', () =>
    {
        it('Add and edit delivery same day "Door To Door" pickup order', { tags: "@smoke" }, () =>
        {
            const merchantName: string = "End2EndMerchant";
            const pkgDescription = generateRandomstring('Description');
            const customerName = generateRandomstring('CustomerName');
            const customerStreet = generateRandomstring('CustomerStreet');
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.addNewPickupOrderButton().should('be.visible').click();
            pickupOrder.serviceType().should('be.enabled').select('Door-to-Door');
            pickupOrder.PackageService().should('be.enabled').select('Same Day');
            pickupOrder.PaymentType().should('be.enabled').select('Pre-Paid');
            pickupOrder.ServieCategory().should('be.enabled').select('Delivery');
            pickupOrder.packageDescription().should('be.enabled').type(pkgDescription);
            pickupOrder.consigneesDetails().should('be.visible').click();
            pickupOrder.customerName().should('be.enabled').type(customerName);
            pickupOrder.customerMobile().should('be.enabled').type('01000000000');
            pickupOrder.customerStreet().should('be.enabled').type(customerStreet);
            pickupOrder.City().should('be.enabled').select('Giza');
            pickupOrder.Neighborhood().should('be.enabled').select('Haram');
            pickupOrder.subZone().should('be.enabled').select('Haram');
            pickupOrder.AddressCategory().should('be.enabled').select('Home');
            pickupOrder.saveAndCloseButton().should('be.visible').click();
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().should('be.visible').click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Add and edit delivery same day "Door To Counter" pickup order', () =>
        {
            const merchantName: string = "End2EndMerchant";
            const pkgDescription = generateRandomstring('Description');
            const customerName = generateRandomstring('CustomerName');
            const customerStreet = generateRandomstring('CustomerStreet');
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.addNewPickupOrderButton().should('be.visible').click();
            pickupOrder.serviceType().should('be.enabled').select('Door-to-Counter');
            pickupOrder.PackageService().should('be.enabled').select('Same Day');
            pickupOrder.PaymentType().should('be.enabled').select('Pre-Paid');
            pickupOrder.ServieCategory().should('be.enabled').select('Delivery');
            pickupOrder.packageDescription().should('be.enabled').type(pkgDescription);
            pickupOrder.consigneesDetails().should('be.visible').click();
            pickupOrder.customerName().should('be.enabled').type(customerName);
            pickupOrder.customerMobile().should('be.enabled').type('01000000000');
            pickupOrder.customerStreet().should('be.enabled').type(customerStreet);
            pickupOrder.City().should('be.enabled').select('Giza');
            pickupOrder.Neighborhood().should('be.enabled').select('Haram');
            pickupOrder.subZone().should('be.enabled').select('Haram');
            pickupOrder.AddressCategory().should('be.enabled').select('Home');
            pickupOrder.saveAndCloseButton().should('be.visible').click();
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().should('be.visible').click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().should('be.visible').click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);

        });
        it('Add and edit delivery next day "Door To Door" pickup order', () =>
        {
            const merchantName: string = "End2EndMerchant";
            const pkgDescription = generateRandomstring('Description');
            const customerName = generateRandomstring('CustomerName');
            const customerStreet = generateRandomstring('CustomerStreet');
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.addNewPickupOrderButton().should('be.visible').click();
            pickupOrder.serviceType().should('be.enabled').select('Door-to-Door');
            pickupOrder.PackageService().should('be.enabled').select('Next Day');
            pickupOrder.PaymentType().should('be.enabled').select('Cash-On-Delivery');
            pickupOrder.COD().should('be.enabled').type('100');
            pickupOrder.ServieCategory().should('be.enabled').select('Delivery');
            pickupOrder.packageDescription().should('be.enabled').type(pkgDescription);
            pickupOrder.consigneesDetails().should('be.visible').click();
            pickupOrder.customerName().should('be.enabled').type(customerName);
            pickupOrder.customerMobile().should('be.enabled').type('01000000000');
            pickupOrder.customerStreet().should('be.enabled').type(customerStreet);
            pickupOrder.City().should('be.enabled').select('Giza');
            pickupOrder.Neighborhood().should('be.enabled').select('Haram');
            pickupOrder.subZone().should('be.enabled').select('Haram');
            pickupOrder.AddressCategory().should('be.enabled').select('Home');
            pickupOrder.saveAndCloseButton().should('be.visible').click();
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().should('be.visible').click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Add and edit delivery next day "Door To Counter" pickup order', () =>
        {
            const merchantName: string = "End2EndMerchant";
            const pkgDescription = generateRandomstring('Description');
            const customerName = generateRandomstring('CustomerName');
            const customerStreet = generateRandomstring('CustomerStreet');
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.addNewPickupOrderButton().should('be.visible').click();
            pickupOrder.serviceType().should('be.enabled').select('Door-to-Counter');
            pickupOrder.PackageService().should('be.enabled').select('Next Day');
            pickupOrder.PaymentType().should('be.enabled').select('Cash-On-Delivery');
            pickupOrder.COD().should('be.enabled').type('100');
            pickupOrder.ServieCategory().should('be.enabled').select('Delivery');
            pickupOrder.packageDescription().should('be.enabled').type(pkgDescription);
            pickupOrder.consigneesDetails().should('be.visible').click();
            pickupOrder.customerName().should('be.enabled').type(customerName);
            pickupOrder.customerMobile().should('be.enabled').type('01000000000');
            pickupOrder.customerStreet().should('be.enabled').type(customerStreet);
            pickupOrder.City().should('be.enabled').select('Giza');
            pickupOrder.Neighborhood().should('be.enabled').select('Haram');
            pickupOrder.subZone().should('be.enabled').select('Haram');
            pickupOrder.AddressCategory().should('be.enabled').select('Home');
            pickupOrder.saveAndCloseButton().should('be.visible').click();
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().should('be.visible').click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Add and edit return same day "Door To Door" pickup order', () =>
        {
            const merchantName: string = "End2EndMerchant";
            const pkgDescription = generateRandomstring('Description');
            const customerName = generateRandomstring('CustomerName');
            const customerStreet = generateRandomstring('CustomerStreet');
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.addNewPickupOrderButton().should('be.visible').click();
            pickupOrder.serviceType().should('be.enabled').select('Door-to-Door');
            pickupOrder.PackageService().should('be.enabled').select('Same Day');
            pickupOrder.PaymentType().should('be.enabled').select('CC-on-Delivery');
            pickupOrder.COD().should('be.enabled').type('-100');
            pickupOrder.ServieCategory().should('be.enabled').select('Return');
            pickupOrder.packageDescription().should('be.enabled').type(pkgDescription);
            pickupOrder.consigneesDetails().should('be.visible').click();
            pickupOrder.customerName().should('be.enabled').type(customerName);
            pickupOrder.customerMobile().should('be.enabled').type('01000000000');
            pickupOrder.customerStreet().should('be.enabled').type(customerStreet);
            pickupOrder.City().should('be.enabled').select('Giza');
            pickupOrder.Neighborhood().should('be.enabled').select('Haram');
            pickupOrder.subZone().should('be.enabled').select('Haram');
            pickupOrder.AddressCategory().should('be.enabled').select('Home');
            pickupOrder.saveAndCloseButton().should('be.visible').click();
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().should('be.visible').click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Add and edit return same day "Door To Counter" pickup order', () =>
        {
            const merchantName: string = "End2EndMerchant";
            const pkgDescription = generateRandomstring('Description');
            const customerName = generateRandomstring('CustomerName');
            const customerStreet = generateRandomstring('CustomerStreet');
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.addNewPickupOrderButton().should('be.visible').click();
            pickupOrder.serviceType().should('be.enabled').select('Door-to-Counter');
            pickupOrder.PackageService().should('be.enabled').select('Same Day');
            pickupOrder.PaymentType().should('be.enabled').select('Cash-On-Delivery');
            pickupOrder.COD().should('be.enabled').type('100');
            pickupOrder.ServieCategory().should('be.enabled').select('Return');
            pickupOrder.packageDescription().should('be.enabled').type(pkgDescription);
            pickupOrder.consigneesDetails().should('be.visible').click();
            pickupOrder.customerName().should('be.enabled').type(customerName);
            pickupOrder.customerMobile().should('be.enabled').type('01000000000');
            pickupOrder.customerStreet().should('be.enabled').type(customerStreet);
            pickupOrder.City().should('be.enabled').select('Giza');
            pickupOrder.Neighborhood().should('be.enabled').select('Haram');
            pickupOrder.subZone().should('be.enabled').select('Haram');
            pickupOrder.AddressCategory().should('be.enabled').select('Home');
            pickupOrder.saveAndCloseButton().should('be.visible').click();
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().should('be.visible').click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Add and edit return next day "Door To Door" pickup order', () =>
        {
            const merchantName: string = "End2EndMerchant";
            const pkgDescription = generateRandomstring('Description');
            const customerName = generateRandomstring('CustomerName');
            const customerStreet = generateRandomstring('CustomerStreet');
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.addNewPickupOrderButton().should('be.visible').click();
            pickupOrder.serviceType().should('be.enabled').select('Door-to-Door');
            pickupOrder.PackageService().should('be.enabled').select('Next Day');
            pickupOrder.PaymentType().should('be.enabled').select('Pre-Paid');
            pickupOrder.ServieCategory().should('be.enabled').select('Return');
            pickupOrder.packageDescription().should('be.enabled').type(pkgDescription);
            pickupOrder.consigneesDetails().should('be.visible').click();
            pickupOrder.customerName().should('be.enabled').type(customerName);
            pickupOrder.customerMobile().should('be.enabled').type('01000000000');
            pickupOrder.customerStreet().should('be.enabled').type(customerStreet);
            pickupOrder.City().should('be.enabled').select('Giza');
            pickupOrder.Neighborhood().should('be.enabled').select('Haram');
            pickupOrder.subZone().should('be.enabled').select('Haram');
            pickupOrder.AddressCategory().should('be.enabled').select('Home');
            pickupOrder.saveAndCloseButton().should('be.visible').click();
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().should('be.visible').click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Add and edit return next day "Door To Counter" pickup order', { tags: "@smoke" }, () =>
        {
            const merchantName: string = "End2EndMerchant";
            const pkgDescription = generateRandomstring('Description');
            const customerName = generateRandomstring('CustomerName');
            const customerStreet = generateRandomstring('CustomerStreet');
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.addNewPickupOrderButton().should('be.visible').click();
            pickupOrder.serviceType().should('be.enabled').select('Door-to-Counter');
            pickupOrder.PackageService().should('be.enabled').select('Next Day');
            pickupOrder.PaymentType().should('be.enabled').select('Pre-Paid');
            pickupOrder.ServieCategory().should('be.enabled').select('Return');
            pickupOrder.packageDescription().should('be.enabled').type(pkgDescription);
            pickupOrder.consigneesDetails().should('be.visible').click();
            pickupOrder.customerName().should('be.enabled').type(customerName);
            pickupOrder.customerMobile().should('be.enabled').type('01000000000');
            pickupOrder.customerStreet().should('be.enabled').type(customerStreet);
            pickupOrder.City().should('be.enabled').select('Giza');
            pickupOrder.Neighborhood().should('be.enabled').select('Haram');
            pickupOrder.subZone().should('be.enabled').select('Haram');
            pickupOrder.AddressCategory().should('be.enabled').select('Home');
            pickupOrder.saveAndCloseButton().should('be.visible').click();
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().should('be.visible').click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
    });
    describe.only('Manage create and edit pickup order useing upload button', () =>
    {
        it.only('Upload and edit delivery same day "Door To Door" pickup order', { tags: "@smoke" }, () =>
        {
            cy.intercept('POST', '/api/pickupOrder/SavePickupOrder').as('uploadPickup');

            const fileName = "delivery same day DoorToDoor.xlsx";
            const filePath = "delivery same day DoorToDoor.xlsx";
            const merchantName: string = "End2EndMerchant";
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.uploadButton().click();
            cy.get('[for="importPackages"]').get('[type="file"]')
                .attachFile({ fileName: fileName, filePath: filePath });
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().should('be.visible').click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Upload and edit delivery same day "Door To Counter" pickup order', () =>
        {
            const fileName = "delivery same day DoorToCounter.xlsx";
            const filePath = "delivery same day DoorToCounter.xlsx";
            const merchantName: string = "End2EndMerchant";
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.uploadButton().click();
            cy.get('[for="importPackages"]').get('[type="file"]')
                .attachFile({ fileName: fileName, filePath: filePath });
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().should('be.visible').click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Upload and edit delivery next day "Door To Door" pickup order', () =>
        {
            const fileName = "delivery next day DoorToDoor.xlsx";
            const filePath = "delivery next day DoorToDoor.xlsx";
            const merchantName: string = "End2EndMerchant";
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.uploadButton().click();
            cy.get('[for="importPackages"]').get('[type="file"]')
                .attachFile({ fileName: fileName, filePath: filePath });
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().should('be.visible').click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Upload and edit delivery next day "Door To Counter" pickup order', () =>
        {
            const fileName = "delivery next day DoorToCounter.xlsx";
            const filePath = "delivery next day DoorToCounter.xlsx";
            const merchantName: string = "End2EndMerchant";
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.uploadButton().click();
            cy.get('[for="importPackages"]').get('[type="file"]')
                .attachFile({ fileName: fileName, filePath: filePath });
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().should('be.visible').click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Upload and edit return same day "Door To door" pickup order', () =>
        {
            const fileName = "return same day DoorToDoor.xlsx";
            const filePath = "return same day DoorToDoor.xlsx";
            const merchantName: string = "End2EndMerchant";
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.uploadButton().click();
            cy.get('[for="importPackages"]').get('[type="file"]')
                .attachFile({ fileName: fileName, filePath: filePath });
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().should('be.visible').click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Upload and edit return same day "Door To Counter" pickup order', () =>
        {
            const fileName = "return same day DoorToCounter.xlsx";
            const filePath = "return same day DoorToCounter.xlsx";
            const merchantName: string = "End2EndMerchant";
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.uploadButton().click();
            cy.get('[for="importPackages"]').get('[type="file"]')
                .attachFile({ fileName: fileName, filePath: filePath });
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().should('be.visible').click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Upload and edit return next day "Door To Door" pickup order', () =>
        {
            const fileName = "return same day DoorToDoor.xlsx";
            const filePath = "return same day DoorToDoor.xlsx";
            const merchantName: string = "End2EndMerchant";
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.uploadButton().click();
            cy.get('[for="importPackages"]').get('[type="file"]')
                .attachFile({ fileName: fileName, filePath: filePath });
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().should('be.visible').click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
        it('Upload and edit return next day "Door To Counter" pickup order', { tags: "@smoke" }, () =>
        {
            const fileName = "return same day DoorToCounter.xlsx";
            const filePath = "return same day DoorToCounter.xlsx";
            const merchantName: string = "End2EndMerchant";
            pickupOrders.addNewButton().should('be.visible').click();
            pickupOrders.merchantSearchRaw().should('be.enabled').type(merchantName);
            pickupOrders.merchantDropDown().should('be.visible').click();
            pickupOrders.merchantDropDownList().should('contain', merchantName);
            pickupOrders.calenderButton().should('be.visible').click().then(() =>
            {
                pickupOrders.calenderDays().children().should('have.length', 6);
                pickupOrders.dueDateButton().click();
            });
            pickupOrders.uploadButton().click();
            cy.get('[for="importPackages"]').get('[type="file"]')
                .attachFile({ fileName: fileName, filePath: filePath });
            pickupOrders.saveAndCloseButton().should('be.visible').click();
            pickupOrders.alertBody().filter('td').then((contant =>
            {
                const pickupOrderNumber: any = contant[2].innerText;
                console.log(pickupOrderNumber);
                pickupOrders.closeAlertButton().should('be.visible').click();
                pickupOrders.searchRow().should('be.enabled').type(pickupOrderNumber);
            }));
            pickupOrders.filterButton().click().then(() =>
            {
                pickupOrders.fromDateInput().should('be.enabled').clear();
                pickupOrders.toDateinput().should('be.enabled').clear();
                pickupOrders.searchButton().should('be.visible').click();
            });
            pickupOrders.optionMenu().click();
            cy.window().then(win =>
            {
                cy.stub(win, 'open').as('reload');
            });
            pickupOrders.editButton().click();
            cy.get('@reload').should('have.been.calledOnceWith', Cypress.sinon.match.string, '_blank');
            cy.visit('https://test.egypt.mylerz.com/pickup/edit');
            editPickupOrder.firstPackage().click();
            editPickupOrder.weightInput().should('be.enabled')
                .clear()
                .type('10');
            editPickupOrder.saveAndCloseButton().click();
            pickupOrders.saveAndCloseButton().click();
            pickupOrders.alertBody().should('have.length', 6);
        });
    });
});