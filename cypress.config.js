const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    master_id: "goodchai0",
    master_password: "qudino1234",
    master_email: "amitkewot59@gmail.com",
    master_no: "7002836460",
    org_name: "Testing",
    //worker 1
    worker1_id: "Aman_Singla",
    worker1_password: "Qwerty@1234",
    worker1_email: "amansingla799.as@gmail.com",
    worker1_no: "9876543210",
    //worker 2
    worker2_id: "amans",
    worker2_password: "qwerty@1234",
    worker2_email: "contact@audino.in",
    worker2_no: "1234567890",
    //worker 3
    worker3_id: "goodchai02",
    worker3_password: "qudino1234",
    worker3_email: "aiinfluence284@gmail.com",
    worker3_no: "0987654321",

    //Annotations
    annotations_1: "This is the first annotation, highlighting the importance of clarity.",
    annotations_2: "Second annotation focuses on the need for thorough research.",
    annotations_3: "This annotation emphasizes collaboration and teamwork.",
    annotations_4: "Fourth annotation discusses the significance of time management.",
    annotations_5: "This annotation points out potential challenges and solutions.",
    annotations_6: "Sixth annotation reflects on the value of feedback and improvement.",
    annotations_7: "This annotation suggests innovative approaches to problem-solving.",
    annotations_8: "Eighth annotation underlines the necessity of adaptability in changing environments.",

    //Audio Details of Single Audio Annotation
    file_name: "file1.mp3",
    audio_duration: "28.14",

    //Audio Details of Multiple Audio Annotation
    file_multiple_task1: "file_multiple_task1.mp3",
    audio_duration_file_multiple_task1: "00.00",
    file_multiple_task2: "file_multiple_task2.mp3",
    audio_duration_file_multiple_task2: "00.00",
    file_multiple_task3: "file_multiple_task3.mp3",
    audio_duration_file_multiple_task3: "00.00",
    // file_multiple_task1: "file.mp3",
    // audio_duration_file_multiple_task1: "00.00", 
    // file_multiple_task2: "file2.mp3",
    // audio_duration_file_multiple_task2: "00.00", 
    // file_multiple_task3: "file3.mp3",
    // audio_duration_file_multiple_task3: "00.00", 

    //No of jobs
    no_of_jobs_worker1: 3,
    no_of_jobs_worker2: 3,
    no_of_jobs_worker3: 3,

    //No of annotations
    no_of_annotations: 8,
  },
});
