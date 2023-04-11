///<reference types="Cypress"/>

import { has } from "cypress/types/lodash";
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
        it.only('Upload and edit delivery same day "Door To Door" pickup order', { tags: "@smoke" }, () =>
        {
            let pickup: {} = {
                "PickupOrderTypeId": 1,
                "MerchantId": 32532,
                "Packages": [
                    {
                        "HasError": false,
                        "HaveCOD": false,
                        "DisableRefNumber": false,
                        "WareHouses": [
                            {
                                "Id": 36871,
                                "MerchantId": 32532,
                                "Code": "End2EndMerchant",
                                "Name": "End2EndMerchant",
                                "ZoneId": 1094,
                                "AreaId": 2
                            }
                        ],
                        "subscriberItemList": [
                            {
                                "Id": 9,
                                "Code": "MYLERZMain",
                                "ArName": "مايلرز\t",
                                "EnName": "MylerzMain"
                            }
                        ],
                        "NeighborhoodList": [],
                        "SubZoneList": [],
                        "PackagePieces": [
                            {
                                "ItemCategoryId": 0,
                                "PersistanceInstruction": 1,
                                "hasItemCategoryError": false
                            }
                        ],
                        "checkedError": false,
                        "CanAddPieces": true,
                        "detailWarehouses": [
                            {
                                "Id": 36871,
                                "MerchantId": 32532,
                                "Code": "End2EndMerchant",
                                "Name": "End2EndMerchant",
                                "ZoneId": 1094,
                                "AreaId": 2
                            }
                        ],
                        "hasMerchantNameRequreid": false,
                        "hasCODValueRequreid": false,
                        "hasTotalWeightRequreid": false,
                        "hasNationalIDRequreid": false,
                        "hasDetailsWarehouseRequreid": false,
                        "hasselectedSubscribersRequreid": false,
                        "selectedSubscribers": [
                            {
                                "Id": 9,
                                "Code": "MYLERZMain",
                                "ArName": "مايلرز\t",
                                "EnName": "MylerzMain"
                            }
                        ],
                        "HasPOD": false,
                        "CanPackageWeightEdit": true,
                        "confirmedLocation": true,
                        "modulesActionKeys": {
                            "Merchants": {
                                "1": "MerchantsList_AddNew",
                                "2": "MerchantsList_ChangeStatus",
                                "21": "MerchantsList_MerchantsData",
                                "22": "MerchantsList_ExportToExcel",
                                "23": "MerchantDetails_EditMerchantData",
                                "MerchantsList_AddNew": 1,
                                "MerchantsList_ChangeStatus": 2,
                                "MerchantsList_MerchantsData": 21,
                                "MerchantsList_ExportToExcel": 22,
                                "MerchantDetails_EditMerchantData": 23
                            },
                            "pickup": {
                                "3": "PickupOrders_AddNew",
                                "4": "PickupOrders_ChangeStatus",
                                "5": "NewPickupOrder_AddNew",
                                "6": "NewPickupOrder_Upload",
                                "7": "NewPickupOrder_Locations",
                                "8": "NewPickupOrder_Print",
                                "9": "NewPickupOrder_GenerateBarcode",
                                "10": "NewPickupOrder_AddNewPiece",
                                "24": "PickupOrders_Edit",
                                "34": "NewPickupOrder_Edit_Save",
                                "PickupOrders_AddNew": 3,
                                "PickupOrders_ChangeStatus": 4,
                                "PickupOrders_Edit": 24,
                                "NewPickupOrder_AddNew": 5,
                                "NewPickupOrder_Upload": 6,
                                "NewPickupOrder_Locations": 7,
                                "NewPickupOrder_Print": 8,
                                "NewPickupOrder_GenerateBarcode": 9,
                                "NewPickupOrder_AddNewPiece": 10,
                                "NewPickupOrder_Edit_Save": 34
                            },
                            "packages": {
                                "11": "packageList_BulkUpdate",
                                "18": "packageList_confirm",
                                "19": "bulkupdate_check",
                                "25": "packageList_ExportToExcel",
                                "26": "packagesDetails_editPhone",
                                "27": "packagesDetails_editAddress",
                                "28": "packagesDetails_print",
                                "29": "packagesDetails_resendSMS",
                                "30": "packagesDetails_charges",
                                "31": "packagesDetails_chargesDisableFields",
                                "35": "PackageList_ChangeStatus",
                                "36": "PackageList_AssignRider",
                                "37": "Debrief_ConfirmDP",
                                "38": "Debrief_DenyDP",
                                "39": "Debrief_UpdatePayment",
                                "40": "Debrief_ScanRefund",
                                "41": "Debrief_ConfirmRM",
                                "42": "Debrief_DenyRM",
                                "43": "Debrief_ScanP",
                                "44": "MBList_Bulk",
                                "45": "MBList_Print",
                                "46": "MBList_Export",
                                "47": "MBList_Delete",
                                "48": "MBList_Append",
                                "49": "MBList_ChangeStatus",
                                "50": "MBList_ViewDetails",
                                "51": "MBDetail_Bulk",
                                "52": "MBDetail_Upload",
                                "53": "MBDetails_ExportExcel",
                                "54": "MBDetails_Print",
                                "55": "packages_packageList_CreatePickup",
                                "56": "packages_packageList_EditPackage",
                                "57": "packages_UploadPackage_BackOffice",
                                "58": "packages_UploadPackage_Query",
                                "59": "packages_UploadPackage_AddNew",
                                "60": "packages_UploadPackage_Upload",
                                "61": "packages_UploadPackage_Locations",
                                "62": "packages_UploadPackage_Print",
                                "63": "packages_UploadPackage_GenerateBarcode",
                                "64": "packages_UploadPackage_AddNewPiece",
                                "65": "packages_UploadPackage_Save",
                                "66": "packages_UploadPackage_UpdateAllPackageData",
                                "67": "packages_UploadPackage_UpdatePackageLocationData",
                                "68": "packages_packageList_MultiplePickup",
                                "69": "packageList_ExporttoNormaGoExcel",
                                "70": "packages_UploadPackage_PickupRecieveItemsBackOffice",
                                "packageList_BulkUpdate": 11,
                                "packageList_BulkUpdate_UpdateTransferReference": 70,
                                "packageList_confirm": 18,
                                "packageList_ExportToExcel": 25,
                                "PackageList_CreatePickup": 55,
                                "PackageList_ChangeStatus": 35,
                                "PackageList_AssignRider": 36,
                                "packages_packageList_CreatePickup": 55,
                                "packages_packageList_EditPackage": 56,
                                "bulkupdate_check": 19,
                                "packagesDetails_editPhone": 26,
                                "packagesDetails_editAddress": 27,
                                "packagesDetails_print": 28,
                                "packagesDetails_resendSMS": 29,
                                "packagesDetails_charges": 30,
                                "packagesDetails_chargesDisableFields": 31,
                                "Debrief_ConfirmDP": 37,
                                "Debrief_DenyDP": 38,
                                "Debrief_UpdatePayment": 39,
                                "Debrief_ScanRefund": 40,
                                "Debrief_ConfirmRM": 41,
                                "Debrief_DenyRM": 42,
                                "Debrief_ScanP": 43,
                                "MBList_Bulk": 44,
                                "MBList_Print": 45,
                                "MBList_Export": 46,
                                "MBList_Delete": 47,
                                "MBList_Append": 48,
                                "MBList_ChangeStatus": 49,
                                "MBList_ViewDetails": 50,
                                "MBDetail_Bulk": 51,
                                "MBDetail_Upload": 52,
                                "MBDetails_ExportExcel": 53,
                                "MBDetails_Print": 54,
                                "packages_UploadPackage_BackOffice": 57,
                                "packages_UploadPackage_Query": 58,
                                "packages_UploadPackage_AddNew": 59,
                                "packages_UploadPackage_Upload": 60,
                                "packages_UploadPackage_Locations": 61,
                                "packages_UploadPackage_Print": 62,
                                "packages_UploadPackage_GenerateBarcode": 63,
                                "packages_UploadPackage_AddNewPiece": 64,
                                "packages_UploadPackage_Save": 65,
                                "packages_UploadPackage_UpdateAllPackageData": 66,
                                "packages_UploadPackage_UpdatePackageLocationData": 67,
                                "packages_packageList_MultiplePickup": 68,
                                "packageList_ExporttoNormaGoExcel": 69,
                                "packages_UploadPackage_PickupRecieveItemsBackOffice": 70
                            },
                            "resources": {
                                "12": "Staff_Savebtn",
                                "13": "Staff_ActivateDeactivate",
                                "14": "Staff_Delete",
                                "32": "StaffList_AddNew",
                                "33": "StaffList_EditView",
                                "Staff_Savebtn": 12,
                                "Staff_ActivateDeactivate": 13,
                                "Staff_Delete": 14,
                                "StaffList_AddNew": 32,
                                "StaffList_EditView": 33
                            },
                            "setting": {
                                "15": "NotificationSetting_AddNew",
                                "16": "NotificationSetting_Edit",
                                "17": "NotificationSetting_Delete",
                                "NotificationSetting_AddNew": 15,
                                "NotificationSetting_Edit": 16,
                                "NotificationSetting_Delete": 17
                            }
                        },
                        "CustomServiceTypesId": 0,
                        "CustomServiceTypesParentId": 0,
                        "BarCode": null,
                        "packageNo": 1,
                        "Description": "Test",
                        "TotalWeight": "",
                        "ServiceTypeId": 1,
                        "ServiceDatetypeID": 1,
                        "ServiceDate": "2023-03-30T22:00:00.000Z",
                        "ServiceCategoryId": 1,
                        "PaymentTypeId": 1,
                        "CustomerName": "Customer Test",
                        "MobileNo": "01000000000",
                        "PackageSourceId": 1,
                        "MerchantId": 32532,
                        "MerchantCode": "132532",
                        "MerchantName": "End2EndMerchant",
                        "CustomerAddress": {
                            "Street": "Test",
                            "CityId": 1,
                            "NeighborhoodId": 5,
                            "SubZoneId": 7
                        },
                        "AddressCategoryId": 1,
                        "PersistanceInstruction": 1,
                        "packageNumber": 0,
                        "PickupAddressId": 0,
                        "hasServiceCategoryError": true,
                        "hasError": false,
                        "hasAddressCategoryError": false,
                        "hasCityError": false,
                        "hasNeighborError": false,
                        "hasPaymentTypeError": false,
                        "hasSelectServiceTypeError": false,
                        "hasSubZoneError": false,
                        "hasPackageServiceTypeError": true,
                        "hasCOD": true,
                        "hasWeightError": false,
                        "PackagePiecesLength": 1,
                        "PiecesCount": 1,
                        "WarehouseId": 36871,
                        "SubscriberId": 9,
                        "HubEnterPoint": 1,
                        "ActualServiceDate": "Mar 31, 2023, 12:00:00 AM"
                    }
                ],
                "PackageCount": 1,
                "PickupOrderDate": "2023-03-30T22:00:00.000Z",
                "UserId": 1056,
                "WarehouseId": 36871,
                "SubscriberId": 9,
                "PersistanceInstruction": 1,
                "ServiceCategoryId": 0,
                "ServiceId": 0
            };
            cy.intercept('POST', 'api/pickupOrder/SavePickupOrder', (req) =>
            {
                req.body = pickup;
            }).as('pickupOrder');

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
});