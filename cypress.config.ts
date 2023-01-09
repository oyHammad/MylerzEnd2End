import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 1366,
    viewportHeight: 768,
    baseUrl: 'https://test.egypt.mylerz.com/login',
    retries: {
      "runMode": 2,
      "openMode": 2
    },
    setupNodeEvents(on, config)
    {
      // implement node event listeners here
    },
  },
});
