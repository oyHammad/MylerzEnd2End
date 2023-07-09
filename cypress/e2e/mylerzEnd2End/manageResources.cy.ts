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
    it('Validate create and edit new staff member', { tags: "@smoke" }, () =>
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
    it('Verify changing the staff member status from active to inactive', () =>
    {
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
                "authorization": "bearer IhLbk5vVs39Dir5ForfkR-k12JrVnfAHls4_EMagu82LjJmAB4KtWfumwDzI_Fvl8fHUscdo4ALS--IHAJc-fwA4fxDCf0kyJFzlaOtH5LAMZUWv3HMHQl0zIKpRzp4ZeDEO0bffc52l-Aj26ufYAxfhyedyylp1Q9xj-uRcLTfcuqPxFmY1a4spYEHQ7NNRefB5M3wRkhPEkPPHQ4i87NCcZHi4zGS7ew2ok9Y2s0VWFl7BakvG9jvO72J8spX2Cv-aL8wGGN8FUbX7DaWdOo5no7JL3RYaTzFJcBBRvJabGbSyth8THcMJvzKa0jYq-4PUQFVrHh8qznaEvc3R7z2MQkJdTlmP-bWg5MIVeeeIOj-kKG07TGzYbz7r_TcRRTj9I_ymFr18GJd-H1cnsb4PsvK8bNaB3hJHId3bjTM16lNf0lK48LHIXIaXsTHEWCdQpRiBaKw4h1mz9NHRtbk8Tdce0YdwAkptjmYaVBN50trLuy-HwuFHw4ITT1TK9bOcx7PgVtQKmlLuDhBPWrX0B3iIeu0Is4yHQq_i5knQx-SNZqWBiwxK5U4rNi_Omqw03v7LCMEk5LLEw0whIbJiIJCHfARd6-EVdU1q8cTU2DVtdozMo41gnXbtNaX02cbiY9OMPWn7OfjgdFs906GeLulptqCSk2JIVGMsb1uUcGR2cqfIjf1EbXs_e8NckgDdejdQEh01gHNboKF4Cl_KyzUmOMwOehDrLkWc3ZEH2MGhO7yFWxN2tSvHS8L0Ctf2QbAtoR_sNGt3R6JRojlTURD9IoYRBigoa607_D-mo3Ye3rPLdNxovLfY1wUnJhZsdI10fztXLd9E1rB67hMZt8dY0s7hBuV0rzWA6KNAFPbI-_dVqWlBgYNatEXvFobKUEm2XFaMMEW8O4-aGvmoB-j4b_QsvADa7ZLZt91CSbm42lkLDmdKoxhIPd2zfQ8bmheKJCzbNPa95J77Y5cDN2XxdyRSMUMl51hdb-ojhIg-H2jClKWBafdmt7n7Y4scGJVJFAjSqJyaTYj3v5fOaGr2fYrVgZ6qnQekElxdPHGdjxeK9BSe10hmA9SDzG8MVr7Qp6YFcep4ecIzAVEp8tFJ2VRDOuUWMeRHYgEs-bRHhr7bQ9C8tFnffwm7olExtgoFJvcou8YpUwudWHsEJ9uDMuUUXkSeAPRxzieACSmkQVa8JJeFcIfs9PLf-F-ofbNfW_fqitKzteQSP7WbIhiasGXVTaXDp819usTCrxlM29w1PjSlGbxAuL9z05rxbJg4jXGWiYSLsJjMDrxOSUEb3fy6RmU7zmHYq3sVSwyoUkNUeTL_EOXxDoH64wJ7PkFpLHF9052Q8r7mtt2MttePhT6oiqMX_qLkVuMWFaVqMTfSgxWwqHw9tvFQrlVSJ_4xpgoJsQ4Jnzts5PMNbllqQWiQgPKeJ1ss-ZUdSs1zTdp_CS1BSxSDH-wU1aRV1lQgBcRk37C2BVyj7QPEHjHatDJkmNRPbq_gO12IPRI1DgLOieRAic-nBb-wfykBBD7b9J5dQ8yUkfiVW8kahH5xbSwTIy2NEPsd9_4RxsuTNCJmXBv59x-pCWLMs0A5-KxawKVjvFns16M0ebkP4F0thf3zxjzW2j5fbd1zxWWSM2MkmSGhaN0diQoiPKGXd3hkgopXRy7FlOB-rTl73cI0Xmg-FoYh3x5_xC7Otnv3UDNjX1qguXHA4wM6EQuoQjgFFhLxGE1IcvNAWqnpRhp-YTDtsE1sWjBVJ5_CWDqpsZd3ym_zM9Nn_PKkU_79dW1F1-yT6WTvfpEBa0X9fUHSLZFdK5tNtQal0xIHISy7SX0QgvsSxEjPKajlFmjuy2b-xGyj542Q5LJqUA",
                "content-type": 'application/json'
            },
            body: staffMember
        }).as('addmember');
        cy.get('@addmember').then((res) =>
        {
            sideMenu.ResourcesButton().should('be.visible').click();
            sideMenu.staffButton().should('be.visible').click();
            resources.searchInput().type(staffUserNameInactive);
            resources.searchButton().click();
            resources.ellipseButton().click();
            resources.deactivateButton().click();
            resources.confirmDeactivateStaff().click();
            resources.alertMessage().invoke('text').should('include', 'updated successfully');
        });
    });
    it('Verify changing the staff member status from inactive to active', () =>
    {
        const staffUserName = generateRandomstring('userName');
        const email = generateRandamEmail();
        const nationalID = generateRandomNationalID();
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
            "UserName": staffUserName,
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
            headers:
            {
                "authorization": "bearer gu3n-PtIVMfmBMuesTLRQV_A4p3zT5visWkszabImwPzLxuskCEqhGb_EH5MCS0dD6Is1lynzrA_8hUudKyszBQz0wi9qCHBMY1gs4QSekFHgWUo3JyCsynBly0JRlHBENSzuyKaavo24lpLIhbxDlPsaiVa0eqvknBwM6Lo830cw3RdJ6aNe_iCSK50wh-AcePqOhW6OuCLYYbEhqvT2VEQ77GhsaYaxL0LEUDHfJOS29_rRfgTZFKTFxg__tS4OP1vL6HBEyPEnU9_9Whs3Et1bwnrqW_0i_7gl9FSesxwYGKCpg3R3J22nUwVUPKIY3XSC68COX5qdOCdDEVU7IiXmYpbntdwVqLmGpu7wSveoTOlN_QzXcGWVg8ZqLDjUaZ6xRix7U94kU9OhZNKG7P1g3dpEU6A5m99vBBqwA-2IIJUTYUX54uQDX6iGjB5Qgr8VxQ2_gRYFNNQNfqzgJw9NosN-HOc10VL1vFZl-0pbaLgqdqcjbXDcIyKhK4ooeidtYmLQB-LNVjwKZ6Kcv4T7CqD88HOxov3aeWsIAM-NsG1sV3kjH9V4XQJ-9OBZTV6uVSXuolDpOaQnAIFLHJB7OcIP3f7JBDdlD2nWUsQFzDf8lzoLRdy0RWqhVwIWi3m_yHcZQXm-G28B9pEy3JwhcSxIr9a6BlrxI_adraK0KOn9So7LqXRQ5pWoUWEMbTIl7LYo31-UdT0-WesJTNexML3JraN03Y1yFkNcLuFjE7srns6zhHsznXq1c0W7zK4khwcNNHQyEC9dv4JrfSe4KsErkzWYHWYh8lGinJS1BfRVw0u8oQkuZXNBBs9H24z92R7wH276D2SI914FhQPYrkV47mD8It-4LMqRXQgF82lcPnjk-t2QRwZU--NZIvs5JZy_ffvNQS6EgTvhN8B92r08H-7Zycf4J77YBmA78cdiieqT-A70K9M1oBuQ5fogOi8WTt18vdvfBhmdOFZ_LKO2FGC_8BcHod31pdMpfhUgluEZ-biDbLZvYK0NNhNdNulD_wKOr51v2dZ1aSFsIa3iWw5YYuqKiRv6YblFHKAUcRGdnwI3eQ-QpnexASOilIocA6S1XU39LM9vF7wE8A1hTgjJ5lAut0OldFRDPeTyQeXKEFQILt_0gahIonrVxRORSmDg3ispJwUTMYwWNqoHKdHpEHzy2PFRLJOifE0lXAjd-Qti6tPAOi-ePRXCTLNb9LjgZvef_BEkWNvIx2X_W1FiKdhMD3lZ56qMIlbEGUIt1KOApemX5d1d-ByY152uKBs0kdI1K6V8qdwV42XLZ-AcwNeacVe1E7FEvxefBRexz4p9NKgVZQUM1GjVI8eGT7dk9IswGJtr7e_HUiqxKHHLSunrSCluFl0CZWnJQM6yOcJCx-Xt-RWlp_BIL-Cu4tSCg4jw7PB66WK6I6WvB5VK6HXbFcKBO0E_VUOzUGadB6cWSt9EA7pw_M3OoGymq4KEQavgmtTpiSYHnvJpfm3ANxjGjnPCrNU-rs3htFbNRlhjRt8tzkW1RFJEXLNUzoF6Kc6hEF666jfnQmvXRkM7F_vAmQJ4xqnlNlKlo9_7cM1EdciD1g8IWfz_Uc349ObiwSdJ9iiqSltDD6PAqHB0SIKdCxupImJEbZRBCm5W1TWgpJNFNW91461nzuQPIcSWLVbbaU5M0ZA3ZP4pt4JEjnqjTq1b9IRuadb3N958uZoeMHhI5k0iDURzxr_iOLUdXRrwh9DvYYYyrP2ieysCYkf-Kg1lhgAz5WA2r7Ir-G1T4wYsLzXE0Kp_FrWCtoXX1hhdwu0lItBlE9ToMZf8962ZN53K5_DXQECaYSxqFnNOW7wvdr6tczETLAVzyaO-gBJ1IEm7w",
                "content-type": 'application/json'
            },
            body: staffMember
        }).as('addmember');
        cy.get('@addmember').then((res) =>
        {
            sideMenu.ResourcesButton().should('be.visible').click();
            sideMenu.staffButton().should('be.visible').click();
            resources.searchInput().type(staffUserName);
            resources.searchButton().click();
            resources.ellipseButton().click();
            resources.deactivateButton().click();
            resources.confirmDeactivateStaff().click();
            resources.alertMessage().invoke('text').should('include', 'updated successfully');
            cy.reload();
            resources.searchInput().type(staffUserName);
            resources.searchButton().click();
            resources.ellipseButton().click();
            resources.deactivateButton().click();
            resources.confirmDeactivateStaff().click();
            resources.alertMessage().invoke('text').should('include', 'updated successfully');
        });
    });
});