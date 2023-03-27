export class Resources
{
    public addNewButton = () => cy.get('[href="/resources/new"]');
    public alertMessage = () => cy.get('.modal-content');
    public closeAlertButton = () => cy.get('body.modal-open:nth-child(2) modal-container.modal.fade.show:nth-child(8) div.modal-dialog.max-w-80vw div.modal-content app-alert-message:nth-child(1) div.modal-header button.btn-close.close.pull-right > span.visually-hidden');
    public searchInput = () => cy.get('#mainSearch');
    public searchButton = () => cy.get('search-component > div > i');
    public ellipseButton = () => cy.get('#button-basic');
    public editButton = () => cy.get(':nth-child(1) > .dropdown-item');

}