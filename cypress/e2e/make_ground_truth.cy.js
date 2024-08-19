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
// Assuming annotations are stored as environment variables in cypress.env.json
let annotations = [
  Cypress.env('annotations_1'),
  Cypress.env('annotations_2'),
  Cypress.env('annotations_3'),
  Cypress.env('annotations_4'),
  Cypress.env('annotations_5'),
  Cypress.env('annotations_6'),
  Cypress.env('annotations_7'),
  Cypress.env('annotations_8')
];

describe('make ground truth task for single audio task', () => {
  it('go to task and create ground truth', () => {

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
    cy.wait(4000);

    //make the gt into acceptance
    cy.get(".divide-y.divide-gray-100.mt-2")
    .find("li")
    .contains('Ground Truth')
    .parents('li') // Ensure you're working with the correct <li> element
    .within(() => {
      cy.get("select").eq(1, { timeout: 10000 }).select("acceptance");
    });
  
      cy.wait(3000)
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
          // Click on "Add new job" button
          cy.xpath("//button[normalize-space()='Add new job']").click();

          // Clear the quantity input field and set it to 10
          cy.xpath("//input[@id='quantity']").clear().type('10');
          cy.wait(2000)
          cy.xpath("//button[normalize-space()='Submit']").click();
          cy.wait(2000)
        } else {
          cy.log('Ground truth already exists, skipping creation steps.');
        }
        // Click on the existing Ground Truth item
        cy.get(".divide-y.divide-gray-100.mt-2")
          .find("li")
          .contains('Ground Truth')
          .click();
        cy.wait(5000)
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

            // Get the which Job is in GroundTruth API call and store the response in an alias
            cy.request({
              method: 'GET',
              url: `https://api.audino.in/api/jobs/${taskId}/data/meta?org=${org_name}`,
              headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
              }
            }).as('gTruth'); // Store in alias

            cy.wait(1000)
            // Now handle the points and annotation creation
            cy.xpath("//p[@class='truncate text-center text-sm font-bold leading-6 my-2']", { timeout: 500000 }).invoke('text').then((text) => {
              let textContent;
              cy.wait(5000)
              cy.xpath("//p[@class='truncate text-center text-sm font-bold leading-6 my-2']")
                .invoke('text')
                .then(t => {
                  cy.wait(5000)
                  textContent = t;
                  // You can use textContent here or in other tests
                  cy.log(textContent); // Optional: Log the text to the Cypress console for verification

                  cy.log(text, "text")
                  cy.log(textContent, "textContent")
                  let times = textContent.split('-');
                  cy.log("times", times)
                  let startTime = times[0].split(':').reduce((acc, time) => (60 * acc) + +time);
                  // Parse the audio duration
                  let [minutes, seconds] = times[1].split(':').map(Number);
                  cy.log(seconds, minutes)
                  // Convert minutes and seconds to milliseconds
                  let endTime = (minutes * 60 * 1000) + (seconds * 1000);

                  let points = [0.00, 0.00, endTime, endTime];

                  cy.log(points);

                  // Access the labels from the alias
                  cy.get('@labels').then((response) => {
                    const label = response.body.results; // Access the first label or adjust as needed
                    expect(response.status).to.eq(200);
                    cy.log('Label API call was successful', label.id);

                    // Wait for the 2nd API
                    cy.wait(2000);

                    // Access the gTruth from the alias
                    cy.get('@gTruth').then((response) => {
                      const GTruth = response.body; // Access the first label or adjust as needed
                      expect(response.status).to.eq(200);
                      cy.log('gTruth API call was successful', GTruth.size);

                      const gTruthSize = GTruth.size;
                      const gTruthLastIndex = GTruth.included_frames[gTruthSize - 1] + 1;
                      const annotationNumber = Math.round(gTruthLastIndex / gTruthSize);
                      // Wait for the 2nd API
                      cy.wait(2000);

                      // Ensure annotationNumber is within the range of annotations array
                      const annotationTranscript = annotations[(annotationNumber - 1) % 3];

                      // Make API call to create annotation
                      const payload = {
                        shapes: [
                          {
                            attributes: [],
                            frame: 0,
                            label_id: label[1].id,
                            points: points,
                            type: "rectangle",
                            transcript: annotationTranscript,
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
                        cy.wait(3000)
                      });
                    });
                  });
                });
            });
          });
        })
        // Click on the navigation element to go back
        cy.xpath("//button[normalize-space()='Back']").click();



      })
  });
});

describe('make ground truth task for multiple audio task', () => {
  it('go to task and create ground truth', () => {

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
      cy.wait(4000);
    //make the gt into acceptance
    cy.get(".divide-y.divide-gray-100.mt-2")
    .find("li")
    .contains('Ground Truth')
    .parents('li') // Ensure you're working with the correct <li> element
    .within(() => {
      cy.get("select").eq(1, { timeout: 10000 }).select("acceptance");
    });
  
        cy.wait(3000)
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
            // Click on "Add new job" button
            cy.xpath("//button[normalize-space()='Add new job']").click();

            // Clear the quantity input field and set it to 10
            cy.xpath("//input[@id='quantity']").clear().type('10');
            cy.wait(2000)
            cy.xpath("//button[normalize-space()='Submit']").click();
            cy.wait(2000)
          } else {
            cy.log('Ground truth already exists, skipping creation steps.');
          }
          // Click on the existing Ground Truth item
          cy.get(".divide-y.divide-gray-100.mt-2")
            .find("li")
            .contains('Ground Truth')
            .click();
          cy.wait(5000)
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

              // Get the which Job is in GroundTruth API call and store the response in an alias
              cy.request({
                method: 'GET',
                url: `https://api.audino.in/api/jobs/${taskId}/data/meta?org=${org_name}`,
                headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json'
                }
              }).as('gTruth'); // Store in alias

              cy.wait(1000)
              // Get the start and end times from the XPath
              cy.xpath("//p[@class='truncate text-center text-sm font-bold leading-6 my-2']", { timeout: 500000 }).invoke('text').then((text) => {
                let textContent;
                cy.wait(5000)
                cy.xpath("//p[@class='truncate text-center text-sm font-bold leading-6 my-2']")
                  .invoke('text')
                  .then(t => {
                    cy.wait(5000)
                    textContent = t;
                    // You can use textContent here or in other tests
                    cy.log(textContent); // Optional: Log the text to the Cypress console for verification

                    cy.log(text, "text")
                    cy.log(textContent, "textContent")
                    let times = textContent.split('-');
                    cy.log("times", times)
                    let startTime = times[0].split(':').reduce((acc, time) => (60 * acc) + +time);
                    // Parse the audio duration
                    let [minutes, seconds] = times[1].split(':').map(Number);
                    cy.log(seconds, minutes)
                    // Convert minutes and seconds to milliseconds
                    let endTime = (minutes * 60 * 1000) + (seconds * 1000);

                    let points = [0.00, 0.00, endTime, endTime];

                    cy.log(points);

                    // Access the labels from the alias
                    cy.get('@labels').then((response) => {
                      const label = response.body.results; // Access the first label or adjust as needed
                      expect(response.status).to.eq(200);
                      cy.log('Label API call was successful', label.id);

                      // Wait for the 2nd API
                      cy.wait(2000);

                      // Access the gTruth from the alias
                      cy.get('@gTruth').then((response) => {
                        const GTruth = response.body; // Access the first label or adjust as needed
                        expect(response.status).to.eq(200);
                        cy.log('gTruth API call was successful', GTruth.size);

                        const gTruthSize = GTruth.size;
                        const gTruthLastIndex = GTruth.included_frames[gTruthSize - 1] + 1;
                        const annotationNumber = Math.round(gTruthLastIndex / gTruthSize);
                        // Wait for the 2nd API
                        cy.wait(2000);

                        // Ensure annotationNumber is within the range of annotations array
                        const annotationTranscript = annotations[(annotationNumber - 1) % 3];

                        // Make API call to create annotation
                        const payload = {
                          shapes: [
                            {
                              attributes: [],
                              frame: 0,
                              label_id: label[1].id,
                              points: points,
                              type: "rectangle",
                              transcript: annotationTranscript,
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
                          cy.wait(3000)
                        });
                      });
                    });
                  });
              });
              // Click on the navigation element to go back
              cy.xpath("//button[normalize-space()='Back']").click();

            });
          })
          cy.wait(1000)


          // Click on the navigation to list of tasks
          cy.xpath("//button[normalize-space()='Back']").click();
        })
    }
  });
});
