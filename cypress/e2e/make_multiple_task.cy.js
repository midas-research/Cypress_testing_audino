
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
        cy.xpath("//a[normalize-space()='Tasks']").click();

        cy.wait(1000);

        // Check if the task "cypress task" already exists
        cy.get(".divide-y.divide-gray-100.mt-2", { timeout: 10000 })
            .then($div => {
                if ($div.find('li').length <= 1) {
                    cy.log('No tasks found');
                    //normal flow to create the task

                    //click on "+" button
                    cy.wait(1000)
                    cy.get("svg.h-7.w-7.text-audino-primary-dark").click();

                    // Click on "Add new task" button
                    cy.xpath("//button[normalize-space()='Add multiple task']", { timeout: 1000 }).click();

                    // Click on the project dropdown to open it
                    // cy.get('#project').click();

                    // Select "cypress project" from the dropdown
                    cy.get('#project').select('cypress project');

                    // Select subset "test"
                    cy.get('#subset').select('Test');

                    // Select assigned_to if present
                    cy.get('#assign_to').select(master_id);

                    // Upload file
                    cy.get('#dropzone-file').attachFile([`../../${file_multiple_task1}`,`../../${file_multiple_task2}`,`../../${file_multiple_task3}`]);
                    // // Click on the disclosure button
                    cy.get("span[class='ml-6 flex items-center'] svg").click();
                    cy.wait(5000);
                    // Parse the audio duration
                    const [minutes, seconds] = audio_duration_file_multiple_task1.split('.').map(Number);

                    // Convert minutes and seconds to milliseconds
                    const segment_in_ms = (minutes * 60 * 1000) + (seconds * 1000);
                    // Calculate the value and round it up
                    const dividedValue = Math.ceil(segment_in_ms / 5)+1000;

                    // Use the rounded value in Cypress
                    cy.get('#segment_duration').clear().type(dividedValue);
                    // Submit the form (assuming there is a form to submit)
                    cy.xpath("//button[normalize-space()='Save']").click();
                } else {
                    let s = '';
                    let taskExists = false;
                    $div.find('li').each((index, el) => {
                        cy.log(el.innerText);
                        s += el.innerText;
                    });
                    if (s.includes("cypress task")) {
                        taskExists = true;
                    }
                    //click on "+" button
                    cy.wait(1000)
                    cy.get("svg.h-7.w-7.text-audino-primary-dark").click();

                    // Click on "Add new task" button
                    cy.xpath("//button[normalize-space()='Add multiple task']", { timeout: 1000 }).click();

                    // Click on the project dropdown to open it
                    // cy.get('#project').click();

                    // Select "cypress project" from the dropdown
                    cy.get('#project').select('cypress project');

                    // Select subset "test"
                    cy.get('#subset').select('Test');

                    // Select assigned_to if present
                    cy.get('#assign_to').select(assigned_to);



                    // Upload file
                    cy.get('#dropzone-file').attachFile([`../../${file_multiple_task1}`,`../../${file_multiple_task2}`,`../../${file_multiple_task3}`]);

                    // Click on the disclosure button
                    cy.get("span[class='ml-6 flex items-center'] svg").click();
                    cy.wait(5000);
                    // Parse the audio duration
                    const [minutes, seconds] = audio_duration_file_multiple_task1.split('.').map(Number);

                    // Convert minutes and seconds to milliseconds
                    const segment_in_ms = (minutes * 60 * 1000) + (seconds * 1000);          // Set #segment_duration to 0
                    // Calculate the value and round it up
                    const dividedValue = Math.ceil(segment_in_ms / 5)+1000;

                    // Use the rounded value in Cypress
                    cy.get('#segment_duration').clear().type(dividedValue);
                    if (!taskExists) {
                        // Submit the form (assuming there is a form to submit)
                        cy.xpath("//button[normalize-space()='Save']").click();
                    } else {
                        cy.log('Project "cypress task" already exists, skipping creation steps.');
                    }
                }
            });

        // Click on the back button
        cy.xpath("//button[normalize-space()='Back']").click();
    });

});
