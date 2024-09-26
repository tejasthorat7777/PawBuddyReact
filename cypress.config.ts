import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // You can implement event listeners here, like before:run or after:run if needed
    },
    reporter: "mochawesome", // Use mochawesome as the reporter
    reporterOptions: {
      reportDir: "cypress/reports", // Directory to save reports
      overwrite: false,
      html: true,
      json: true,
      charts: true,
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
    },
  },
});
