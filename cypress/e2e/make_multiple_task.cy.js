// Global variables
const assigned_to = 'goodchai0';
let master_id = Cypress.env('master_id');
let master_password = Cypress.env('master_password');
let org_name = Cypress.env('org_name');
let file_multiple_task1 = Cypress.env('file_multiple_task1');
let audio_duration_file_multiple_task1 = Cypress.env('audio_duration_file_multiple_task1');
let file_multiple_task2 = Cypress.env('file_multiple_task2');
let file_multiple_task3 = Cypress.env('file_multiple_task3');

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
        cy.get('#email', { timeout: 50000 }).type(master_id);
        cy.get('#password', { timeout: 50000 }).type(master_password);
        cy.get("button[type='submit']", { timeout: 50000 }).click();

        // Navigate to Organizations page
        cy.get("div[class='flex items-center px-4']", { timeout: 50000 }).click();
        cy.get("a[id='headlessui-menu-item-:r6:']", { timeout: 50000 }).click();

        // Verify Organizations page loaded
        cy.get('.text-3xl.font-bold.tracking-tight.text-white', { timeout: 50000 }).should('have.text', 'Organizations');

        // Select the organization
        cy.get("ul.divide-y.divide-gray-100", { timeout: 50000 })
            .find("li", { timeout: 50000 })
            .contains(org_name, { timeout: 50000 })
            .should('exist')
            .click();

        // Click on the Tasks link
        cy.xpath("//a[normalize-space()='Tasks']", { timeout: 50000 }).click();
        cy.intercept('GET', '**/api/**').as('apiCall');

        // Loop through datasets to create tasks
        for (let i = 0; i < datasets.length; i++) {
            let dataset = datasets[i];

            // Check if the task already exists
            cy.get(".divide-y.divide-gray-100.mt-2", { timeout: 500000 }).then($div => {
                if ($div.find('li').length <= 1) {
                    cy.log('No tasks found, creating a new task');

                    // Click on "+" button to add a task
                    cy.get("svg.h-7.w-7.text-audino-primary-dark", { timeout: 50000 }).click();

                    // Click on "Add multiple task"
                    cy.xpath("//button[normalize-space()='Add multiple task']", { timeout: 50000 }).click();

                    // Enter task details
                    cy.get('#name', { timeout: 50000 }).type(`_${dataset}`);
                    cy.get('#project', { timeout: 50000 }).select('cypress project');
                    cy.get('#subset', { timeout: 50000 }).select('Test');
                    cy.get('#assign_to', { timeout: 50000 }).select(master_id);

                    // Select the dataset
                    cy.xpath(`//label[normalize-space()='${dataset}']`, { timeout: 50000 }).click();

                    // Upload files
                    cy.get('#dropzone-file', { timeout: 50000 }).attachFile([`../../${file_multiple_task1}`, `../../${file_multiple_task2}`, `../../${file_multiple_task3}`]);

                    // Click on the disclosure button and set segment duration
                    cy.get("span[class='ml-6 flex items-center'] svg", { timeout: 50000 }).click();
                    cy.wait(5000);

                    const [minutes, seconds] = audio_duration_file_multiple_task1.split('.').map(Number);
                    const segment_in_ms = (minutes * 60 * 1000) + (seconds * 1000);
                    const dividedValue = Math.ceil(segment_in_ms / 3);

                    cy.get('#segment_duration', { timeout: 50000 }).clear().type(dividedValue);
                    cy.wait(2000);

                    // Save the task
                    cy.xpath("//button[normalize-space()='Save']", { timeout: 50000 }).click();

                    // Go back to the task list
                    // cy.xpath("//button[normalize-space()='Back']", { timeout: 50000 }).click();
                    // Wait for API calls to complete
                    cy.wait('@apiCall', { timeout: 50000 });
                }
            });
        }
        cy.wait(5000)
    });
});
