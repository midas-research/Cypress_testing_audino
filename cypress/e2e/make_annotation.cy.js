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
describe('click on every job', () => {

  it('click on every job and drag wave element', () => {

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

    // Get the list of jobs and click on each one
    cy.xpath("//ul[@class='divide-y divide-gray-100 mt-2']").find("li").each(($el, index, $list) => {

      // Set interceptors for each job click
      cy.intercept('GET', '**/api/audio/**').as('loadAudio');
      cy.wait(5000);
      cy.wrap($el).click();

      cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible');

      // Wait for the waveform to fully load
      cy.wait(2000);

      // Get the canvas element inside the waveform and its bounding rectangle
      cy.get("div[id='waveform'] > wave > wave > canvas").then(($canvas) => {
        const canvasBounds = $canvas[0].getBoundingClientRect();
        cy.wait(5000);

        // Log coordinates for debugging
        const startX = canvasBounds.left + 5;
        const startY = canvasBounds.top + canvasBounds.height / 2;
        const endX = canvasBounds.right - 5;
        const endY = canvasBounds.top + canvasBounds.height / 2;
        cy.log(`Start Coordinates: (${startX}, ${startY})`);
        cy.log(`End Coordinates: (${endX}, ${endY})`);

        // Click and move the mouse to the right, then release
        cy.wrap($canvas)
          .trigger('mousedown', { which: 1, clientX: startX, clientY: startY, force: true })
          .wait(1000) // Add delay to ensure interaction is registered
          .trigger('mousemove', { which: 1, clientX: endX, clientY: endY, force: true })
          .wait(1000) // Add delay to ensure interaction is registered
          .trigger('mouseup', { force: true });

        // Perform the final click
        cy.wrap($canvas).click({ force: true });
      });

      // Get the {TASK_ID} from the URL
      cy.url().then((url) => {
        const taskId = url.split('/').pop();

        // Retrieve the token from local storage and make the API call
        cy.window().then((win) => {
          const token = win.localStorage.getItem('audino-key');

          // Make the labels API call and store the response in an alias
          cy.request({
            method: 'GET',
            url: `https://api.audino.in/api/labels?job_id=${taskId}&page_size=500&page=1&org=${org_name}`,
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          }).as('labels'); // Store in alias

          cy.wait(1000)
          // Get the start and end times from the XPath
          cy.xpath("//p[@class='truncate text-center text-sm font-bold leading-6 my-2']").invoke('text').then((text) => {
            const times = text.split(' - ');
            const startTime = times[0].split(':').reduce((acc, time) => (60 * acc) + +time);
            const endTime = times[1].split(':').reduce((acc, time) => (60 * acc) + +time);

            // Convert times to the required format
            const points = [0.00, 0.00, endTime, endTime];
            cy.log(points);
            // Access the labels from the alias
            cy.get('@labels').then((response) => {
              const label = response.body.results; // Access the first label or adjust as needed
              expect(response.status).to.eq(200);
              cy.log('Label API call was successful', label.id);

              // Wait for the 2nd API
              cy.wait(2000);
              // Make API call to create annotation
              const payload = {
                shapes: [
                  {
                    attributes: [],
                    frame: 0,
                    label_id: label[1].id,
                    points: points,
                    type: "rectangle",
                    transcript: "gggggaaaaaaaa",
                    gender: "male",
                    locale: "en-US",
                    age: "51",
                    accent: "en-IN",
                    emotion: "happy",
                    color: "#a4fd8080"
                  }
                ],
                tags: [],
                tracks: []
              };

              cy.request({
                method: 'PATCH',
                url: `https://api.audino.in/api/jobs/${taskId}/annotations?org=${org_name}&action=create`,
                headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json'
                },
                body: payload
              }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('API call successful');

                // Interact with the dropdown to select the "completed" option
                cy.get("select[id='state']").select('completed');
              });
            });
          });
        });
      })
        // Wait for a short duration to ensure page transition is complete
        cy.wait(2000);
      });
    });
  });
