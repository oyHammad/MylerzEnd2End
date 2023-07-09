/// <reference types="cypress" />


// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.on('uncaught:exception', (err, runnable) =>
{
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

Cypress.Commands.add('Login', (userName: string, password: string) =>
{
    cy.visit('https://test.egypt.mylerz.com/login');
    cy.get('#userName').type(userName);
    cy.get('#password').type(password);
    cy.contains('button', 'Login').click();
    cy.location('pathname').should('eq', '/pickup');
});
Cypress.Commands.add("getByPlaceholder", (input: string) =>
{
    /**
 * Get DOM element based on placeholder text value
 * @param input placeholder text value
 */
    return cy.get(`[placeholder="${input}"]`);
});
Cypress.Commands.add('addNewStaff', () =>
{
    const email = generateRandamEmail();
    const nationalID = generateRandomNationalID();
    const staffUserNameInactive = generateRandomstring('userName');
    const staffMember: {} = {
        "currentStaffId": 1056,
        "MemberId": 0,
        "FristName": "Osama",
        "MiddelName": "Ahmed",
        "LastName": "Hammad",
        "Phone": "01003458800",
        "Email": email,
        "Isactive": false,
        "PermittedBranches": [
            {
                "Id": 1007,
                "SubscriberId": 9,
                "Code": "NSR",
                "ArName": "مدينه نصر",
                "EnName": "Nasr City"
            }
        ],
        "StaffRole": {
            "Id": 13,
            "Code": "mylerz-Admin",
            "ArName": "mylerz-Admin",
            "EnName": "mylerz-Admin"
        },
        "UserId": "",
        "UserName": staffUserNameInactive,
        "UserName1": "",
        "Password": "Ot@123456",
        "ConfirmedPassword": "Ot@123456",
        "ImageSrc": null,
        "SelectedWarehouse": [],
        "DocumentId": 0,
        "AreaTypeId": 0,
        "VehicleTypeId": 0,
        "VehicleClassId": 0,
        "NationalId": nationalID,
        "MylerTypeId": 0,
        "Commission": 0,
        "AreaType": null,
        "VehicleType": null,
        "VehicleClass": null,
        "MylerType": null,
        "SaveMemberImage": {
            "documents": null
        }
    };
    cy.request({
        method: 'POST',
        url: 'https://test.egypt.api.mylerz.com/api/resource/AddStaff',
        headers: {
            "authorization": "bearer gu3n-PtIVMfmBMuesTLRQV_A4p3zT5visWkszabImwPzLxuskCEqhGb_EH5MCS0dD6Is1lynzrA_8hUudKyszBQz0wi9qCHBMY1gs4QSekFHgWUo3JyCsynBly0JRlHBENSzuyKaavo24lpLIhbxDlPsaiVa0eqvknBwM6Lo830cw3RdJ6aNe_iCSK50wh-AcePqOhW6OuCLYYbEhqvT2VEQ77GhsaYaxL0LEUDHfJOS29_rRfgTZFKTFxg__tS4OP1vL6HBEyPEnU9_9Whs3Et1bwnrqW_0i_7gl9FSesxwYGKCpg3R3J22nUwVUPKIY3XSC68COX5qdOCdDEVU7IiXmYpbntdwVqLmGpu7wSveoTOlN_QzXcGWVg8ZqLDjUaZ6xRix7U94kU9OhZNKG7P1g3dpEU6A5m99vBBqwA-2IIJUTYUX54uQDX6iGjB5Qgr8VxQ2_gRYFNNQNfqzgJw9NosN-HOc10VL1vFZl-0pbaLgqdqcjbXDcIyKhK4ooeidtYmLQB-LNVjwKZ6Kcv4T7CqD88HOxov3aeWsIAM-NsG1sV3kjH9V4XQJ-9OBZTV6uVSXuolDpOaQnAIFLHJB7OcIP3f7JBDdlD2nWUsQFzDf8lzoLRdy0RWqhVwIWi3m_yHcZQXm-G28B9pEy3JwhcSxIr9a6BlrxI_adraK0KOn9So7LqXRQ5pWoUWEMbTIl7LYo31-UdT0-WesJTNexML3JraN03Y1yFkNcLuFjE7srns6zhHsznXq1c0W7zK4khwcNNHQyEC9dv4JrfSe4KsErkzWYHWYh8lGinJS1BfRVw0u8oQkuZXNBBs9H24z92R7wH276D2SI914FhQPYrkV47mD8It-4LMqRXQgF82lcPnjk-t2QRwZU--NZIvs5JZy_ffvNQS6EgTvhN8B92r08H-7Zycf4J77YBmA78cdiieqT-A70K9M1oBuQ5fogOi8WTt18vdvfBhmdOFZ_LKO2FGC_8BcHod31pdMpfhUgluEZ-biDbLZvYK0NNhNdNulD_wKOr51v2dZ1aSFsIa3iWw5YYuqKiRv6YblFHKAUcRGdnwI3eQ-QpnexASOilIocA6S1XU39LM9vF7wE8A1hTgjJ5lAut0OldFRDPeTyQeXKEFQILt_0gahIonrVxRORSmDg3ispJwUTMYwWNqoHKdHpEHzy2PFRLJOifE0lXAjd-Qti6tPAOi-ePRXCTLNb9LjgZvef_BEkWNvIx2X_W1FiKdhMD3lZ56qMIlbEGUIt1KOApemX5d1d-ByY152uKBs0kdI1K6V8qdwV42XLZ-AcwNeacVe1E7FEvxefBRexz4p9NKgVZQUM1GjVI8eGT7dk9IswGJtr7e_HUiqxKHHLSunrSCluFl0CZWnJQM6yOcJCx-Xt-RWlp_BIL-Cu4tSCg4jw7PB66WK6I6WvB5VK6HXbFcKBO0E_VUOzUGadB6cWSt9EA7pw_M3OoGymq4KEQavgmtTpiSYHnvJpfm3ANxjGjnPCrNU-rs3htFbNRlhjRt8tzkW1RFJEXLNUzoF6Kc6hEF666jfnQmvXRkM7F_vAmQJ4xqnlNlKlo9_7cM1EdciD1g8IWfz_Uc349ObiwSdJ9iiqSltDD6PAqHB0SIKdCxupImJEbZRBCm5W1TWgpJNFNW91461nzuQPIcSWLVbbaU5M0ZA3ZP4pt4JEjnqjTq1b9IRuadb3N958uZoeMHhI5k0iDURzxr_iOLUdXRrwh9DvYYYyrP2ieysCYkf-Kg1lhgAz5WA2r7Ir-G1T4wYsLzXE0Kp_FrWCtoXX1hhdwu0lItBlE9ToMZf8962ZN53K5_DXQECaYSxqFnNOW7wvdr6tczETLAVzyaO-gBJ1IEm7w",
            "content-type": 'application/json'
        },
        body: staffMember
    }).as('addmember');
});

import 'cypress-file-upload';
import 'cypress-map'; import { generateRandamEmail, generateRandomNationalID, generateRandomstring } from './modules/utilize/randamString';

