declare namespace Cypress
{
    interface Chainable
    {
        Login: (userName: string, password: string) => void;
        getByPlaceholder(input: string): Chainable<any>;

    }
}