///<reference types="Cypress"/>

import { has } from "cypress/types/lodash";
import { PickupOrder } from "../../support/modules/pickupOrders/addPickupOrder";
import EditPickupOrder from "../../support/modules/pickupOrders/editPickupOrder";
import { PickupOrders } from "../../support/modules/pickupOrders/pickupOrders";
import { generateRandomstring } from "../../support/modules/utilize/randamString";
import { recurse } from 'cypress-recurse';

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
                pickupOrders.dueDateInput().click();
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
                pickupOrders.dueDateInput().click();
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
                pickupOrders.dueDateInput().click();
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
                pickupOrders.dueDateInput().click();
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
                pickupOrders.dueDateInput().click();
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
                pickupOrders.dueDateInput().click();
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
                pickupOrders.dueDateInput().click();
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
                pickupOrders.dueDateInput().click();
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
    describe('Manage create and edit pickup order useing upload button', () =>
    {
        it('Upload and edit delivery same day "Door To Door" pickup order', { tags: "@smoke" }, () =>
        {
            const today = new Date().toJSON();
            let pickup: {} = {
                "PickupOrderTypeId": 1,
                "MerchantId": 32532,
                "Packages": [
                    {
                        "PackagePieces": [
                            {}
                        ],
                        "Description": "Test",
                        "ServiceTypeId": 1,
                        "ServiceDatetypeID": 1,
                        "ServiceCategoryId": 1,
                        "PaymentTypeId": 1,
                        "CustomerName": "Customer Test",
                        "MobileNo": "01000000000",
                        "CustomerAddress": {
                            "Street": "Test",
                            "CityId": 1,
                            "NeighborhoodId": 5,
                            "SubZoneId": 7
                        },
                        "AddressCategoryId": 1
                    }
                ],
                "PackageCount": 1,
                "PickupOrderDate": today,
                "UserId": 1056,
                "WarehouseId": 36871,
                "SubscriberId": 9,
                "PersistanceInstruction": 1
            };

            cy.intercept('POST', 'api/pickupOrder/SavePickupOrder', (req) =>
            {
                req.body = pickup;
            }).as('pickupOrder');

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
                pickupOrders.dueDateInput().click();
            });
            pickupOrders.uploadButton().click();
            cy.get('[for="importPackages"]').get('[type="file"]')
                .attachFile({ fileName: fileName, filePath: filePath });

            pickupOrders.saveAndCloseButton().should('be.visible').click();
            cy.wait('@pickupOrder');
            cy.get('@pickupOrder').then((res: any) =>
            {
                console.log(res);
            });

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
            const today = new Date().toJSON();
            let pickup: {} = {
                "PickupOrderTypeId": 1,
                "MerchantId": 32532,
                "Packages": [
                    {
                        "PackagePieces": [
                            {}
                        ],
                        "Description": "Test",
                        "ServiceTypeId": 2,
                        "ServiceDatetypeID": 1,
                        "ServiceCategoryId": 1,
                        "PaymentTypeId": 1,
                        "CustomerName": "Customer Test",
                        "MobileNo": "01000000000",
                        "CustomerAddress": {
                            "Street": "Test",
                            "CityId": 1,
                            "NeighborhoodId": 5,
                            "SubZoneId": 7
                        },
                        "AddressCategoryId": 1
                    }
                ],
                "PackageCount": 1,
                "PickupOrderDate": today,
                "UserId": 1056,
                "WarehouseId": 36871,
                "SubscriberId": 9,
                "PersistanceInstruction": 1
            };

            cy.intercept('POST', 'api/pickupOrder/SavePickupOrder', (req) =>
            {
                req.body = pickup;
            }).as('pickupOrder');
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
                pickupOrders.dueDateInput().click();
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
            const today = new Date().toJSON();
            let pickup: {} = {
                "PickupOrderTypeId": 1,
                "MerchantId": 32532,
                "Packages": [
                    {
                        "PackagePieces": [
                            {}
                        ],
                        "Description": "Test",
                        "ServiceTypeId": 1,
                        "ServiceDatetypeID": 2,
                        "ServiceCategoryId": 1,
                        "PaymentTypeId": 2,
                        "COD_Value": 150,
                        "CustomerName": "Customer Test",
                        "MobileNo": "01000000000",
                        "CustomerAddress": {
                            "Street": "Test",
                            "CityId": 1,
                            "NeighborhoodId": 5,
                            "SubZoneId": 7
                        },
                        "AddressCategoryId": 1
                    }
                ],
                "PackageCount": 1,
                "PickupOrderDate": today,
                "UserId": 1056,
                "WarehouseId": 36871,
                "SubscriberId": 9,
                "PersistanceInstruction": 1
            };

            cy.intercept('POST', 'api/pickupOrder/SavePickupOrder', (req) =>
            {
                req.body = pickup;
            }).as('pickupOrder');
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
                pickupOrders.dueDateInput().click();
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
            const today = new Date().toJSON();
            let pickup: {} = {
                "PickupOrderTypeId": 1,
                "MerchantId": 32532,
                "Packages": [
                    {
                        "PackagePieces": [
                            {}
                        ],
                        "Description": "Test",
                        "ServiceTypeId": 2,
                        "ServiceDatetypeID": 2,
                        "ServiceCategoryId": 1,
                        "PaymentTypeId": 3,
                        "COD_Value": 150,
                        "CustomerName": "Customer Test",
                        "MobileNo": "01000000000",
                        "CustomerAddress": {
                            "Street": "Test",
                            "CityId": 1,
                            "NeighborhoodId": 5,
                            "SubZoneId": 7
                        },
                        "AddressCategoryId": 1
                    }
                ],
                "PackageCount": 1,
                "PickupOrderDate": today,
                "UserId": 1056,
                "WarehouseId": 36871,
                "SubscriberId": 9,
                "PersistanceInstruction": 1
            };

            cy.intercept('POST', 'api/pickupOrder/SavePickupOrder', (req) =>
            {
                req.body = pickup;
            }).as('pickupOrder');
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
                pickupOrders.dueDateInput().click();
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
            const today = new Date().toJSON();
            let pickup: {} = {
                "PickupOrderTypeId": 1,
                "MerchantId": 32532,
                "Packages": [
                    {
                        "PackagePieces": [
                            {}
                        ],
                        "Description": "Test",
                        "ServiceTypeId": 1,
                        "ServiceDatetypeID": 1,
                        "ServiceCategoryId": 2,
                        "PaymentTypeId": 2,
                        "COD_Value": -150,
                        "CustomerName": "Customer Test",
                        "MobileNo": "01000000000",
                        "CustomerAddress": {
                            "Street": "Test",
                            "CityId": 1,
                            "NeighborhoodId": 5,
                            "SubZoneId": 7
                        },
                        "AddressCategoryId": 1
                    }
                ],
                "PackageCount": 1,
                "PickupOrderDate": today,
                "UserId": 1056,
                "WarehouseId": 36871,
                "SubscriberId": 9,
                "PersistanceInstruction": 1
            };

            cy.intercept('POST', 'api/pickupOrder/SavePickupOrder', (req) =>
            {
                req.body = pickup;
            }).as('pickupOrder');
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
                pickupOrders.dueDateInput().click();
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
            const today = new Date().toJSON();
            let pickup: {} = {
                "PickupOrderTypeId": 1,
                "MerchantId": 32532,
                "Packages": [
                    {
                        "PackagePieces": [
                            {}
                        ],
                        "Description": "Test",
                        "ServiceTypeId": 2,
                        "ServiceDatetypeID": 1,
                        "ServiceCategoryId": 2,
                        "PaymentTypeId": 1,
                        "CustomerName": "Customer Test",
                        "MobileNo": "01000000000",
                        "CustomerAddress": {
                            "Street": "Test",
                            "CityId": 1,
                            "NeighborhoodId": 5,
                            "SubZoneId": 7
                        },
                        "AddressCategoryId": 1
                    }
                ],
                "PackageCount": 1,
                "PickupOrderDate": today,
                "UserId": 1056,
                "WarehouseId": 36871,
                "SubscriberId": 9,
                "PersistanceInstruction": 1
            };

            cy.intercept('POST', 'api/pickupOrder/SavePickupOrder', (req) =>
            {
                req.body = pickup;
            }).as('pickupOrder');
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
                pickupOrders.dueDateInput().click();
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
            const today = new Date().toJSON();
            let pickup: {} = {
                "PickupOrderTypeId": 1,
                "MerchantId": 32532,
                "Packages": [
                    {
                        "PackagePieces": [
                            {}
                        ],
                        "Description": "Test",
                        "ServiceTypeId": 1,
                        "ServiceDatetypeID": 2,
                        "ServiceCategoryId": 2,
                        "PaymentTypeId": 1,
                        "CustomerName": "Customer Test",
                        "MobileNo": "01000000000",
                        "CustomerAddress": {
                            "Street": "Test",
                            "CityId": 1,
                            "NeighborhoodId": 5,
                            "SubZoneId": 7
                        },
                        "AddressCategoryId": 1
                    }
                ],
                "PackageCount": 1,
                "PickupOrderDate": today,
                "UserId": 1056,
                "WarehouseId": 36871,
                "SubscriberId": 9,
                "PersistanceInstruction": 1
            };

            cy.intercept('POST', 'api/pickupOrder/SavePickupOrder', (req) =>
            {
                req.body = pickup;
            }).as('pickupOrder');
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
                pickupOrders.dueDateInput().click();
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
            const today = new Date().toJSON();
            let pickup: {} = {
                "PickupOrderTypeId": 1,
                "MerchantId": 32532,
                "Packages": [
                    {
                        "PackagePieces": [
                            {}
                        ],
                        "Description": "Test",
                        "ServiceTypeId": 2,
                        "ServiceDatetypeID": 2,
                        "ServiceCategoryId": 2,
                        "PaymentTypeId": 1,
                        "CustomerName": "Customer Test",
                        "MobileNo": "01000000000",
                        "CustomerAddress": {
                            "Street": "Test",
                            "CityId": 1,
                            "NeighborhoodId": 5,
                            "SubZoneId": 7
                        },
                        "AddressCategoryId": 1
                    }
                ],
                "PackageCount": 1,
                "PickupOrderDate": today,
                "UserId": 1056,
                "WarehouseId": 36871,
                "SubscriberId": 9,
                "PersistanceInstruction": 1
            };

            cy.intercept('POST', 'api/pickupOrder/SavePickupOrder', (req) =>
            {
                req.body = pickup;
            }).as('pickupOrder');
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
                pickupOrders.dueDateInput().click();
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
    it.skip('Verfy pationation working fine', () =>
    {
        const merchantName: string = "End2EndMerchant";

        pickupOrders.filterButton().click();
        cy.get('body > app-root > div.container-fluid.m-0 > div > div.main-content > pickup > app-pickup-list > div.col-12.table-holder.card > div.fillter-div > div:nth-child(1) > div:nth-child(1) > select-menu > div > angular2-multiselect > div').click();
        cy.get('body > app-root > div.container-fluid.m-0 > div > div.main-content > pickup > app-pickup-list > div.col-12.table-holder.card > div.fillter-div > div:nth-child(1) > div:nth-child(1) > select-menu > div > angular2-multiselect > div > div.dropdown-list.animated.fadeIn > div.list-area > div.list-filter > input[type=text]').type(merchantName);
        cy.get(':nth-child(1) > :nth-child(1) > select-menu > :nth-child(1) > .ng-valid > .cuppa-dropdown > .dropdown-list > .list-area > [style="overflow: auto; max-height: 200px;"] > .lazyContainer > .pure-checkbox > label').click({ timeout: 2000 });
        cy.get('body > app-root > div.container-fluid.m-0 > div > div.main-content > pickup > app-pickup-list > div.col-12.table-holder.card > div.fillter-div > div.row.align-normal > div:nth-child(1) > date-picker > div > input')
            .clear()
            .type('01-05-2023');
        cy.get('body > app-root > div.container-fluid.m-0 > div > div.main-content > pickup > app-pickup-list > div.col-12.table-holder.card > app-pagination-component > div > div.col-sm-5 > div > select ').select('5');
        //cy.get(':nth-child(1) > date-picker > .input-group > .input-group-append > :nth-child(1)').click();
        cy.contains('button', 'Search').click();
        recurse(
            () => cy.get('body > app-root > div.container-fluid.m-0 > div > div.main-content > pickup > app-pickup-list > div.col-12.table-holder.card > app-pagination-component > div > div.col-sm-7 > pagination > ul > li.pagination-next.page-item').should(Cypress._.noop),
            ($button) => $button.hasClass('pagination-next page-item disabled'),
            {
                post()
                {
                    cy.get('body > app-root > div.container-fluid.m-0 > div > div.main-content > pickup > app-pickup-list > div.col-12.table-holder.card > app-pagination-component > div > div.col-sm-7 > pagination > ul > li.pagination-next.page-item').click();
                },
                // delay: 500,
                // limit: 1,
                // timeout: 1000,
                // log: false
            }
        );
    });
});