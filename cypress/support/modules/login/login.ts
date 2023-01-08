export class Login
{
    public userNameInput = () => cy.get('#userName');
    public passwordInput = () => cy.get('#password');
    public loginButton = () => cy.contains('button', 'Login');
}