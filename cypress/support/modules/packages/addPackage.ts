export class AddPackage
{
    public serviceType = () => cy.get('#serviceType');
    public packageService = () => cy.get('#PackageService');
    public servieCategory = () => cy.get('#ServieCategory');
    public paymentType = () => cy.get('#PaymentType');
    public packageDescriptionInput = () => cy.get('#pkgDescription');
    public consigneesDetails = () => cy.contains('.each-tab', ' Consignees Details ');
    public customerNameInput = () => cy.get('#customerName');
    public customerMobileInput = () => cy.get('#customerMobile');
    public streetInput = () => cy.get('#customerStreet');
    public City = () => cy.get('#City');
    public Neighborhood = () => cy.get('#Neighborhood');
    public subZone = () => cy.get(':nth-child(10) > .each-input > .input > #Neighborhood');
    public addressCategory = () => cy.get('#AddressCategory');
    public saveAndCloseButton = () => cy.contains('button', ' Save and Close ');

}