// Global variables
const assigned_to = 'goodchai0'; // Set the global variable value here
let master_id = Cypress.env('master_id'); // Set the global variable value here
let master_password = Cypress.env('master_password');
let org_name = Cypress.env('org_name');
let master_email = Cypress.env('master_email');
let master_no = Cypress.env('master_no');
let worker1_email = Cypress.env('worker1_email')
let worker2_email = Cypress.env('worker2_email')
let worker3_email = Cypress.env('worker3_email')
let worker1_id = Cypress.env('worker1_id')
let worker2_id = Cypress.env('worker2_id')
let worker3_id = Cypress.env('worker3_id')
let file_multiple_task1 = Cypress.env('file_multiple_task1')
let audio_duration_file_multiple_task1 = Cypress.env('audio_duration_file_multiple_task1')
let file_multiple_task2 = Cypress.env('file_multiple_task2')
let audio_duration_file_multiple_task2 = Cypress.env('audio_duration_file_multiple_task2')
let file_multiple_task3 = Cypress.env('file_multiple_task3')
let audio_duration_file_multiple_task3 = Cypress.env('audio_duration_file_multiple_task3')
describe('export annotaion of Single Audio task', () => {
  it('export annotaion of Single Audio task', () => {

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

    // Navigate to the Tasks page again
    cy.xpath("//a[normalize-space()='Tasks']").click();

    // Check if the task list contains the "cypress task" and click on it
    cy.get("ul").find("li").contains('cypress task').should('exist').click();
    cy.wait(2000);

    // Check if the ground truth project already exists
    cy.get(".divide-y.divide-gray-100.mt-2")
      .find("li")
      .then($li => {
        let groundTruthExists = false;
        const $items = Array.from($li);

        // Check if any item contains "Ground Truth"
        $items.forEach(el => {
          if (el.innerText.includes("Ground Truth")) {
            groundTruthExists = true;
          }
        });

        cy.log({ groundTruthExists });

        if (!groundTruthExists) {
          // // Click on "Add new job" button
          // cy.xpath("//button[normalize-space()='Add new job']").click();

          // // Clear the quantity input field and set it to 10
          // cy.xpath("//input[@id='quantity']").clear().type('10');
          // cy.xpath("//button[normalize-space()='Submit']").click();
          //Log error
          cy.error("Ground truth don't exists")
        } else {
          cy.log('Ground truth already exists');

          // Wait for the menu to be visible
          cy.wait(2000)

          // Open the menu and click on 'Export annotation'
          cy.xpath("//div[@class='relative flex-none']", { timeout: 1000000 }).should('be.visible').click();
          cy.xpath("//button[contains(text(), 'Export annotation')]").should('be.visible').click();

          // Wait for the dialog box to appear and then run the download process
          cy.get('#format', { timeout: 1000000 }).should('be.visible');
          cy.get('#format').select("Common Voice");
          // Click on the 'Download' button
          cy.xpath("//button[normalize-space()='Download']").click();

          // Wait for 5 seconds before the next iteration
          cy.wait(5000);
          // Wait for the modal to disappear before proceeding
          cy.xpath("//button[normalize-space()='Downloading...']", { timeout: 1000000 }).should('not.exist');
          // Open the menu and click on 'Export annotation'
          cy.xpath("//div[@class='relative flex-none']", { timeout: 1000000 }).should('be.visible').click();
          cy.xpath("//button[contains(text(), 'Export annotation')]").should('be.visible').click();

          // Wait for the dialog box to appear and then run the download process
          cy.get('#format').should('be.visible', { timeout: 10000000 });
          cy.get('#format').select("Librispeech");
          // Click on the 'Download' button
          cy.xpath("//button[normalize-space()='Download']").click();

          // Wait for 5 seconds before the next iteration
          cy.wait(5000);
          // Wait for the modal to disappear before proceeding
          cy.xpath("//button[normalize-space()='Downloading...']", { timeout: 1000000 }).should('not.exist');
          // Open the menu and click on 'Export annotation'
          cy.xpath("//div[@class='relative flex-none']", { timeout: 1000000 }).should('be.visible').click();
          cy.xpath("//button[contains(text(), 'Export annotation')]").should('be.visible').click();

          // Wait for the dialog box to appear and then run the download process
          cy.get('#format').should('be.visible', { timeout: 1000000 });
          cy.get('#format').select("VoxPopuli");
          // Click on the 'Download' button
          cy.xpath("//button[normalize-space()='Download']").click();

          // Wait for 5 seconds before the next iteration
          cy.wait(5000);
          // Wait for the modal to disappear before proceeding
          cy.xpath("//button[normalize-space()='Downloading...']", { timeout: 1000000 }).should('not.exist');
          // Open the menu and click on 'Export annotation'
          cy.xpath("//div[@class='relative flex-none']", { timeout: 1000000 }).should('be.visible').click();
          cy.xpath("//button[contains(text(), 'Export annotation')]").should('be.visible').click();

          // Wait for the dialog box to appear and then run the download process
          cy.get('#format').should('be.visible', { timeout: 1000000 });
          cy.get('#format').select("Ted-Lium");
          // Click on the 'Download' button
          cy.xpath("//button[normalize-space()='Download']").click();
          // Wait for 5 seconds before the next iteration
          cy.wait(5000);
          // Wait for the modal to disappear before proceeding
          cy.xpath("//button[normalize-space()='Downloading...']", { timeout: 1000000 }).should('not.exist');


          //For Quality Report
          // // Wait for the menu to be visible using a more flexible selector
          // cy.xpath("//div[@class='relative flex-none']")
          //   .should('be.visible', { timeout: 10000 }).click();

          // // Click on the 'View Analytics' menu item
          // cy.xpath("//button[contains(text(), 'Export annotation')]")
          //   .should('be.visible')
          //   .click();
          // // Check if the 'Quality Report' button is present
          // cy.xpath("//button[normalize-space()='Quality Report']")
          //   .then($btn => {
          //     if ($btn.length > 0) {
          //       cy.wrap($btn).click();
          //     } else {
          //       cy.log('"Quality Report" is not present.');
          //     }
          //   });

        }
      });
  });
});


describe('export annotaion of Multiple Audio task', () => {
  it('export annotaion of Single Audio task', () => {

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

    // Navigate to the Tasks page again
    cy.xpath("//a[normalize-space()='Tasks']").click();
    let array_of_audios = [file_multiple_task1, file_multiple_task2, file_multiple_task3];

    for (let i = 0; i < array_of_audios.length; i++) {
    // Check if the task list contains the "cypress task" and click on it
    cy.get("ul").find("li").contains(array_of_audios[i]).should('exist').click();
    cy.wait(2000);

    // Check if the ground truth project already exists
    cy.get(".divide-y.divide-gray-100.mt-2")
      .find("li")
      .then($li => {
        let groundTruthExists = false;
        const $items = Array.from($li);

        // Check if any item contains "Ground Truth"
        $items.forEach(el => {
          if (el.innerText.includes("Ground Truth")) {
            groundTruthExists = true;
          }
        });

        cy.log({ groundTruthExists });

        if (!groundTruthExists) {
          // // Click on "Add new job" button
          // cy.xpath("//button[normalize-space()='Add new job']").click();

          // // Clear the quantity input field and set it to 10
          // cy.xpath("//input[@id='quantity']").clear().type('10');
          // cy.xpath("//button[normalize-space()='Submit']").click();
          //Log error
          cy.error("Ground truth don't exists")
        } else {
          cy.log('Ground truth already exists');

          // Wait for the menu to be visible
          cy.wait(2000)

          // Open the menu and click on 'Export annotation'
          cy.xpath("//div[@class='relative flex-none']", { timeout: 1000000 }).should('be.visible', { timeout: 100000 }).click();
          cy.xpath("//button[contains(text(), 'Export annotation')]").should('be.visible').click();

          // Wait for the dialog box to appear and then run the download process
          cy.get('#format').should('be.visible', { timeout: 100000 });
          cy.get('#format').select("Common Voice");
          // Click on the 'Download' button
          cy.xpath("//button[normalize-space()='Download']").click();

          // Wait for 5 seconds before the next iteration
          cy.wait(5000);
          // Wait for the modal to disappear before proceeding
          cy.xpath("//button[normalize-space()='Downloading...']", { timeout: 1000000 }).should('not.exist');
          // Open the menu and click on 'Export annotation'
          cy.xpath("//div[@class='relative flex-none']", { timeout: 1000000 }).should('be.visible', { timeout: 100000 }).click();
          cy.xpath("//button[contains(text(), 'Export annotation')]").should('be.visible').click();

          // Wait for the dialog box to appear and then run the download process
          cy.get('#format').should('be.visible', { timeout: 100000 });
          cy.get('#format').select("Librispeech");
          // Click on the 'Download' button
          cy.xpath("//button[normalize-space()='Download']").click();

          // Wait for 5 seconds before the next iteration
          cy.wait(5000);
          // Wait for the modal to disappear before proceeding
          cy.xpath("//button[normalize-space()='Downloading...']", { timeout: 1000000 }).should('not.exist');
          // Open the menu and click on 'Export annotation'
          cy.xpath("//div[@class='relative flex-none']", { timeout: 1000000 }).should('be.visible', { timeout: 100000 }).click();
          cy.xpath("//button[contains(text(), 'Export annotation')]").should('be.visible').click();

          // Wait for the dialog box to appear and then run the download process
          cy.get('#format').should('be.visible', { timeout: 100000 });
          cy.get('#format').select("VoxPopuli");
          // Click on the 'Download' button
          cy.xpath("//button[normalize-space()='Download']").click();
          // Wait for 5 seconds before the next iteration
          cy.wait(5000);
          // Wait for the modal to disappear before proceeding
          cy.xpath("//button[normalize-space()='Downloading...']", { timeout: 1000000 }).should('not.exist');
          // Open the menu and click on 'Export annotation'
          cy.xpath("//div[@class='relative flex-none']", { timeout: 1000000 }).should('be.visible', { timeout: 100000 }).click();
          cy.xpath("//button[contains(text(), 'Export annotation')]").should('be.visible').click();

          // Wait for the dialog box to appear and then run the download process
          cy.get('#format').should('be.visible', { timeout: 100000 });
          cy.get('#format').select("Ted-Lium");
          // Click on the 'Download' button
          cy.xpath("//button[normalize-space()='Download']").click();
          // Wait for the modal to disappear before proceeding
          cy.xpath("//button[normalize-space()='Downloading...']", { timeout: 1000000 }).should('not.exist');
          
          //For Quality Report
          // // Wait for the menu to be visible using a more flexible selector
          // cy.xpath("//div[@class='relative flex-none']")
          //   .should('be.visible', { timeout: 10000 }).click();

          // // Click on the 'View Analytics' menu item
          // cy.xpath("//button[contains(text(), 'Export annotation')]")
          //   .should('be.visible')
          //   .click();
          // // Check if the 'Quality Report' button is present
          // cy.xpath("//button[normalize-space()='Quality Report']")
          //   .then($btn => {
          //     if ($btn.length > 0) {
          //       cy.wrap($btn).click();
          //     } else {
          //       cy.log('"Quality Report" is not present.');
          //     }
          //   });
          // Click on the navigation to list of tasks
        cy.xpath("//button[normalize-space()='Back']").click();

        }
      });
    }
  });
});