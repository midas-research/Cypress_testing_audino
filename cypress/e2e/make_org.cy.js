let master_id = Cypress.env('master_id'); // Set the global variable value here
let master_password = Cypress.env('master_password'); 
let org_name = Cypress.env('org_name');
let master_email = Cypress.env('master_email'); 
let master_no = Cypress.env('master_no');
describe('make org', () => {

  it('should create a new organization', () => {
    // Log in first
    cy.visit('https://app.audino.in/login');
    cy.get('#email').type(master_id);
    cy.get('#password').type(master_password);
    cy.get("button[type='submit']").click();

    // Click on the specific div to open the menu
    cy.get("div[class='flex items-center px-4']").click();

    // Click on the menu item to go to the organizations page
    cy.get("a[id='headlessui-menu-item-:r6:']").click();

    // Verify the text on the organizations page
    cy.get('.text-3xl.font-bold.tracking-tight.text-white').should('have.text', 'Organizations');

    // Click on the button to create a new organization
    cy.get("button[class='flex items-center gap-x-2 ml-auto rounded-md bg-audino-primary px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-audino-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-audino-primary']").click();

    // Enter the slug and name for the new organization
    cy.get('#slug').type(org_name);
    cy.get('#name').type(org_name);
    cy.get('#description').type('Testing in cypress');
    cy.get('#email').type(master_email);
    cy.get('#mobileNumber').type(master_no);
    cy.get('#location').type('Banaras');
    cy.get("button[class='text-white text-center flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium leading-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-audino-primary bg-audino-primary hover:bg-audino-primary-dark ']").click();

    
    // Optionally, you can submit the form if needed and add assertions to verify the creation of the organization
    // cy.xpath("//button[normalize-space()='Save']").click();
    // cy.wait(1000)
    // Check for the presence of the error message
    // cy.xpath("//div[contains(@class, 'toaster-style')]").then(($toaster) => {
    //   if ($toaster.length > 0) {
    //     // If the error message is present, click the "Back" button
    //     cy.xpath("//button[normalize-space()='Back']").click();
    //     cy.log('Form submission failed, clicked Back button');
    //     cy.url().should('include', '/organizations');
    //     cy.get("div[class='rounded-lg bg-white px-5 py-6 shadow sm:px-6 min-h-full']").should('contain', 'cypress0');
    //   } else {
    //     // Otherwise, continue with the normal flow
    //     cy.url().should('include', '/organizations');
    //     cy.get('.organization-element').should('contain', 'cypress0');
    //   }
    // });
  });

});
