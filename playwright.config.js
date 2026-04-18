// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 100000,
  workers: 10,
  expect: {
    timeout: 30000, // default timeout for all expect() assertions
  },
  retries:3,
  
  //  use: 
  //  {                               //use → defines settings for that browser
  //     browserName:"chromium",
  //     trace: 'on-first-retry',
  //     headless: false,          // headless: true,  for jenkins as it run in the background or keep false for UI testing 
  //     screenshot: "only-on-failure"
  //   }
  projects:                                 //projects → defines browsers
  [                          
    {
      name: "chromium",
      use: {                               //use → defines settings for that browser
        browserName:"chromium",
        trace: 'on-first-retry',
        headless: false,          // headless: true,  for jenkins as it run in the background or keep false for UI testing 
        screenshot: "only-on-failure"
           }
    },
    {
      name: "firefox",
      use: {
        browserName:"firefox",
        trace: 'on-first-retry',
        headless: false,
        screenshot: "only-on-failure"
           }
    }
  ]


  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  //   /* Test against branded browsers. */
  //   // {
  //   //   name: 'Microsoft Edge',
  //   //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  //   // },

  //   // {
  //   //   name: 'Google Chrome',
  //   //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  //   // },
  // ],


});