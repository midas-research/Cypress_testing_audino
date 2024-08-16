let master_id = Cypress.env('master_id'); // Set the global variable value here
let master_password = Cypress.env('master_password'); 
describe('Audino Login Test', () => {
  it('should log in with valid credentials', () => {
    // Visit the login page
    cy.visit('https://app.audino.in/login');
    // Enter email
    cy.get('#email').type(master_id);

    // Enter password
    cy.get('#password').type(master_password);

    // Click the submit button
    cy.get("button[type='submit']").click();

  });
});