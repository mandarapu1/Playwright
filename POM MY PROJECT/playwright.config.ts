import { defineConfig, devices, PlaywrightTestConfig} from '@playwright/test';
// import { report } from 'process';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
const { Reporter } = require('playwright');
const config: PlaywrightTestConfig = {
  testDir: './tests',
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    actionTimeout: 60 * 1000,
    trace: 'on',
    screenshot: 'on',
    video: 'on'
  },
  reporter: [
    ['dot'], // Simple dot-based reporter
    ['html', { open: 'always' }], // HTML report that opens automatically after tests finish
    ['json', { outputFile: 'playwright-report.json' }], // Outputs JSON report to a file
    ['junit', { outputFile: 'test-results.xml' }] // JUnit format for CI
  ],
  timeout: 9000 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 50000
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        deviceScaleFactor : undefined,
        viewport: null,
        headless: false,
       launchOptions : {
        args : ["--start-maximized"]
       }
       },
      //  reporter: [ ['line']]
       
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
      
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

  ]
};
export default config;