# Cypress Automation Project

This project automates the testing of a web application using Cypress.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **npm**: npm comes with Node.js, so if you have Node.js installed, you should also have npm.

## Installation

Follow these steps to install the required npm packages for this project:

### Clone the Repository

First, clone the repository to your local machine using Git or download it as a ZIP file and extract it.

### git clone git@github.com:midas-research/Cypress_testing_audino.git

### Navigate into the Project Directory

#### cd your-repository(Folder in which code got cloned)

### Install npm Packages

Run the following command to install all the necessary npm packages:

#### npm install

This command will install all the dependencies listed in the package.json file.

### Running Cypress Tests

Once the npm packages are installed, you can run the Cypress tests using the following commands:

Open Cypress Test Runner
To open the Cypress Test Runner, use the command:

#### npx cypress open

This will open the Cypress Test Runner interface, where you can select and run individual test files.

### Run a Specific Test

If you want to run a specific test file, you can specify it with the following command:

#### npx cypress run --spec "cypress/e2e/your-test-file.cy.js"

Replace your-test-file.cy.js with the path to the test file you want to run.

### Configuration

If you need to set up environment variables, you can do so in a ##### cypress.env.json ##### file in the root of your project:

json

{
"master_id": "your_master_id",

"master_password": "your_master_password",

"annotations_1": "your_annotations_1",

"annotations_2": "your_annotations_2"

// Add other environment variables as needed

}

Make sure to update this file with your actual environment variable values.

### Project Structure

#### Here's a brief overview of the project structure:

##### cypress/: Contains the Cypress tests and configuration files.

##### e2e/: Contains the end-to-end test files.

##### fixtures/: Holds any test data files.

##### support/: Contains support files, such as commands or custom helpers.

##### node_modules/: Contains the npm packages installed for the project.

##### cypress.config.js: Cypress configuration file.

##### package.json: Contains the project dependencies and scripts.

##### package-lock.json: Automatically generated file that locks the versions of dependencies.

### Troubleshooting

If you encounter any issues during installation or while running tests, try the following:

#### Clear npm Cache:

##### npm cache clean --force

#### Delete Node Modules and Reinstall:

##### rm -rf node_modules

##### npm install