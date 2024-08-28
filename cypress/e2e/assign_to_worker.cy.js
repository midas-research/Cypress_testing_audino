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

describe('Assign to worker for multiple audio annotations', () => {
  it('Go to task and create ground truth', () => {

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

    // Check if the organization list contains the organization and click it
    cy.get("ul.divide-y.divide-gray-100")
      .find("li")
      .contains(org_name)
      .should('exist')
      .click();

    // Navigate to the Tasks page
    cy.xpath("//a[normalize-space()='Tasks']").click();

    // Get the number of tasks (li elements)
    cy.get("ul").find("li").then($tasks => {
      const taskCount = $tasks.length;

      // Loop through each task and perform actions
      for (let i = 0; i < taskCount; i++) {
        // Click on the specific element within the current li
        cy.get("ul").find("li").eq(i).within(() => {
          cy.xpath(`//div[contains(@class,'min-h-screen bg-gray-100')]//div[contains(@class,'rounded-lg bg-white')]//ul[contains(@class,'divide-y divide-gray-100 mt-2')]/li[${i+1}]/div[1]`).click();
        });
        cy.wait(4000);

        // Count the number of <li> elements
        cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
        .then($lis => {
          const totalItems = $lis.length;

          // Update each item one by one with a 2-second wait between updates
          cy.wrap($lis.eq(0)).within(() => {
            cy.wait(2000);
            cy.get("select").eq(0).select(worker1_id);
          });
        });
        cy.wait(2000);
        cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
        .then($lis => {
          const totalItems = $lis.length;
          cy.wait(2000).then(() => {
            if (totalItems > 1) {
              cy.wrap($lis.eq(1)).within(() => {
                cy.wait(2000);
                cy.get("select").eq(0).select(worker2_id);
              });
            }
          });
        });
        cy.wait(2000);
        cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
        .then($lis => {
          const totalItems = $lis.length;
          cy.wait(2000).then(() => {
            if (totalItems > 2) {
              cy.wrap($lis.eq(2)).within(() => {
                cy.wait(2000);
                cy.get("select").eq(0).select(worker3_id);
              });
            }
          });
        });
        cy.wait(2000);
        cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
        .then($lis => {
          const totalItems = $lis.length;
          // Repeat for remaining items if necessary
          cy.wait(2000).then(() => {
            if (totalItems > 3) {
              cy.wrap($lis.eq(3)).within(() => {
                cy.wait(2000);
                cy.get("select").eq(0).select(worker1_id);
              });
            }
          });
        });
        cy.wait(2000);
        cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
        .then($lis => {
          const totalItems = $lis.length;
          // Repeat for remaining items if necessary
          cy.wait(2000).then(() => {
            if (totalItems > 4) {
              cy.wrap($lis.eq(4)).within(() => {
                cy.wait(2000);
                cy.get("select").eq(0).select(worker2_id);
              });
            }
          });

        });
        cy.wait(2000);
        cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
        .then($lis => {
          const totalItems = $lis.length;
          // Repeat for remaining items if necessary
          cy.wait(2000).then(() => {
            if (totalItems > 5) {
              cy.wrap($lis.eq(5)).within(() => {
                cy.wait(2000);
                cy.get("select").eq(0).select(worker3_id);
              });
            }
          });
        });
        cy.wait(2000);
        cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
        .then($lis => {
          const totalItems = $lis.length;
          // Repeat for remaining items if necessary
          cy.wait(2000).then(() => {
            if (totalItems > 6) {
              cy.wrap($lis.eq(6)).within(() => {
                cy.wait(2000);
                cy.get("select").eq(0).select(worker1_id);
              });
            }
          });
        });
        cy.wait(2000);
        cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
        .then($lis => {
          const totalItems = $lis.length;
          // Repeat for remaining items if necessary
          cy.wait(2000).then(() => {
            if (totalItems > 7) {
              cy.wrap($lis.eq(7)).within(() => {
                cy.wait(2000);
                cy.get("select").eq(0).select(worker2_id);
              });
            }
          });
          // Add more blocks as needed for the remaining items
        });

      cy.wait(2000);
      cy.xpath("//button[normalize-space()='Back']").click();

      }
    });

    // Check if the element with the specified XPath is present

    function processTasks() {
      // Use cy.document() to avoid Cypress's automatic retry behavior
      cy.document().then((doc) => {
        const element = doc.querySelector("a.relative.inline-flex.items-center.rounded-r-md.px-2.py-2.text-gray-400.ring-1.ring-inset.ring-gray-300.hover\\:bg-gray-50.focus\\:z-20.focus\\:outline-offset-0.active");

        if (element) {
          // Element exists, proceed with processing
          cy.wrap(element).click();
          cy.wait(2000);

          // Process each task
          cy.get("ul").find("li").then($tasks => {
            const taskCount = $tasks.length;

            for (let i = 0; i < taskCount; i++) {
              cy.get("ul").find("li").eq(i).within(() => {
                cy.xpath(`//div[contains(@class,'min-h-screen bg-gray-100')]//div[contains(@class,'rounded-lg bg-white')]//ul[contains(@class,'divide-y divide-gray-100 mt-2')]/li[${i + 1}]/div[1]`).click();
              });
              cy.wait(4000);

                    // Count the number of <li> elements
                    cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
                    .then($lis => {
                      const totalItems = $lis.length;

                      // Update each item one by one with a 2-second wait between updates
                      cy.wrap($lis.eq(0)).within(() => {
                        cy.wait(2000);
                        cy.get("select").eq(0).select(worker1_id);
                      });
                    });
                    cy.wait(2000);
                    cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
                    .then($lis => {
                      const totalItems = $lis.length;
                      cy.wait(2000).then(() => {
                        if (totalItems > 1) {
                          cy.wrap($lis.eq(1)).within(() => {
                            cy.wait(2000);
                            cy.get("select").eq(0).select(worker2_id);
                          });
                        }
                      });
                    });
                    cy.wait(2000);
                    cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
                    .then($lis => {
                      const totalItems = $lis.length;
                      cy.wait(2000).then(() => {
                        if (totalItems > 2) {
                          cy.wrap($lis.eq(2)).within(() => {
                            cy.wait(2000);
                            cy.get("select").eq(0).select(worker3_id);
                          });
                        }
                      });
                    });
                    cy.wait(2000);
                    cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
                    .then($lis => {
                      const totalItems = $lis.length;
                      // Repeat for remaining items if necessary
                      cy.wait(2000).then(() => {
                        if (totalItems > 3) {
                          cy.wrap($lis.eq(3)).within(() => {
                            cy.wait(2000);
                            cy.get("select").eq(0).select(worker1_id);
                          });
                        }
                      });
                    });
                    cy.wait(2000);
                    cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
                    .then($lis => {
                      const totalItems = $lis.length;
                      // Repeat for remaining items if necessary
                      cy.wait(2000).then(() => {
                        if (totalItems > 4) {
                          cy.wrap($lis.eq(4)).within(() => {
                            cy.wait(2000);
                            cy.get("select").eq(0).select(worker2_id);
                          });
                        }
                      });

                    });
                    cy.wait(2000);
                    cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
                    .then($lis => {
                      const totalItems = $lis.length;
                      // Repeat for remaining items if necessary
                      cy.wait(2000).then(() => {
                        if (totalItems > 5) {
                          cy.wrap($lis.eq(5)).within(() => {
                            cy.wait(2000);
                            cy.get("select").eq(0).select(worker3_id);
                          });
                        }
                      });
                    });
                    cy.wait(2000);
                    cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
                    .then($lis => {
                      const totalItems = $lis.length;
                      // Repeat for remaining items if necessary
                      cy.wait(2000).then(() => {
                        if (totalItems > 6) {
                          cy.wrap($lis.eq(6)).within(() => {
                            cy.wait(2000);
                            cy.get("select").eq(0).select(worker1_id);
                          });
                        }
                      });
                    });
                    cy.wait(2000);
                    cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
                    .then($lis => {
                      const totalItems = $lis.length;
                      // Repeat for remaining items if necessary
                      cy.wait(2000).then(() => {
                        if (totalItems > 7) {
                          cy.wrap($lis.eq(7)).within(() => {
                            cy.wait(2000);
                            cy.get("select").eq(0).select(worker2_id);
                          });
                        }
                      });
                      // Add more blocks as needed for the remaining items
                    });

                  cy.wait(2000);
                  cy.xpath("//button[normalize-space()='Back']").click();
            }
          });

        } else {
          // Element not found, skip further processing
          cy.log("Element not found, ending task processing.");
        }
      });
    }

    for (let i = 0; i < 3; i++) {
      // Start the process
      processTasks();
    }

  });
});







// --------------------------------
// Code for small number of tasks
// --------------------------------


//   it('go to task and create ground truth', () => {

//      // Log in first
//      cy.visit('https://app.audino.in/login');
//      cy.get('#email').type(master_id);
//      cy.get('#password').type(master_password);
//      cy.get("button[type='submit']").click();

//     // Click on the specific div to open the menu
//     cy.get("div[class='flex items-center px-4']").click();

//     // Click on the menu item to go to the organizations page
//     cy.get("a[id='headlessui-menu-item-:r6:']").click();

//     // Verify the text on the organizations page
//     cy.get('.text-3xl.font-bold.tracking-tight.text-white').should('have.text', 'Organizations');

//     // Check if the organization list contains the organization
//     cy.get("ul.divide-y.divide-gray-100")
//       .find("li")
//       .contains(org_name)
//       .should('exist')
//       .click();

//     // Navigate to the Tasks page again
//     cy.xpath("//a[normalize-space()='Tasks']").click();

//     // Check if the task list contains the "cypress task" and click on it
//     cy.get("ul").find("li").contains('cypress task').should('exist').click();
//     cy.wait(4000);

//       // Count the number of <li> elements
//       cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//       .then($lis => {
//         const totalItems = $lis.length;

//         // Update each item one by one with a 2-second wait between updates
//         cy.wrap($lis.eq(0)).within(() => {
//           cy.wait(2000);
//           cy.get("select").eq(0).select(worker1_id);
//         });
//       });
//       cy.wait(2000);
//       cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//       .then($lis => {
//         const totalItems = $lis.length;
//         cy.wait(2000).then(() => {
//           if (totalItems > 1) {
//             cy.wrap($lis.eq(1)).within(() => {
//               cy.wait(2000);
//               cy.get("select").eq(0).select(worker2_id);
//             });
//           }
//         });
//       });
//       cy.wait(2000);
//       cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//       .then($lis => {
//         const totalItems = $lis.length;
//         cy.wait(2000).then(() => {
//           if (totalItems > 2) {
//             cy.wrap($lis.eq(2)).within(() => {
//               cy.wait(2000);
//               cy.get("select").eq(0).select(worker3_id);
//             });
//           }
//         });
//       });
//       cy.wait(2000);
//       cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//       .then($lis => {
//         const totalItems = $lis.length;
//         // Repeat for remaining items if necessary
//         cy.wait(2000).then(() => {
//           if (totalItems > 3) {
//             cy.wrap($lis.eq(3)).within(() => {
//               cy.wait(2000);
//               cy.get("select").eq(0).select(worker1_id);
//             });
//           }
//         });
//       });
//       cy.wait(2000);
//       cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//       .then($lis => {
//         const totalItems = $lis.length;
//         // Repeat for remaining items if necessary
//         cy.wait(2000).then(() => {
//           if (totalItems > 4) {
//             cy.wrap($lis.eq(4)).within(() => {
//               cy.wait(2000);
//               cy.get("select").eq(0).select(worker2_id);
//             });
//           }
//         });

//       });
//       cy.wait(2000);
//       cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//       .then($lis => {
//         const totalItems = $lis.length;
//         // Repeat for remaining items if necessary
//         cy.wait(2000).then(() => {
//           if (totalItems > 5) {
//             cy.wrap($lis.eq(5)).within(() => {
//               cy.wait(2000);
//               cy.get("select").eq(0).select(worker3_id);
//             });
//           }
//         });
//       });
//       cy.wait(2000);
//       cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//       .then($lis => {
//         const totalItems = $lis.length;
//         // Repeat for remaining items if necessary
//         cy.wait(2000).then(() => {
//           if (totalItems > 6) {
//             cy.wrap($lis.eq(6)).within(() => {
//               cy.wait(2000);
//               cy.get("select").eq(0).select(worker1_id);
//             });
//           }
//         });
//       });
//       cy.wait(2000);
//       cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//       .then($lis => {
//         const totalItems = $lis.length;
//         // Repeat for remaining items if necessary
//         cy.wait(2000).then(() => {
//           if (totalItems > 7) {
//             cy.wrap($lis.eq(7)).within(() => {
//               cy.wait(2000);
//               cy.get("select").eq(0).select(worker2_id);
//             });
//           }
//         });
//         // Add more blocks as needed for the remaining items
//       });
//       cy.wait(2000);

//     // Click on the navigation element to go back (uncomment if needed)
//     // cy.xpath("//button[normalize-space()='Back']").click();
//   });
// });

// describe('assign to worker for multiple audio annotation', () => {
//   it('go to task and create ground truth', () => {

//      // Log in first
//      cy.visit('https://app.audino.in/login');
//      cy.get('#email').type(master_id);
//      cy.get('#password').type(master_password);
//      cy.get("button[type='submit']").click();

//     // Click on the specific div to open the menu
//     cy.get("div[class='flex items-center px-4']").click();

//     // Click on the menu item to go to the organizations page
//     cy.get("a[id='headlessui-menu-item-:r6:']").click();

//     // Verify the text on the organizations page
//     cy.get('.text-3xl.font-bold.tracking-tight.text-white').should('have.text', 'Organizations');

//     // Check if the organization list contains the organization
//     cy.get("ul.divide-y.divide-gray-100")
//       .find("li")
//       .contains(org_name)
//       .should('exist')
//       .click();

//     // Navigate to the Tasks page again
//     cy.xpath("//a[normalize-space()='Tasks']").click();
//     let array_of_audios=[file_multiple_task1,file_multiple_task2,file_multiple_task3];
//     for(let i=0;i<array_of_audios.length;i++){

//         // Check if the task list contains the "cypress task" and click on it
//         cy.get("ul").find("li").contains(array_of_audios[i]).should('exist').click();
//         cy.wait(4000);

//           // Count the number of <li> elements
//           cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//           .then($lis => {
//             const totalItems = $lis.length;

//             // Update each item one by one with a 2-second wait between updates
//             cy.wrap($lis.eq(0)).within(() => {
//               cy.wait(2000);
//               cy.get("select").eq(0).select(worker1_id);
//             });
//           });
//           cy.wait(2000);
//           cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//           .then($lis => {
//             const totalItems = $lis.length;
//             cy.wait(2000).then(() => {
//               if (totalItems > 1) {
//                 cy.wrap($lis.eq(1)).within(() => {
//                   cy.wait(2000);
//                   cy.get("select").eq(0).select(worker2_id);
//                 });
//               }
//             });
//           });
//           cy.wait(2000);
//           cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//           .then($lis => {
//             const totalItems = $lis.length;
//             cy.wait(2000).then(() => {
//               if (totalItems > 2) {
//                 cy.wrap($lis.eq(2)).within(() => {
//                   cy.wait(2000);
//                   cy.get("select").eq(0).select(worker3_id);
//                 });
//               }
//             });
//           });
//           cy.wait(2000);
//           cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//           .then($lis => {
//             const totalItems = $lis.length;
//             // Repeat for remaining items if necessary
//             cy.wait(2000).then(() => {
//               if (totalItems > 3) {
//                 cy.wrap($lis.eq(3)).within(() => {
//                   cy.wait(2000);
//                   cy.get("select").eq(0).select(worker1_id);
//                 });
//               }
//             });
//           });
//           cy.wait(2000);
//           cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//           .then($lis => {
//             const totalItems = $lis.length;
//             // Repeat for remaining items if necessary
//             cy.wait(2000).then(() => {
//               if (totalItems > 4) {
//                 cy.wrap($lis.eq(4)).within(() => {
//                   cy.wait(2000);
//                   cy.get("select").eq(0).select(worker2_id);
//                 });
//               }
//             });

//           });
//           cy.wait(2000);
//           cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//           .then($lis => {
//             const totalItems = $lis.length;
//             // Repeat for remaining items if necessary
//             cy.wait(2000).then(() => {
//               if (totalItems > 5) {
//                 cy.wrap($lis.eq(5)).within(() => {
//                   cy.wait(2000);
//                   cy.get("select").eq(0).select(worker3_id);
//                 });
//               }
//             });
//           });
//           cy.wait(2000);
//           cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//           .then($lis => {
//             const totalItems = $lis.length;
//             // Repeat for remaining items if necessary
//             cy.wait(2000).then(() => {
//               if (totalItems > 6) {
//                 cy.wrap($lis.eq(6)).within(() => {
//                   cy.wait(2000);
//                   cy.get("select").eq(0).select(worker1_id);
//                 });
//               }
//             });
//           });
//           cy.wait(2000);
//           cy.xpath("//ul[contains(@class,'divide-y divide-gray-100 mt-2')]//li")
//           .then($lis => {
//             const totalItems = $lis.length;
//             // Repeat for remaining items if necessary
//             cy.wait(2000).then(() => {
//               if (totalItems > 7) {
//                 cy.wrap($lis.eq(7)).within(() => {
//                   cy.wait(2000);
//                   cy.get("select").eq(0).select(worker2_id);
//                 });
//               }
//             });
//             // Add more blocks as needed for the remaining items
//           });
//           cy.wait(2000);

//         // Click on the navigation element to go back (uncomment if needed)
//         cy.xpath("//button[normalize-space()='Back']").click();
//       }
//     });
// });
