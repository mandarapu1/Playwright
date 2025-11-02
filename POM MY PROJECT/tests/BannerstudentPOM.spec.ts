/**
 * The test below retreives personal identification details ( SPAIDEN Form) and verifies some of the labels, values.
 * Prerequisite for this is, personal identification details to be created and spaiden id along with other values to be edited in 
 * Data/data.json
 */

import { expect, test } from '@playwright/test';
import { AppNavigator } from '../pageobjects/AppNavigator';
import { LoginPage } from '../pageobjects/LoginPage';
import { Welcome_SearchPage } from '../pageobjects/Welcome_SearchPage';
import dotenv from 'dotenv';
import path from 'path';
import { GeneralPersonIdentifyPage } from '../pageobjects/GeneralPersonIdentifyPage';
import { EnterIdGoPage } from '../pageobjects/EnterIdGoPage';
import jsonData from '../Data/data.json';
import { sleep } from '../TestUtils/test-utils';

dotenv.config({ path: path.resolve(__dirname, '..', '.env' )});

const baseURL = process.env.baseURL as string;
const username = process.env.USER_NAME as string;
const password = process.env.PASSWORD as string;


test('pom login', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  const attr_for = 'for';
  const attr_Title = 'title';

  //App Navigator Page
  const appnavigator_page = new AppNavigator(page);

  await appnavigator_page.goURL(baseURL);
  const newpage = await appnavigator_page.clickAppNavigator(context);

  // Login Page
  const loginpage = new LoginPage(newpage);
  
  await loginpage.Login(username, password);

  // Welcome Page
  const welcome_searchpage = new Welcome_SearchPage(newpage);
  await welcome_searchpage.search_SPIADEN();

  // Enter ID and Go
  const enter_go_id_page = new EnterIdGoPage(newpage);
  enter_go_id_page.enterID_Go(jsonData.EnterIdGoPage.spaiden_id);

  // General Person Identify Page
  const generalPersonIdentifyPage = new GeneralPersonIdentifyPage(newpage);
  await generalPersonIdentifyPage.goto_Alt_Identify_tab();
  
  //AltIdentify tab Name Type label
  console.log(await generalPersonIdentifyPage.AltIdentify_NameType_label_locator.getAttribute(attr_for));
  await expect(generalPersonIdentifyPage.AltIdentify_NameType_label_locator).toBeVisible();

  //AltIdentify tab Name Type text
  console.log(await generalPersonIdentifyPage.AltIdentify_NameType.getAttribute(attr_Title)); 
  await expect (generalPersonIdentifyPage.AltIdentify_NameType).toHaveAttribute(attr_Title, jsonData.GeneralPersonIdentifyPage.AltIdentify_NameType_Val); // AGNT

  //AltIdentify FirstName label
  console.log(await generalPersonIdentifyPage.AltIdentify_FirstName_label_locator.getAttribute(attr_for));
  await expect(generalPersonIdentifyPage.AltIdentify_FirstName_label_locator).toBeVisible();

  //AltIdentify tab Firstname
  console.log(await generalPersonIdentifyPage.AltIdentify_FirstName.getAttribute(attr_Title)); 
  await expect (generalPersonIdentifyPage.AltIdentify_FirstName).toHaveAttribute(attr_Title,jsonData.GeneralPersonIdentifyPage.AltIdentify_FirstName_Val);//Fname

  await generalPersonIdentifyPage.goto_Email_tab();

  // Email Tab - Email Type
  console.log(await generalPersonIdentifyPage.Email_Tab_EmailType_label.getAttribute(attr_for));
  await expect(generalPersonIdentifyPage.Email_Tab_EmailType_label).toBeVisible();

  console.log(await generalPersonIdentifyPage.Email_Tab_EmailType.getAttribute(attr_Title)); 
  await expect (generalPersonIdentifyPage.Email_Tab_EmailType).toHaveAttribute(attr_Title, jsonData.GeneralPersonIdentifyPage.Email_Tab_EmailType_Val);// PERM
  
  // Email Tab - Email Address
  console.log(await generalPersonIdentifyPage.Email_Tab_EmailAddress_label.getAttribute(attr_for));
  await expect(generalPersonIdentifyPage.Email_Tab_EmailAddress_label).toBeVisible();

  console.log(await generalPersonIdentifyPage.Email_Tab_EmailAddress.getAttribute(attr_Title)); 
  await expect (generalPersonIdentifyPage.Email_Tab_EmailAddress).toHaveAttribute(attr_Title, jsonData.GeneralPersonIdentifyPage.Email_Tab_EmailAddress_Val);//'mandarapu1@gmail.com'
  
  // Emergenct contact tab fields
  await generalPersonIdentifyPage.goto_EmergencyContact_tab();

  // EmergenctContact tab - Priority label
  await expect(generalPersonIdentifyPage.EmergencyContact_Priority_Label).toBeVisible();

  // EmergenctContact tab - Firstname
  console.log(await generalPersonIdentifyPage.EmergencyContact_FirstName_label_locator.getAttribute(attr_for));
  await expect(generalPersonIdentifyPage.EmergencyContact_FirstName_label_locator).toBeVisible();

  console.log(await generalPersonIdentifyPage.EmergencyContact_FirstName_Value.getAttribute(attr_Title));
  await expect (generalPersonIdentifyPage.EmergencyContact_FirstName_Value).toHaveAttribute(attr_Title, jsonData.GeneralPersonIdentifyPage.EmergencyContact_FirstName_Value);//NieceFirstName

  //EmergenctContact tab - Lastname
  console.log(await generalPersonIdentifyPage.EmergencyContact_LastName_label_locator.getAttribute(attr_for));
  await expect(generalPersonIdentifyPage.EmergencyContact_LastName_label_locator).toBeVisible();

  console.log(await generalPersonIdentifyPage.EmergencyContact_LastName_Value.getAttribute(attr_Title));
  await expect (generalPersonIdentifyPage.EmergencyContact_LastName_Value).toHaveAttribute(attr_Title, jsonData.GeneralPersonIdentifyPage.EmergencyContact_LastName_Value);//NieceLastName
      
 });