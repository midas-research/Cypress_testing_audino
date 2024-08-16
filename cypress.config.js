const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    master_id: "goodchai0",
    master_password:"qudino1234",
    master_email:"amitkewot59@gmail.com",
    master_no:"7002836460",
    org_name:"cypress3",
    //worker 1
    worker1_id:"Aman_Singla",
    worker1_password:"Qwerty@1234",
    worker1_email:"amansingla799.as@gmail.com",
    worker1_no:"9876543210",
    //worker 2
    worker2_id:"amans",
    worker2_password:"Qwerty@1234",
    worker2_email:"contact@audino.in",
    worker2_no:"1234567890",
    //worker 3
    worker3_id:"goodchai02",
    worker3_password:"qudino1234",
    worker3_email:"aiinfluence284@gmail.com",
    worker3_no:"0987654321",

    //Annotations
    annotations_1: "This is the first annotation, highlighting the importance of clarity.",
    annotations_2: "Second annotation focuses on the need for thorough research.",
    annotations_3: "This annotation emphasizes collaboration and teamwork.",
    annotations_4: "Fourth annotation discusses the significance of time management.",
    annotations_5: "This annotation points out potential challenges and solutions.",
    annotations_6: "Sixth annotation reflects on the value of feedback and improvement.",
    annotations_7: "This annotation suggests innovative approaches to problem-solving.",
    annotations_8: "Eighth annotation underlines the necessity of adaptability in changing environments."
}
});
