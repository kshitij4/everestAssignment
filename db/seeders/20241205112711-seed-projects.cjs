'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const projects = [
      {
        "name": "E-commerce Platform Modernization",
        "description": "Led the migration of a legacy PHP e-commerce site to a MERN stack, improving performance by 40% and enhancing user experience.",
        "technologies": "MongoDB, Express.js, React, Node.js, Redis, Docker",
        "image_url": "https://via.placeholder.com/150/0000FF/FFFFFF?text=E-commerce"
      },
      {
        "name": "Real-time Analytics Dashboard",
        "description": "Developed a dashboard using Python (Flask) and Vue.js with WebSocket integration for real-time data visualization from IoT sensors.",
        "technologies": "Python, Flask, Vue.js, PostgreSQL, WebSocket, MQTT",
        "image_url": "https://via.placeholder.com/150/008000/FFFFFF?text=Analytics"
      },
      {
        "name": "CMS Plugin for API Integration",
        "description": "Created a custom WordPress plugin to synchronize user data between the CMS and an external CRM via REST APIs.",
        "technologies": "PHP, WordPress, MySQL, REST APIs, JavaScript",
        "image_url": "https://via.placeholder.com/150/FF0000/FFFFFF?text=CMS+Plugin"
      },
      {
        "name": "Cloud Deployment Automation",
        "description": "Implemented CI/CD pipelines using Azure DevOps to automate the testing and deployment of multiple web applications to Azure App Service.",
        "technologies": "Azure DevOps, CI/CD, Azure App Service, Docker, Terraform",
        "image_url": "https://via.placeholder.com/150/FFA500/FFFFFF?text=DevOps"
      }
    ]

    await queryInterface.bulkInsert(
      'projects',
      projects,
      { returning: true }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  },
};