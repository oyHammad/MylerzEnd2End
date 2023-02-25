export class PickupOrder
{
    public serviceType = () => cy.get('#serviceType');
    public PackageService = () => cy.get('#PackageService');
    public PaymentType = () => cy.get('#PaymentType');
    public ServieCategory = () => cy.get('#ServieCategory');
    public packageDescription = () => cy.get('#pkgDescription');
    public packageWeight = () => cy.get('#pkgWeight');
    public COD = () => cy.get('#COD');
    public consigneesDetails = () => cy.contains('.each-tab', ' Consignees Details ');
    public customerName = () => cy.get('#customerName');
    public customerMobile = () => cy.get('#customerMobile');
    public customerStreet = () => cy.get('#customerStreet');
    public City = () => cy.get('#City');
    public Neighborhood = () => cy.get('#Neighborhood');
    public subZone = () => cy.get(':nth-child(10) > .each-input > .input > #Neighborhood');
    public AddressCategory = () => cy.get('#AddressCategory');
    public saveAndCloseButton = () => cy.contains('button', ' Save and Close ');
}