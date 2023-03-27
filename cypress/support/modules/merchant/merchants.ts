export class Merchants
{
    public merchants = () => cy.get('[href="/merchants"]');
    public addNewMerchantButton = () => cy.get('[routerlink="/register"]');
    public searchInput = () => cy.get('#mainSearch');
}