const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://webdriveruniversity.com',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      pageLoadTimeout: 8000,
      defaultCommandTimeout: 10000
  },

});
