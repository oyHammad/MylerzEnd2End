export class PickupOrders
{
    public addNewButton = () => cy.get('[routerlink="new"]');
    public merchantSearchRaw = () => cy.get('#MerchantSearch');
    public merchantDropDown = () => cy.get('.dropdown-item');
    public merchantDropDownList = () => cy.get('.selected-list');
    public calenderButton = () => cy.get('[type="button"]');
    public calenderDays = () => cy.get('.caltable > tbody');
    public dueDateButton = () => cy.get('.caltable > tbody > tr>td>.datevalue>.markcurrday');
    public addNewPickupOrderButton = () => cy.get(':nth-child(3) > .mb-0');
    public saveAndCloseButton = () => cy.get('.btn-Send');
    public alertBody = () => cy.get('.table>tbody >tr>td', { timeout: 20000 });
    public closeAlertButton = () => cy.get('.visually-hidden');
    public filterButton = () => cy.get('.filter-btn');
    public searchRow = () => cy.get('#mainSearch');
    public fromDateInput = () => cy.get('[placeholder="Select a Date"]');
    public toDateinput = () => cy.get('body > app-root > div.container-fluid.m-0 > div > div.main-content > pickup > app-pickup-list > div.col-12.table-holder.card > div.fillter-div > div.row.align-normal > div:nth-child(3) > date-picker > div > input');
    public searchButton = () => cy.get('.search-parent > .fa');
    public optionMenu = () => cy.get('#button-basic');
    public editButton = () => cy.get('.dropdown-item');
    public uploadButton = () => cy.get('.header_options > :nth-child(1) > .mb-0');
    public dueDateInput = () => cy.get('.caltable>tbody>tr>td').then(($el) =>
    {
        return ($el.filter('td.daycell.currmonth.tablesingleday').eq(0));
    });
}