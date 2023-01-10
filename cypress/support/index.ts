declare namespace Cypress
{
    interface Chainable
    {
        Login: (userNam: string, password: string) => void;
    }
}