export class EditNewResource
{
    public firstNameInput = () => cy.get('[placeholder="First"]');
    public middleNameInput = () => cy.get('[placeholder="Middle"]');
    public lastNameInput = () => cy.get('[placeholder="Last"]');
    public permittedHubs = () => cy.get('.c-btn').eq(0);
    public allHubs = () => cy.contains('Select All');
    public staffRole = () => cy.get('.c-btn').eq(1);
    public rolesDropDownList = () => cy.get('.pure-checkbox');
    public contactTelephoneInput = () => cy.get('[placeholder="Contact Telephone"]');
    public emailInput = () => cy.get('[placeholder="E-mail"]');
    public nationalIDInput = () => cy.get('[ placeholder="National ID"]');
    public userNameInput = () => cy.get('[placeholder="User name"]');
    public passwordInput = () => cy.get('[placeholder="Password"]');
    public confirmPasswordInput = () => cy.get('[placeholder="Confirm Password"]');
    public confirmButton = () => cy.get('[type="button"]');

}