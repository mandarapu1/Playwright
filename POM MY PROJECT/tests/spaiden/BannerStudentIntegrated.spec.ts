/**
 * The test below retreives personal identification details ( SPAIDEN Form) and verifies some of the labels, values.
 * Prerequisite for this is, personal identification details to be created and spaiden id along with other values to be edited in 
 * Data/data.json
 */

import { BrowserContext, expect, Page, test } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
import { GeneralPersonIdentifyPage } from '../../pageobjects/spaiden/GeneralPersonIdentifyPage';
import { EnterIdGoPage } from '../../pageobjects/spaiden/EnterIdGoPage';
import jsonData from '../../Data/data_spaiden.json';
import {common_variables}  from '../../pageobjects/commons/common_variables';


dotenv.config({ path: path.resolve(__dirname, '../..', '.env' )});

const baseURL = process.env.baseURL as string;
const username = process.env.USER_NAME as string;
const password = process.env.PASSWORD as string;
const formname = process.env.FORM1 as string;

let page: Page;
let context: BrowserContext;
let enter_go_id_page: EnterIdGoPage

test.beforeAll(async ({ browser }) => {
  // Set up the browser instance before tests

  context = await browser.newContext();
  page = await context.newPage();

  enter_go_id_page = new EnterIdGoPage(page);
  await enter_go_id_page.goURL(baseURL);
  await enter_go_id_page.clickAppNavigator(context);
  
  await enter_go_id_page.assignNewpage_Varaibles();
  await enter_go_id_page.Login(username, password);

  await enter_go_id_page.searchForm(formname);

  page = enter_go_id_page.getPage();
  enter_go_id_page.enterID_Go(page,jsonData.EnterIdGoPage.spaiden_id);
   
});

test.afterAll(async ({ }) => {
  // Cleanup: close the browser
  await page.close();
});

test('pom login', async ({ browser }) => {

  // General Person Identify Page
  const generalPersonIdentifyPage = new GeneralPersonIdentifyPage(page);
  await generalPersonIdentifyPage.goto_Alt_Identify_tab();
  
  //AltIdentify tab Name Type label
  console.log(await generalPersonIdentifyPage.AltIdentify_NameType_label_locator.getAttribute(common_variables.attr_Title));
  await expect(generalPersonIdentifyPage.AltIdentify_NameType_label_locator).toBeVisible();

  //AltIdentify tab Name Type text
  console.log(await generalPersonIdentifyPage.AltIdentify_NameType.getAttribute(common_variables.attr_Title)); 
  await expect (generalPersonIdentifyPage.AltIdentify_NameType).toHaveAttribute(common_variables.attr_Title, jsonData.GeneralPersonIdentifyPage.AltIdentify_NameType_Val); // AGNT

  //AltIdentify FirstName label
  console.log(await generalPersonIdentifyPage.AltIdentify_FirstName_label_locator.getAttribute(common_variables.attr_for));
  await expect(generalPersonIdentifyPage.AltIdentify_FirstName_label_locator).toBeVisible();

  //AltIdentify tab Firstname
  console.log(await generalPersonIdentifyPage.AltIdentify_FirstName.getAttribute(common_variables.attr_Title)); 
  await expect (generalPersonIdentifyPage.AltIdentify_FirstName).toHaveAttribute(common_variables.attr_Title,jsonData.GeneralPersonIdentifyPage.AltIdentify_FirstName_Val);//Fname

  await generalPersonIdentifyPage.goto_Email_tab();

  // Email Tab - Email Type
  console.log(await generalPersonIdentifyPage.Email_Tab_EmailType_label.getAttribute(common_variables.attr_for));
  await expect(generalPersonIdentifyPage.Email_Tab_EmailType_label).toBeVisible();

  console.log(await generalPersonIdentifyPage.Email_Tab_EmailType.getAttribute(common_variables.attr_Title)); 
  await expect (generalPersonIdentifyPage.Email_Tab_EmailType).toHaveAttribute(common_variables.attr_Title, jsonData.GeneralPersonIdentifyPage.Email_Tab_EmailType_Val);// PERM
  
  // Email Tab - Email Address
  console.log(await generalPersonIdentifyPage.Email_Tab_EmailAddress_label.getAttribute(common_variables.attr_for));
  await expect(generalPersonIdentifyPage.Email_Tab_EmailAddress_label).toBeVisible();

  console.log(await generalPersonIdentifyPage.Email_Tab_EmailAddress.getAttribute(common_variables.attr_Title)); 
  await expect (generalPersonIdentifyPage.Email_Tab_EmailAddress).toHaveAttribute(common_variables.attr_Title, jsonData.GeneralPersonIdentifyPage.Email_Tab_EmailAddress_Val);//'mandarapu1@gmail.com'
  
  // Emergenct contact tab fields
  await generalPersonIdentifyPage.goto_EmergencyContact_tab();

  // EmergenctContact tab - Priority label
  await expect(generalPersonIdentifyPage.EmergencyContact_Priority_Label).toBeVisible();

  // EmergenctContact tab - Firstname
  console.log(await generalPersonIdentifyPage.EmergencyContact_FirstName_label_locator.getAttribute(common_variables.attr_for));
  await expect(generalPersonIdentifyPage.EmergencyContact_FirstName_label_locator).toBeVisible();

  console.log(await generalPersonIdentifyPage.EmergencyContact_FirstName_Value.getAttribute(common_variables.attr_Title));
  await expect (generalPersonIdentifyPage.EmergencyContact_FirstName_Value).toHaveAttribute(common_variables.attr_Title, jsonData.GeneralPersonIdentifyPage.EmergencyContact_FirstName_Value);//NieceFirstName

  //EmergenctContact tab - Lastname
  console.log(await generalPersonIdentifyPage.EmergencyContact_LastName_label_locator.getAttribute(common_variables.attr_for));
  await expect(generalPersonIdentifyPage.EmergencyContact_LastName_label_locator).toBeVisible();

  console.log(await generalPersonIdentifyPage.EmergencyContact_LastName_Value.getAttribute(common_variables.attr_Title));
  await expect (generalPersonIdentifyPage.EmergencyContact_LastName_Value).toHaveAttribute(common_variables.attr_Title, jsonData.GeneralPersonIdentifyPage.EmergencyContact_LasttName_Value);//NieceLastName
      
 });