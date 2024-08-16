
describe('click on every job', () => {

  it('click on every job and drag wave element', () => {

    // Log in first
    cy.visit('https://app.audino.in/login');
    cy.get('#email').type('goodchai0');
    cy.get('#password').type('qudino1234');
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
      .contains('cypress')
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
        cy.wait(5000)
      cy.wrap($el).click();

      //  // Wait for the wave element to be present
      //  cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible')
      //  .then(($wave) => {
      //    cy.wait(2000);
      //    const waveBounds = $wave[0].getBoundingClientRect();

      //    cy.wrap($wave)
      //      .trigger('mousedown', { which: 1, clientX: waveBounds.left, clientY: waveBounds.top, force: true })
      //      .trigger('mousemove', { which: 1, clientX: waveBounds.right, clientY: waveBounds.top, force: true })
      //      .trigger('mouseup', { force: true });
      //  });


    //   // Wait for the wave element to be present
    //   cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible')
    //   .then(($wave) => {
    //     cy.wait(20000);
    //     const waveBounds = $wave[0].getBoundingClientRect();
    //     console.log(waveBounds)

    //     cy.wrap($wave)
    //       .trigger('mousedown', { which: 1, clientX: waveBounds.left+5, clientY: waveBounds.top, force: true })
    //       .trigger('mousemove', { which: 1, clientX: waveBounds.right-5, clientY: waveBounds.top, force: true })
    //       .trigger('mouseup', { force: true });
    //   });

// Ensure the waveform is visible
 // Ensure the waveform is visible
 cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible');

 // Wait for the waveform to fully load
 cy.wait(5000);

 // Get the canvas element inside the waveform and its bounding rectangle
 cy.get("div[id='waveform'] > wave > wave > canvas").then(($canvas) => {
   const canvasBounds = $canvas[0].getBoundingClientRect();
   cy.wait(5000);
   console.log('Canvas Bounds:', canvasBounds);

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
   cy.get('.hover A bg-audino-primary-dark').click();
 });
      // Wait for a short duration to ensure page transition is complete

      // Navigate back to the tasks page
      // cy.xpath("//button[normalize-space()='Back']").click();

      // Wait for a short duration to ensure page transition is complete
      cy.wait(2000);
    });
  });
});










// describe('worker 1 annotation', () => {

//     it('click on every job and drag wave element', () => {
//       // Log in first
//       cy.visit('https://app.audino.in/login');
//       cy.get('#email').type('amansingla799.as@gmail.com');
//       cy.get('#password').type('Qwerty@1234');
//       cy.get("button[type='submit']").click();
  
//       // Click on the specific div to open the menu
//       cy.get("div[class='flex items-center px-4']").click();
  
//       // Click on the menu item to go to the organizations page
//       cy.get("a[id='headlessui-menu-item-:r6:']").click();
  
//       // Verify the text on the organizations page
//       cy.get('.text-3xl.font-bold.tracking-tight.text-white').should('have.text', 'Organizations');
  
//       // Check if the organization list contains the organization
//       cy.get("ul.divide-y.divide-gray-100")
//         .find("li")
//         .contains('cypress')
//         .should('exist')
//         .click();
  
//       // Navigate to the Tasks page again
//       cy.xpath("//a[normalize-space()='Jobs']").click();
  
//       // Get the list of jobs and click on each one
//       cy.xpath("//ul[@class='divide-y divide-gray-100 mt-2']").find("li").each(($el, index, $list) => {
//         cy.intercept('GET', '**/api/audio/**').as('loadAudio');
//         cy.wait(5000);
//         cy.wrap($el).click();
  
//         cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible');
  
//         cy.wait(5000);
  
//         // Get the {TASK_ID} from the URL
//         cy.url().then((url) => {
//           const taskId = url.split('/').pop();
  
//           // Retrieve the token from local storage
//           cy.window().then((win) => {
//             const token = win.localStorage.getItem('audino-key');
  
//             // Make the labels API call and store the response in an alias
//             cy.request({
//               method: 'GET',
//               url: `https://api.audino.in/api/labels?job_id=${taskId}&page_size=500&page=1&org=cypress0`,
//               headers: {
//                 'Authorization': `Token ${token}`,
//                 'Content-Type': 'application/json'
//               }
//             }).as('labels'); // Store in alias
  
//             // Now handle the points and annotation creation
//             cy.xpath("//p[@class='truncate text-center text-sm font-bold leading-6 my-2']").invoke('text').then((text) => {
//               const times = text.split(' - ');
//               const startTime = times[0].split(':').reduce((acc, time) => (60 * acc) + +time);
//               const endTime = times[1].split(':').reduce((acc, time) => (60 * acc) + +time);
  
//               const points = [0.00, 0.00, endTime, endTime];
  
//               cy.log(points);
  
//               // Access the labels from the alias
//               cy.get('@labels').then((response) => {
//                 const label = response.body.results; // Access the first label or adjust as needed
//                 expect(response.status).to.eq(200);
//                 cy.log('Label API call was successful', label.id);
  
//                 // Create the annotation with the retrieved label
//                 const payload = {
//                   shapes: [
//                     {
//                       attributes: [],
//                       frame: 0,
//                       label_id: label[1].id,
//                       points: points,
//                       type: "rectangle",
//                       transcript: "gggggaaaaaaaa",
//                       gender: "male",
//                       locale: "en-US",
//                       age: "51",
//                       accent: "en-IN",
//                       emotion: "happy",
//                       color: "#a4fd8080"
//                     }
//                   ],
//                   tags: [],
//                   tracks: []
//                 };
  
//                 cy.request({
//                   method: 'PATCH',
//                   url: `https://api.audino.in/api/jobs/${taskId}/annotations?org=cypress0&action=create`,
//                   headers: {
//                     'Authorization': `Token ${token}`,
//                     'Content-Type': 'application/json'
//                   },
//                   body: payload
//                 }).then((response) => {
//                   expect(response.status).to.eq(200);
//                   cy.log('API call successful');
  
//                   // Interact with the dropdown to select the "completed" option
//                   cy.get("select[id='state']").select('completed');
//                 });
//               });
//             });
//           });
//         });
  
//         cy.wait(2000);
//       });
//     });
//   });
  
//   describe('worker 2 annotation', () => {

//     it('click on every job and drag wave element', () => {
//       // Log in first
//       cy.visit('https://app.audino.in/login');
//       cy.get('#email').type('contact@audino.in');
//       cy.get('#password').type('Qwerty@1234');
//       cy.get("button[type='submit']").click();
  
//       // Click on the specific div to open the menu
//       cy.get("div[class='flex items-center px-4']").click();
  
//       // Click on the menu item to go to the organizations page
//       cy.get("a[id='headlessui-menu-item-:r6:']").click();
  
//       // Verify the text on the organizations page
//       cy.get('.text-3xl.font-bold.tracking-tight.text-white').should('have.text', 'Organizations');
  
//       // Check if the organization list contains the organization
//       cy.get("ul.divide-y.divide-gray-100")
//         .find("li")
//         .contains('cypress')
//         .should('exist')
//         .click();
  
//       // Navigate to the Tasks page again
//       cy.xpath("//a[normalize-space()='Jobs']").click();
  
//       // Get the list of jobs and click on each one
//       cy.xpath("//ul[@class='divide-y divide-gray-100 mt-2']").find("li").each(($el, index, $list) => {
//         cy.intercept('GET', '**/api/audio/**').as('loadAudio');
//         cy.wait(5000);
//         cy.wrap($el).click();
  
//         cy.get("body > div:nth-child(3) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > wave:nth-child(1)", { timeout: 500000 }).should('be.visible');
  
//         cy.wait(5000);
  
//         // Get the {TASK_ID} from the URL
//         cy.url().then((url) => {
//           const taskId = url.split('/').pop();
  
//           // Retrieve the token from local storage
//           cy.window().then((win) => {
//             const token = win.localStorage.getItem('audino-key');
  
//             // Make the labels API call and store the response in an alias
//             cy.request({
//               method: 'GET',
//               url: `https://api.audino.in/api/labels?job_id=${taskId}&page_size=500&page=1&org=cypress0`,
//               headers: {
//                 'Authorization': `Token ${token}`,
//                 'Content-Type': 'application/json'
//               }
//             }).as('labels'); // Store in alias
  
//             // Now handle the points and annotation creation
//             cy.xpath("//p[@class='truncate text-center text-sm font-bold leading-6 my-2']").invoke('text').then((text) => {
//               const times = text.split(' - ');
//               const startTime = times[0].split(':').reduce((acc, time) => (60 * acc) + +time);
//               const endTime = times[1].split(':').reduce((acc, time) => (60 * acc) + +time);
  
//               const points = [0.00, 0.00, endTime, endTime];
  
//               cy.log(points);
  
//               // Access the labels from the alias
//               cy.get('@labels').then((response) => {
//                 const label = response.body.results; // Access the first label or adjust as needed
//                 expect(response.status).to.eq(200);
//                 cy.log('Label API call was successful', label.id);
                
//                 //wait for 2nd api
//                 cy.wait(2000);
//                 // Create the annotation with the retrieved label
//                 const payload = {
//                   shapes: [
//                     {
//                       attributes: [],
//                       frame: 0,
//                       label_id: label[1].id,
//                       points: points,
//                       type: "rectangle",
//                       transcript: "gggggaaaaaaaa",
//                       gender: "male",
//                       locale: "en-US",
//                       age: "51",
//                       accent: "en-IN",
//                       emotion: "happy",
//                       color: "#a4fd8080"
//                     }
//                   ],
//                   tags: [],
//                   tracks: []
//                 };
  
//                 cy.request({
//                   method: 'PATCH',
//                   url: `https://api.audino.in/api/jobs/${taskId}/annotations?org=cypress0&action=create`,
//                   headers: {
//                     'Authorization': `Token ${token}`,
//                     'Content-Type': 'application/json'
//                   },
//                   body: payload
//                 }).then((response) => {
//                   expect(response.status).to.eq(200);
//                   cy.log('API call successful');
  
//                   // Interact with the dropdown to select the "completed" option
//                   cy.get("select[id='state']").select('completed');
//                 });
//               });
//             });
//           });
//         });
  
//         cy.wait(2000);
//         cy.xpath("").click()
//     });
//     });
//   });
  
