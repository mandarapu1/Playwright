import { expect, test, beforeAll, afterAll, chromium } from '@playwright/test';
import { AppNavigator } from '../pageobjects/AppNavigator';
import { LoginPage } from '../pageobjects/LoginPage';
import { Welcome_SearchPage } from '../pageobjects/Welcome_SearchPage';
import dotenv from 'dotenv';
import path from 'path';
import { GeneralPersonIdentifyPage } from '../pageobjects/GeneralPersonIdentifyPage';
import { TIMEOUT } from 'dns';
const jsonData = require('../Data/data.json');

const sleep = (t)=>{
  return new Promise<void>((res)=>{
    setTimeout(()=>{
      res();
    },t)
  })
}
dotenv.config({ path: path.resolve(__dirname, '..', '.env' )});

const baseURL = process.env.baseURL as string;
const username = process.env.USER_NAME as string;
const password = process.env.PASSWORD as string;  

let page: any;
let context: any;
let newPage : any;

beforeAll(async ({browser}) => {
  // Set up the browser instance before tests
  
  context = await browser.newContext();
  page = await context.newPage();

  await page.goto('http://d002.profsvcs.ellucian.com/');

  [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('//a[text()="App Navigator"]') // Opens a new tab
  ])
  
  // await newPage.waitForTimeout(500);
  // console.log(await newPage.title()); - why this is not working, why context lost ?. even with 500 ms delay or not ?.
  await newPage.waitForLoadState();
  await newPage.waitForTimeout(2000);

  console.log(await newPage.locator(".text-normal").textContent());

  const newPage_username = newPage.locator("[name='username']");
  const newPage_password = newPage.locator("#password");
  const newPage_submit = newPage.locator("[type='submit']");
  
  await newPage.waitForLoadState();
  await newPage_username.waitFor();

  await newPage_username.fill("banneradmin");

  await newPage_password.fill("123456");

  await newPage_submit.click();

  await newPage.waitForLoadState();

  if (await newPage.locator(".message").isVisible() ){
  while (await newPage.locator(".message").isVisible({timeout:1200})){

    await newPage.locator(".common-button-primary").click();
    await newPage.waitForTimeout(500);
    await newPage.locator("[value='RETURN HOME']").click();
    await newPage.waitForTimeout(500);
  }
  
  await page.waitForLoadState();
  await newPage.waitForTimeout(2000);
  }  

});

test.afterAll(async ({}) => {
    // Cleanup: close the browser
    await page.close();
  });

test('With Fixures now', async ({browser}) => {
  // await page.title();
  const newPage_searchlanding = newPage.locator("#centerSearchTextBox input[name='search']");
  const newPage_select_scacrse_inList = newPage.locator(".searchAnchor")

  await expect.soft(newPage_searchlanding).toBeVisible();
  await newPage_searchlanding.waitFor();
  await newPage_searchlanding.click();
  console.log(await newPage.title());

  await newPage.waitForTimeout(3000);

  // Implementation 1: to retreive spaiden page
  await newPage_searchlanding.fill("SCACRSE")
  await newPage.waitForTimeout(500);
  await newPage_select_scacrse_inList.click();

  // Implementation 2: to retreive spaiden page
  // await newPage_searchlanding.fill("SCACRSE");
  //     await Promise.all([
  //       // await this.select_spaiden.waitFor(),
  //       await newPage_select_scacrse_inList.waitFor(),
  //       await newPage_select_scacrse_inList.click(), 
  //     ])

  await expect.soft(newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('#pnlKeyBlock_scacrseSubjCodeLbt')).toBeVisible();

  await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('#pnlKeyBlock_scacrseSubjCodeLbt').click();
 
  await expect.soft(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByText('Option List Close')).toBeVisible();
  
  console.log(await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByText('Option List Close').textContent());
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'Valid Subject Codes' }).click();

  //criteria inside stvsubj
  await expect(async () => {
    await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' }).click();
    newPage.keyboard.type('221');
    await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toHaveValue("221", { timeout: 1000 });
}).toPass();
  
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByText('221', { exact: true }).click();

  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'OK' }).click();

  //course
  await sleep(1000);
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Course :' }).fill("01");
    
  //Term
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('#pnlKeyBlock_scacrseTermCodeEffLbt').click({timeout:1000});
  
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'Valid Terms for Course' }).click();
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' }).click();
  await newPage.keyboard.type("202365");
  await sleep(1000);
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'OK' }).click(); 

  await sleep(1000);
  
  //Go button
  await expect.soft(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'Go' })).toBeVisible();
  sleep(2000);
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'Go' }).click();

  //course details form
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Course Title *' }).fill("SampleMath");

  //STVCOLL - college...
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('#scbcrseCollCodeLbt').click();

  //STVCOLL college criteria
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' }).fill("23");

  // selecting or double click on 23
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByText('23', { exact: true }).dblclick();

  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Division' }).press('Tab');

await expect(async () => {
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('//td[@class="ui-layout-cell ui-layout-horizontal ui-layout-cell-active"]//button[@id="scbcrseDivsCodeLbt"]').click();
  await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toBeVisible();
}).toPass();

  // Select Division code ADED
  await expect(async () => {
    await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' }).fill("ADED");
    await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toHaveValue("ADED", { timeout: 1000 });
}).toPass();

  // Select Division code ADED
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByText('ADED').dblclick();

  //Dept...
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Department' }).press('Tab');

  await expect(async () => {
    await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('//td[@class="ui-layout-cell ui-layout-horizontal ui-layout-cell-active"]//button[@id="scbcrseDeptCodeLbt"]').click();
    await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toBeVisible();
}).toPass();

  await expect(async () => {
    await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' }).fill("23");
    await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toHaveValue("23", { timeout: 1000 });
}).toPass();

  // Select Dept 23
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByText('23', { exact: true }).dblclick();
 
  //Status...
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Status *' }).waitFor({timeout:1000});
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Status *' }).press('Tab');

  await expect(async () => {
    await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('//td[@class="ui-layout-cell ui-layout-horizontal ui-layout-cell-active"]//button[@id="scbcrseCstaCodeLbt"]').click();
    await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toBeVisible();
}).toPass();

  await expect(async () => {
    await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' }).fill("A");;
    await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toHaveValue("A", { timeout: 1000 });
}).toPass();
  
  //Code A Active selection
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByText('A', { exact: true }).dblclick();
  
  // scbcrseAprvCodeLbt
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('//td[@class="ui-layout-cell ui-layout-horizontal ui-layout-cell-active"]//button[@id="scbcrseAprvCodeLbt"]').waitFor();

  // scbcrseCreditHrLow
 await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('[id="inp:scbcrse_scbcrseCreditHrLow"]').click();
 await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('//td[@class="ui-layout-horizontal ui-layout-gridflow-cell ui-layout-cell-active"]//input[@id="inp:scbcrse_scbcrseCreditHrLow"]').waitFor();
 await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('[id="inp:scbcrse_scbcrseCreditHrLow"]').fill("5.000");

 //scbcrseBillHrLow
await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('//input[@name="scbcrseBillHrLow"]').click();
await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('//td[@class="ui-layout-horizontal ui-layout-gridflow-cell ui-layout-cell-active"]//input[@name="scbcrseBillHrLow"]').waitFor();
await newPage.locator('iframe[name="bannerHS"]').contentFrame().locator('//input[@name="scbcrseBillHrLow"]').fill("5000.000");

// Down Arrow
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Next Section (Alt+PageDown)' }).waitFor();
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Next Section (Alt+PageDown)' }).click();
await newPage.waitForLoadState();

// Course Level Page - 2nd page
// Level 
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Level*' }).press('Tab');

  // Level Code Validation STVLEVL Criteria
  await expect(async () => {
    await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'Open List of Values' }).click();
    await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toBeVisible();
}).toPass();

  await expect(async () => {
    await sleep(1000);
    await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' }).click();
    newPage.keyboard.type('DP');
    await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toHaveValue("DP", { timeout: 500 });
}).toPass();

await sleep(1000);
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'OK' }).click();

await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Next Section (Alt+PageDown)' }).hover();
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Next Section (Alt+PageDown)' }).waitFor();
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Next Section (Alt+PageDown)' }).click();
await newPage.waitForLoadState();

// Grading Mode page - 3rd page
// Grading Mode
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Grade Mode*' }).press('Tab');

await expect(async () => {
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'Open List of Values' }).click();
  await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toBeVisible();
}).toPass();

await expect(async () => {
  await sleep(1000);
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' }).fill("A");
  await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toHaveValue("A", { timeout: 1000 });
}).toPass();

await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByText('A', { exact: true }).dblclick();

// select Default
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'Select' }).waitFor();
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'Select' }).click();
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'Select' }).waitFor({timeout:500});
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('option', { name: 'Default', exact: true }).locator('a').click();

// next page for 3rd page
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Next Section (Alt+PageDown)' }).hover();
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Next Section (Alt+PageDown)' }).waitFor();
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Next Section (Alt+PageDown)' }).click();

await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Schedule*' }).press('Tab');

await expect(async () => {
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'Open List of Values' }).click();
  await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toBeVisible();
}).toPass();

await expect(async () => {
  await sleep(1000);
  await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' }).click();
  newPage.keyboard.type('Classroom');
  await expect(newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('textbox', { name: 'Criteria' })).toHaveValue("Classroom", { timeout: 1000 });
}).toPass();

await sleep(1000);
await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('button', { name: 'OK' }).click();

// await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Save' }).hover();
// await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Save' }).waitFor();
// await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByRole('link', { name: 'Save' }).click();

// expect (await newPage.locator('iframe[name="bannerHS"]').contentFrame().getByText('Saved successfully (4 rows saved)', { exact: true })).toBeVisible();

await newPage.pause();

})

