import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "e81fnc",
  e2e: {

    env: {
      userName: 'hubsuper',
      password: 'P@ssw0rd',
      invalidUserName: 'Test',
      invalidPassword: 'Test@123',
      userPassword: 'Ot@123456',
      userConfirmPassword: 'Ot@123456'
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

      // const version = config.env.version || 'StagingTunisia';
      // // load env from json
      // config.env = require(`./cypress/config/${version}.json`);
      // // change baseUrl
      // config.baseUrl = config.env.baseUrl;

      require('@cypress/grep/src/plugin')(config);
      return config;
      // implement node event listeners here
    },
    watchForFileChanges: true
  },
});
