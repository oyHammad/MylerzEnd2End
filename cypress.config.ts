import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 1366,
    viewportHeight: 768,
    baseUrl: 'https://test.egypt.mylerz.com/login',

    setupNodeEvents(on, config)
    {
      // implement node event listeners here
    },
  },
});
