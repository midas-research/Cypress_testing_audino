let assigned_to = 'goodchai0'; // Set the global variable value here
let master_id = Cypress.env('master_id'); // Set the global variable value here
let master_password = Cypress.env('master_password');
let org_name = Cypress.env('org_name');
let master_email = Cypress.env('master_email');
let master_no = Cypress.env('master_no');
let worker1_email = Cypress.env('worker1_email')
let worker2_email = Cypress.env('worker2_email')
let worker3_email = Cypress.env('worker3_email')
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

    // Additional steps to check for ul and li, and click on svg within the active li
    cy.get("ul.divide-y.divide-gray-100")
      .find("li.flex.flex-wrap.items-center.justify-between.gap-x-6.gap-y-4.py-5.sm\\:flex-nowrap")
      .contains(org_name)
      .click() // Click on the li containing cypress0
      .then(($li) => {
        // Ensure the li is clicked and handle potential re-rendering
        cy.wrap($li).then(() => {
          cy.get("span.inline-flex.flex-shrink-0.items-center.rounded-full.h-5.bg-green-50.px-1\\.5.py-0\\.5.text-xs.font-medium.text-green-700.ring-1.ring-inset.ring-green-600\\/20.ml-4")
            .contains('Active')
            .parents('li.flex.flex-wrap.items-center.justify-between.gap-x-6.gap-y-4.py-5.sm\\:flex-nowrap')

          cy.xpath("//div[contains(@class,'text-gray-400 hover:text-gray-700')]").click()
        });
      });

    //Invite 1
    cy.xpath("//button[normalize-space()='Invite Members']").click();
    cy.xpath("//form[contains(@class,'gap-4 mt-4')]//input[@id='email']")
      .type(worker1_email);

    // Select the dropdown and choose the "Worker" role
    cy.xpath("(//select[@id='role'])[1]").select('Worker');

    // Click the "Ok" button
    cy.xpath("(//button[normalize-space()='Ok'])[1]").click();

    //If already present
    // cy.xpath("//div[text()='The user is a member of the organization already.']").then(($div) => {
    //   if ($div.length > 0) {
    //     // If the message is present, click the cancel button
    //     cy.xpath("//button[contains(@class,'rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-600')]")
    //       .click();
    //   }})


    //Invite 2
    cy.xpath("//button[normalize-space()='Invite Members']").click();
    cy.xpath("//form[contains(@class,'gap-4 mt-4')]//input[@id='email']")
      .type(worker2_email);

    // Select the dropdown and choose the "Worker" role
    cy.xpath("(//select[@id='role'])[1]").select('Worker');

    // Click the "Ok" button
    cy.xpath("(//button[normalize-space()='Ok'])[1]").click();

    cy.wait(1000)

    //If already present
    // cy.xpath("//div[text()='The user is a member of the organization already.']").then(($div) => {
    //   if ($div.length > 0) {
    //     // If the message is present, click the cancel button
    //     cy.xpath("//button[contains(@class,'rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-600')]")
    //       .click();
    //   }})


    //Invite 3
    cy.xpath("//button[normalize-space()='Invite Members']").click();
    cy.xpath("//form[contains(@class,'gap-4 mt-4')]//input[@id='email']")
      .type(worker3_email);

    // Select the dropdown and choose the "Worker" role
    cy.xpath("(//select[@id='role'])[1]").select('Worker');

    // Click the "Ok" button
    cy.xpath("(//button[normalize-space()='Ok'])[1]").click();

    cy.wait(1000)

    //If already present
    // cy.xpath("//div[text()='The user is a member of the organization already.']").then(($div) => {
    //   if ($div.length > 0) {
    //     // If the message is present, click the cancel button
    //     cy.xpath("//button[contains(@class,'rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-600')]")
    //       .click();
    //   }})

    //Click on save button after adding

    cy.xpath("//button[normalize-space()='Save']").click();

  });

});
