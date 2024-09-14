// Global variables
const assigned_to = 'goodchai0'; // Set the global variable value here
let master_id = Cypress.env('master_id'); // Set the global variable value here
let master_password = Cypress.env('master_password');
let org_name = Cypress.env('org_name');
let master_email = Cypress.env('master_email');
let master_no = Cypress.env('master_no');
let worker1_email = Cypress.env('worker1_email');
let worker2_email = Cypress.env('worker2_email');
let worker3_email = Cypress.env('worker3_email');
let worker1_id = Cypress.env('worker1_id');
let worker2_id = Cypress.env('worker2_id');
let worker3_id = Cypress.env('worker3_id');
let file_name = Cypress.env('file_name');
let audio_duration = Cypress.env('audio_duration');

// List of datasets
const datasets = [
  'LibriVox',
  'VCTK',
  'VoxCeleb',
  'LibriSpeech',
  'VoxPopuli',
  'TED-LIUM',
  'Common Voice',
];

describe('select task', () => {
  it('create new task', () => {
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

        // Click on the Tasks link
        cy.xpath("//a[normalize-space()='Tasks']", { timeout: 50000 }).click();
        cy.intercept('GET', '**/api/**').as('apiCall');

    datasets.forEach((dataset) => {
      // Check if the task already exists
      cy.get(".divide-y.divide-gray-100.mt-2", { timeout: 1000000 })
        .then($div => {
          let taskExists = false;
          $div.find('li').each((index, el) => {
            cy.log(el.innerText);
            if (el.innerText.includes(`cypress_task_${dataset}`)) {
              taskExists = true;
            }
          });

          if (!taskExists) {
            // Click on the "+" button
            cy.wait(1000);
            cy.get("svg.h-7.w-7.text-audino-primary-dark").click();

            // Click on "Add new task" button
            cy.xpath("//button[normalize-space()='Add new task']", { timeout: 1000 }).click();

            // Enter task name
            cy.get('#name').type(`cypress_task_${dataset}`);

            // Select the project from the dropdown
            cy.get('#project').select('cypress project');

            // Select subset "test"
            cy.get('#subset').select('Test');

            // Select assigned_to if present
            cy.get('#assign_to').select(assigned_to);
            // Selecting the dataset
            cy.xpath(`//label[normalize-space()='${dataset}']`).click();
            // Upload file
            cy.get('#dropzone-file').attachFile(`../../${file_name}`);

            // Click on the disclosure button
            cy.get("span[class='ml-6 flex items-center'] svg").click();
            cy.wait(5000);

            // Parse the audio duration
            const [minutes, seconds] = audio_duration.split('.').map(Number);

            // Convert minutes and seconds to milliseconds
            const segment_in_ms = (minutes * 60 * 1000) + (seconds * 1000);

            // Calculate the value and round it up
            const dividedValue = Math.ceil(segment_in_ms / 3) + 1000;

            // Use the rounded value in Cypress
            cy.get('#segment_duration').clear().type(dividedValue);

            // Submit the form
            cy.xpath("//button[normalize-space()='Save']",{timeout:50000}).click();
            // Click on the back button
            // cy.xpath("//button[normalize-space()='Back']",{timeout:50000}).click();
            // Wait for API calls to complete
            cy.wait('@apiCall', { timeout: 50000 });
          } else {
            cy.log(`Task "cypress_task_${dataset}" already exists, skipping creation steps.`);
          }
        });
        });
    });

});
