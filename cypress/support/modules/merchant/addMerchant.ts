export class AddMerchant
{
    public merchantNameInput = () => cy.get('#merchantName');
    public merchantDisplayNameInput = () => cy.get('#merchantDisplayName');
    public businessCategory = () => cy.get('select[name="BusinessCategoryId"]');
    public usernameInput = () => cy.get('input[name="Username"]');
    public emailInput = () => cy.get('input[name="Email"]');
    public pickupLocationInput = () => cy.get('#name0');
    public fullAddressInput = () => cy.get('#AddressName0');
    public city = () => cy.get('#City0');
    public zone = () => cy.get('#Zone0');
    public subZone = () => cy.get('#subZone0');
    public longInput = () => cy.get('#longitude0');
    public latInput = () => cy.get('#latitude0');
    public positioninput = () => cy.get('input[name="Position"]');
    public fullNameinput = () => cy.get('input[name="FullName"]');
    public phoneInput = () => cy.get('input[name="Mobile"]');
    public checkboxTerms = () => cy.get('.switch ');
    public savebutton = () => cy.get('button[type="submit"]');
    public merchantNationalIdInput = () => cy.get('[name="nationalId"]');
}