export class SideMenu
{
    public packagesButton = () => cy.get(':nth-child(4) > .nav-link > h6');
    public uploadPackagesButton = () => cy.contains('[href="/packages/new"]', 'Upload Packages');
    public ResourcesButton = () => cy.get('.nav-link')
        .should('have.length', 9)
        .invoke('attr', 'href').then(() =>
        {

            cy.get('.nav-link').eq(5);
        });
    public staffButton = () => cy.contains('[href="/resources/staff"]', 'Staff');
}