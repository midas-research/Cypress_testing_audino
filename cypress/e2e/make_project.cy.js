let assigned_to = 'goodchai0'; // Set the global variable value here
let master_id = Cypress.env('master_id'); // Set the global variable value here
let master_password = Cypress.env('master_password'); 
let org_name = Cypress.env('org_name');
let master_email = Cypress.env('master_email'); 
let master_no = Cypress.env('master_no');
describe('select org and create project', () => {
  it('should select the organization and create project if not exists', () => {
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

    // Check if the organization list contains the organization
    cy.get("ul.divide-y.divide-gray-100")
      .find("li")
      .contains(org_name)
      .should('exist')
      .click();

    // Click on the Projects link
    cy.xpath("//a[normalize-space()='Projects']").click();
    cy.wait(2000);

    // Check if the project "cypress project" already exists
    cy.get("ul[class='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6']")
      .find("li")
      .then($li => {
        let projectExists = Array.from($li).some(el => el.innerText.includes('cypress project'));

        if (!projectExists) {
          cy.log('Project "cypress project" does not exist.');

          // Proceed with project creation steps if project does not exist
          cy.xpath("//div[@class='text-center flex justify-center items-center flex-col h-full p-6']")
            .should('contain.text', 'Get started by creating a new project.')
            .click();

          // Enter project name
          cy.get('#name').type('cypress project');

          // Select from dropdown using global variable
          cy.get('#assign_to').select(master_id);

          // Click on "Add new label" button
          cy.xpath("//button[normalize-space()='Add new label']").click();
          cy.xpath("//button[normalize-space()='Add new label']").click();

          //FIRST SPEAKER AND ITS ATTRIBUTE
          // Enter text for the labels
          cy.xpath("//td[@class='relative py-4 pl-4 pr-3 text-sm sm:pl-6']//input[@id='text']").eq(0).type('speaker 1');
          
          // Add the attribute
          cy.xpath("//td[@class='relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6']//button[1]").click();
          cy.get("input[id='label-name']").type('Aman');
          cy.xpath("//span[@class='ml-1 text-sm font-medium text-audino-primary group-hover:text-audino-primary-dark']").click();
          cy.xpath("//span[@class='ml-1 text-sm font-medium text-audino-primary group-hover:text-audino-primary-dark']").click();

          // Enter different text in the three text fields
          cy.xpath("//div[@class='relative flex items-start flex-wrap gap-2 mb-2']//input[@id='text']").eq(0).type('Text for first field');
          cy.xpath("//div[@class='relative flex items-start flex-wrap gap-2 mb-2']//input[@id='text']").eq(1).type('Text for second field');
          cy.xpath("//div[@class='relative flex items-start flex-wrap gap-2 mb-2']//input[@id='text']").eq(2).type('Text for third field');

          cy.xpath("//button[normalize-space()='Update']").click();
          cy.wait(1000)

          //SECOND SPEAKER AND ITS ATTRIBUTE
          cy.xpath("//tbody/tr[2]/td[1]/div[1]/div[1]/div[1]/input[1]").eq(0).type('speaker 2');
          // Add the attribute
          cy.xpath("//tbody/tr[1]/td[4]/button[1]").eq(0);
          cy.get('tbody tr:nth-child(2) td:nth-child(4) button:nth-child(1)')
          .should('be.visible')  // Ensure the button is visible
          .should('not.be.disabled')  // Ensure the button is enabled
          .and('contain', 'Add attributes')  // Ensure the button contains the text "Add attributes"
          .click();  // Click the button
        
          cy.get("input[id='label-name']").type('Amit');
          cy.xpath("//span[@class='ml-1 text-sm font-medium text-audino-primary group-hover:text-audino-primary-dark']").click();
          cy.xpath("//span[@class='ml-1 text-sm font-medium text-audino-primary group-hover:text-audino-primary-dark']").click();

          // Enter different text in the three text fields
          cy.xpath("//div[@class='relative flex items-start flex-wrap gap-2 mb-2']//input[@id='text']").eq(0).type('Text for first field');
          cy.xpath("//div[@class='relative flex items-start flex-wrap gap-2 mb-2']//input[@id='text']").eq(1).type('Text for second field');
          cy.xpath("//div[@class='relative flex items-start flex-wrap gap-2 mb-2']//input[@id='text']").eq(2).type('Text for third field');

          cy.xpath("//button[normalize-space()='Update']").click();
          cy.wait(1000)

          //THIRD SPEAKER AND ITS ATTRIBUTE
          // Select all input fields within the specific table row
          cy.get('tbody tr:nth-child(3) td:nth-child(1) div > div > div > input')
          .filter('[value=""]')  // Filter to get only empty input fields
          .first()  // Choose the first empty input field (or specify further if needed)
          .type('speaker 3');  // Type the value into the empty input field
          
          // Click on the Save button
          cy.xpath("//button[normalize-space()='Save']").click();
        } else {
          cy.log('Project "cypress project" already exists, skipping creation steps.');
        }
      });

    // Click on the back button
    cy.xpath("//div[contains(@class,'flex items-center mb-2 hover:cursor-pointer')]").click();
    cy.wait(5000)
  });
});
