export class Packages
{
    public merchantNameInput = () => cy.get('#MerchantSearch');
    public merchantDrobDown = () => cy.get('.dropdown-item');
    public merchantPickupLocationDropDown = () => cy.get('.selected-list');
    public addNewButton = () => cy.get(':nth-child(3) > .mb-0');
    public saveAndCloseButton = () => cy.get('.btn-Send');

}