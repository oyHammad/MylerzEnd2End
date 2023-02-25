class EditPickupOrder
{
    public weightInput = () => cy.get('#pkgWeight');
    public saveAndCloseButton = () => cy.contains('button', ' Save and Close ');
    public firstPackage = () => cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .d-none > .each-package-row', { timeout: 10000 });
}

export default EditPickupOrder;