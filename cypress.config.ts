import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {

    env: {
      userName: 'hubsuper',
      password: 'P@ssw0rd',
      invalidUserName: 'Test',
      invalidPassword: 'Test@123'
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    baseUrl: 'https://test.egypt.mylerz.com/login',
    retries: {
      "runMode": 2,
      "openMode": 2
    },

    setupNodeEvents(on, config)
    {
      require('@cypress/grep/src/plugin')(config);
      return config;
      // implement node event listeners here
    },
  },
});
