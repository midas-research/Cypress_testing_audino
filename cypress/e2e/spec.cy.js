let assigned_to = 'goodchai0'; // Set the global variable value here


// describe('Audino Login Test', () => {
//   it('should log in with valid credentials', () => {
//     // Visit the login page
//     cy.visit('https://app.audino.in/login');

//     // Enter email
//     cy.get('#email').type('goodchai0');

//     // Enter password
//     cy.get('#password').type('qudino1234');

//     // Click the submit button
//     cy.get("button[type='submit']").click();

//   });
// });
// describe('make org', () => {

//   it('should create a new organization', () => {
//     // Log in first
//     cy.visit('https://app.audino.in/login');
//     cy.get('#email').type('goodchai0');
//     cy.get('#password').type('qudino1234');
//     cy.get("button[type='submit']").click();

//     // Click on the specific div to open the menu
//     cy.get("div[class='flex items-center px-4']").click();

//     // Click on the menu item to go to the organizations page
//     cy.get("a[id='headlessui-menu-item-:r6:']").click();

//     // Verify the text on the organizations page
//     cy.get('.text-3xl.font-bold.tracking-tight.text-white').should('have.text', 'Organizations');

//     // Click on the button to create a new organization
//     cy.get("button[class='flex items-center gap-x-2 ml-auto rounded-md bg-audino-primary px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-audino-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-audino-primary']").click();

//     // Enter the slug and name for the new organization
//     cy.get('#slug').type('cypress0');
//     cy.get('#name').type('cypress');
//     cy.get('#description').type('Testing in cypress');
//     cy.get('#email').type('amitkewot59@gmail.com');
//     cy.get('#mobileNumber').type('7002836460');
//     cy.get('#location').type('Banaras');
//     cy.get("button[class='text-white text-center flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium leading-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-audino-primary bg-audino-primary hover:bg-audino-primary-dark ']").click();

//     // Optionally, you can submit the form if needed and add assertions to verify the creation of the organization
//     // cy.get("form").submit();
//     // cy.url().should('include', '/organizations');
//     // cy.get('.organization-element').should('contain', 'cypress');
//   });

// });
// describe('select org', () => {

//   it('should select the organization', () => {
//     // Log in first
//     cy.visit('https://app.audino.in/login');
//     cy.get('#email').type('goodchai0');
//     cy.get('#password').type('qudino1234');
//     cy.get("button[type='submit']").click();
//     // Click on the specific div to open the menu
//     cy.get("div[class='flex items-center px-4']").click();

//     // Click on the menu item to go to the organizations page
//     cy.get("a[id='headlessui-menu-item-:r6:']").click();

//     // Verify the text on the organizations page
//     cy.get('.text-3xl.font-bold.tracking-tight.text-white').should('have.text', 'Organizations');
//     // Visit the organizations page
//     // cy.visit('https://app.audino.in/organizations?page=1');

//     // Check if the organization list contains the organization
//     cy.get("ul.divide-y.divide-gray-100")
//       .find("li")
//       .contains('cypress')
//       .should('exist')
//       .click();

//        // Click on the Projects link
//     cy.xpath("//a[normalize-space()='Projects']").click();

//     // Check if the element contains the specified text and click to create a new project
//     cy.xpath("//div[@class='text-center flex justify-center items-center flex-col h-full p-6']")
//       .should('contain.text', 'Get started by creating a new project.')
//       .click();

//     // Enter project name
//     cy.get('#name').type('cypress project');

//     // Select from dropdown using global variable
//     cy.get('#assign_to').select(assigned_to);

//     // Click on "Add new label" button twice
//     cy.xpath("//button[normalize-space()='Add new label']").click();
//     cy.xpath("//button[normalize-space()='Add new label']").click();

//     // Enter text for the labels
//     cy.xpath("//td[@class='relative py-4 pl-4 pr-3 text-sm sm:pl-6']//input[@id='text']").type('speaker one');
//     cy.xpath("//td[@class='border-t border-transparent relative py-4 pl-4 pr-3 text-sm sm:pl-6']//input[@id='text']").type('speaker 2');

//     // Click on the Save button
//     cy.xpath("//button[normalize-space()='Save']").click();

//     // Click on the back button
//     cy.xpath("//div[contains(@class,'flex items-center mb-2 hover:cursor-pointer')]").click();
//   });

// });

// describe('select task', () => {

//   it('create new task ', () => {
//         // Log in first
//         cy.visit('https://app.audino.in/login');
//         cy.get('#email').type('goodchai0');
//         cy.get('#password').type('qudino1234');
//         cy.get("button[type='submit']").click();


//         // Click on the specific div to open the menu
//         cy.get("div[class='flex items-center px-4']").click();

//         // Click on the menu item to go to the organizations page
//         cy.get("a[id='headlessui-menu-item-:r6:']").click();
    
//         // Verify the text on the organizations page
//         cy.get('.text-3xl.font-bold.tracking-tight.text-white').should('have.text', 'Organizations');
    
//         // Check if the organization list contains the organization
//         cy.get("ul.divide-y.divide-gray-100")
//           .find("li")
//           .contains('cypress')
//           .should('exist')
//           .click();
    
//         // Click on the Tasks link
//         cy.xpath("//a[normalize-space()='Tasks']").click();
    
//         // Click on "Add new task" button
//         cy.xpath("//button[normalize-space()='Add new task']").click();
    
//         // Enter task name
//         cy.get('#name').type('cypress task');
    
//         // Click on the project dropdown to open it
//         // cy.get('#project').click();

//         // Select "cypress project" from the dropdown
//         cy.get('#project').select('cypress project');

//         // Select subset "test"
//         cy.get('#subset').select('Test');

//         // Select assigned_to if present
//         cy.get('#assign_to').select(assigned_to);

    
//         // Upload file
//         cy.get('#dropzone-file').attachFile('../../file.mp3');
    
//         // Click on the disclosure button
//         cy.get("span[class='ml-6 flex items-center'] svg").click();
//         cy.wait(5000)
//         // Set #segment_duration to 0
//         cy.get('#segment_duration').clear().type("360000");
//         // Submit the form (assuming there is a form to submit)
//         // For example, if there's a Save button to submit
//         cy.xpath("//button[normalize-space()='Save']").click();
//   });

// });

// describe('make ground truth task', () => {
//   it('go to task and create ground truth', () => {

//         // Log in first
//         cy.visit('https://app.audino.in/login');
//         cy.get('#email').type('goodchai0');
//         cy.get('#password').type('qudino1234');
//         cy.get("button[type='submit']").click();


//         // Click on the specific div to open the menu
//         cy.get("div[class='flex items-center px-4']").click();

//         // Click on the menu item to go to the organizations page
//         cy.get("a[id='headlessui-menu-item-:r6:']").click();

//         // Verify the text on the organizations page
//         cy.get('.text-3xl.font-bold.tracking-tight.text-white').should('have.text', 'Organizations');

//         // Check if the organization list contains the organization
//         cy.get("ul.divide-y.divide-gray-100")
//           .find("li")
//           .contains('cypress')
//           .should('exist')
//           .click();

//     // Navigate to the Tasks page again
//     cy.xpath("//a[normalize-space()='Tasks']").click();

//     // Check if the task list contains the "cypress task" and click on it
//     cy.get("ul").find("li").contains('cypress task').should('exist').click();

//     // Click on "Add new job" button
//     cy.xpath("//button[normalize-space()='Add new job']").click();

//     // Clear the quantity input field and set it to 10
//     cy.xpath("//input[@id='quantity']").clear().type('10');

//     // Click on the navigation element to go back
//     cy.xpath("//button[normalize-space()='Back']").click();
//   });

  
// });

// describe('click on every job', () => {

//   it('click on every job and drag wave element', () => {

//     // Log in first
//     cy.visit('https://app.audino.in/login');
//     cy.get('#email').type('goodchai0');
//     cy.get('#password').type('qudino1234');
//     cy.get("button[type='submit']").click();

//     // Click on the specific div to open the menu
//     cy.get("div[class='flex items-center px-4']").click();

//     // Click on the menu item to go to the organizations page
//     cy.get("a[id='headlessui-menu-item-:r6:']").click();

//     // Verify the text on the organizations page
//     cy.get('.text-3xl.font-bold.tracking-tight.text-white').should('have.text', 'Organizations');

//     // Check if the organization list contains the organization
//     cy.get("ul.divide-y.divide-gray-100")
//       .find("li")
//       .contains('cypress')
//       .should('exist')
//       .click();

//     // Navigate to the Tasks page again
//     cy.xpath("//a[normalize-space()='Tasks']").click();

//     // Check if the task list contains the "cypress task" and click on it
//     cy.get("ul").find("li").contains('cypress task').should('exist').click();

//     // Get the list of jobs and click on each one
//     cy.xpath("//ul[@class='divide-y divide-gray-100 mt-2']").find("li").each(($el, index, $list) => {

//       // Set interceptors for each job click
//       cy.intercept('GET', '**/api/audio/**').as('loadAudio');

//       cy.wrap($el).click();

//       //  // Wait for the wave element to be present
//       //  cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible')
//       //  .then(($wave) => {
//       //    cy.wait(2000);
//       //    const waveBounds = $wave[0].getBoundingClientRect();

//       //    cy.wrap($wave)
//       //      .trigger('mousedown', { which: 1, clientX: waveBounds.left, clientY: waveBounds.top, force: true })
//       //      .trigger('mousemove', { which: 1, clientX: waveBounds.right, clientY: waveBounds.top, force: true })
//       //      .trigger('mouseup', { force: true });
//       //  });


//       // Wait for the wave element to be present
//       cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible')
//       .then(($wave) => {
//         cy.wait(20000);
//         const waveBounds = $wave[0].getBoundingClientRect();
//         console.log(waveBounds)

//         cy.wrap($wave)
//           .trigger('mousedown', { which: 1, clientX: waveBounds.left, clientY: waveBounds.top, force: true })
//           .trigger('mousemove', { which: 1, clientX: waveBounds.right, clientY: waveBounds.top, force: true })
//           .trigger('mouseup', { force: true });
//       });


//       // Wait for a short duration to ensure page transition is complete

//       // Navigate back to the tasks page
//       // cy.xpath("//button[normalize-space()='Back']").click();

//       // Wait for a short duration to ensure page transition is complete
//       cy.wait(2000);
//     });
//   });
// });
