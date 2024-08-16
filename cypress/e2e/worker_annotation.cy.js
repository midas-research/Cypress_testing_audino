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
let worker1_password = Cypress.env('worker1_password')
let worker2_password = Cypress.env('worker2_password')
let worker3_password = Cypress.env('worker3_password')
// Assuming annotations are stored as environment variables in cypress.env.json
let annotations_1 = Cypress.env('annotations_1');
let annotations_2 = Cypress.env('annotations_2');
let annotations_3 = Cypress.env('annotations_3');
let annotations_4 = Cypress.env('annotations_4');
let annotations_5 = Cypress.env('annotations_5');
let annotations_6 = Cypress.env('annotations_6');
let annotations_7 = Cypress.env('annotations_7');
let annotations_8 = Cypress.env('annotations_8');

describe('worker 1 annotation', () => {

    it('click on every job and drag wave element', () => {
    // Log in first
     cy.visit('https://app.audino.in/login');
     cy.get('#email').type(worker1_email);
     cy.get('#password').type(worker1_password);
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
      cy.xpath("//a[normalize-space()='Jobs']").click();
  
      // Get the total number of jobs
      cy.xpath("//ul[@class='divide-y divide-gray-100 mt-2']").find("li").its('length').then((length) => {
        // Iterate over each job
        for (let i = 0; i < length; i++) {
          cy.xpath("//ul[@class='divide-y divide-gray-100 mt-2']").find("li").eq(i).click();
          
          // Intercept the audio loading request
          cy.intercept('GET', '**/api/audio/**').as('loadAudio');
          
          // Wait for the wave element to be visible
          cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible');
  
          // Wait for the audio to load
          cy.wait(5000);
  
          // Get the {TASK_ID} from the URL
          cy.url().then((url) => {
            const taskId = url.split('/').pop();
  
            // Retrieve the token from local storage
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
  
              // Now handle the points and annotation creation
              cy.xpath("//p[@class='truncate text-center text-sm font-bold leading-6 my-2']").invoke('text').then((text) => {
                const times = text.split(' - ');
                const startTime = times[0].split(':').reduce((acc, time) => (60 * acc) + +time);
                const endTime = times[1].split(':').reduce((acc, time) => (60 * acc) + +time);
  
                const points = [0.00, 0.00, endTime, endTime];
  
                cy.log(points);
  
                // Access the labels from the alias
                cy.get('@labels').then((response) => {
                  const label = response.body.results; // Access the first label or adjust as needed
                  expect(response.status).to.eq(200);
                  cy.log('Label API call was successful', label.id);
                  
                  // Wait for the 2nd API
                  cy.wait(2000);
                  
                  // Create the annotation with the retrieved label
                  const payload = {
                    shapes: [
                      {
                        attributes: [],
                        frame: 0,
                        label_id: label[1].id,
                        points: points,
                        type: "rectangle",
                        transcript: annotations_1,
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
          });
  
          // Wait before moving to the next item
          cy.wait(2000);
        //back command
        cy.xpath("//div[@class='flex items-center mb-2 hover:cursor-pointer']").click()
        }
      });
    });
  });

  describe('worker 2 annotation', () => {

    it('click on every job and drag wave element', () => {
      // Log in first
     cy.visit('https://app.audino.in/login');
     cy.get('#email').type(worker2_email);
     cy.get('#password').type(worker2_password);
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
      cy.xpath("//a[normalize-space()='Jobs']").click();
  
      // Get the total number of jobs
      cy.xpath("//ul[@class='divide-y divide-gray-100 mt-2']").find("li").its('length').then((length) => {
        // Iterate over each job
        for (let i = 0; i < length; i++) {
          cy.xpath("//ul[@class='divide-y divide-gray-100 mt-2']").find("li").eq(i).click();
          
          // Intercept the audio loading request
          cy.intercept('GET', '**/api/audio/**').as('loadAudio');
          
          // Wait for the wave element to be visible
          cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible');
  
          // Wait for the audio to load
          cy.wait(5000);
  
          // Get the {TASK_ID} from the URL
          cy.url().then((url) => {
            const taskId = url.split('/').pop();
  
            // Retrieve the token from local storage
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
  
              // Now handle the points and annotation creation
              cy.xpath("//p[@class='truncate text-center text-sm font-bold leading-6 my-2']").invoke('text').then((text) => {
                const times = text.split(' - ');
                const startTime = times[0].split(':').reduce((acc, time) => (60 * acc) + +time);
                const endTime = times[1].split(':').reduce((acc, time) => (60 * acc) + +time);
  
                const points = [0.00, 0.00, endTime, endTime];
  
                cy.log(points);
  
                // Access the labels from the alias
                cy.get('@labels').then((response) => {
                  const label = response.body.results; // Access the first label or adjust as needed
                  expect(response.status).to.eq(200);
                  cy.log('Label API call was successful', label.id);
                  
                  // Wait for the 2nd API
                  cy.wait(2000);
                  
                  // Create the annotation with the retrieved label
                  const payload = {
                    shapes: [
                      {
                        attributes: [],
                        frame: 0,
                        label_id: label[1].id,
                        points: points,
                        type: "rectangle",
                        transcript: annotations_2,
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
          });
  
          // Wait before moving to the next item
          cy.wait(2000);
        //back command
        cy.xpath("//div[@class='flex items-center mb-2 hover:cursor-pointer']").click()
        }
      });
    });
  });

  describe('worker 3 annotation', () => {

    it('click on every job and drag wave element', () => {
      // Log in first
     cy.visit('https://app.audino.in/login');
     cy.get('#email').type(worker3_email);
     cy.get('#password').type(worker3_password);
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
      cy.xpath("//a[normalize-space()='Jobs']").click();
  
      // Get the total number of jobs
      cy.xpath("//ul[@class='divide-y divide-gray-100 mt-2']").find("li").its('length').then((length) => {
        // Iterate over each job
        for (let i = 0; i < length; i++) {
          cy.xpath("//ul[@class='divide-y divide-gray-100 mt-2']").find("li").eq(i).click();
          
          // Intercept the audio loading request
          cy.intercept('GET', '**/api/audio/**').as('loadAudio');
          
          // Wait for the wave element to be visible
          cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible');
  
          // Wait for the audio to load
          cy.wait(5000);
  
          // Get the {TASK_ID} from the URL
          cy.url().then((url) => {
            const taskId = url.split('/').pop();
  
            // Retrieve the token from local storage
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
  
              // Now handle the points and annotation creation
              cy.xpath("//p[@class='truncate text-center text-sm font-bold leading-6 my-2']").invoke('text').then((text) => {
                const times = text.split(' - ');
                const startTime = times[0].split(':').reduce((acc, time) => (60 * acc) + +time);
                const endTime = times[1].split(':').reduce((acc, time) => (60 * acc) + +time);
  
                const points = [0.00, 0.00, endTime, endTime];
  
                cy.log(points);
  
                // Access the labels from the alias
                cy.get('@labels').then((response) => {
                  const label = response.body.results; // Access the first label or adjust as needed
                  expect(response.status).to.eq(200);
                  cy.log('Label API call was successful', label.id);
                  
                  // Wait for the 2nd API
                  cy.wait(2000);
                  
                  // Create the annotation with the retrieved label
                  const payload = {
                    shapes: [
                      {
                        attributes: [],
                        frame: 0,
                        label_id: label[1].id,
                        points: points,
                        type: "rectangle",
                        transcript: annotations_3,
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
          });
  
          // Wait before moving to the next item
          cy.wait(2000);
        //back command
        cy.xpath("//div[@class='flex items-center mb-2 hover:cursor-pointer']").click()
        }
      });
    });
  });