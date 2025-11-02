/**
 * The 2 tests below create a Basic course details ( SCACRSE Form), retreive and verify the field values.
 * Prerequisite for Basic course is, a Subject has to be created in STVSUBJ form and same subject code as 'subcode' to be given
 * in /Data/data.json also 'coursetitle' to be givwn an orbitary name
 */

import { expect, test,  chromium, Page, BrowserContext } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';

import { SubTermCoursePage } from '../../pageobjects/scacrse/SubTermCoursePage';
import { CourseDetailsPage } from '../../pageobjects/scacrse/CourseDetailsPage';
import { CourseGradingPage } from '../../pageobjects/scacrse/CourseGradingPage';
import { CourseSchedulePage } from '../../pageobjects/scacrse/CourseSchedulePage';
import { CourseLevelPage } from '../../pageobjects/scacrse/CourseLevelPage';
import { sleep } from '../../TestUtils/test-utils';
import {common_variables}  from '../../pageobjects/commons/common_variables.ts';
// import {common_variables};

import data from '../../Data/data.json';

dotenv.config({ path: path.resolve(__dirname, '../../', '.env') });

const baseURL = process.env.baseURL as string;
const username = process.env.USER_NAME as string;
const password = process.env.PASSWORD as string;
const formname = process.env.FORM2 as string;

let page: Page;
let context: BrowserContext;
let subTermCoursePage: SubTermCoursePage

test.beforeAll(async ({ browser }) => {
  // Set up the browser instance before tests

  context = await browser.newContext();
  page = await context.newPage();

  subTermCoursePage = new SubTermCoursePage(page);
  await subTermCoursePage.goURL(baseURL);
  await subTermCoursePage.clickAppNavigator(context);

  await subTermCoursePage.assignNewpage_Varaibles();
  await subTermCoursePage.Login(username, password);

  await subTermCoursePage.searchForm(formname);

  page = subTermCoursePage.getPage();
  await subTermCoursePage.enter_Sub_Term_Course(page, data.subcode, data.course, data.term);
  
});

test.afterAll(async ({ }) => {
  // Cleanup: close the browser
  await page.close();
});

// test('With SCACRSE-Basic course create', async ({ browser }) => {

//   // Enter Course Details
//   const courseDetails_page = new CourseDetailsPage(page);
//   await courseDetails_page.enter_CourseDetails(data.coursetitle, data.collcod, data.divcod, data.depcod, data.stcod, data.credhrlw, data.billhrlw);

//   //Enter Course Level
//   const courseLevel_page = new CourseLevelPage(page);
//   await courseLevel_page.enterCourseLevel(data.courselevel);

//   //Enter Course grading
//   const courseGrading_page = new CourseGradingPage(page);
//   await courseGrading_page.enterCourseGrading(data.grade);

//   //Enter Course Schedule
//   const courseSchedule_page = new CourseSchedulePage(page);
//   await courseSchedule_page.enterScheduleType(data.schedule_description);

//   console.log(await courseSchedule_page.savedSuccessfully.textContent());
//   await expect(courseSchedule_page.savedSuccessfully).toContainText(data.savedSuccessfully);
  
// })

test('With SCACRSE-Basic course reteive', async ({browser}) => {
    
  //Course details
  
  const courseDetails_page = new CourseDetailsPage(page);
  sleep(1000);
  console.log(await courseDetails_page.h2_title.getAttribute(common_variables.attr_Title));
  await expect(courseDetails_page.h2_title).toHaveAttribute(common_variables.attr_Title, data.h2_title);
  
  console.log(await courseDetails_page.h3_title.textContent());
  await expect(courseDetails_page.h3_title).toHaveText(data.h3_title_courseDetails);

  console.log(await courseDetails_page.courseTitle.getAttribute(common_variables.attr_Title));
  
  await expect(courseDetails_page.courseTitle).toHaveAttribute(common_variables.attr_Title, data.coursetitle);
  
  sleep(500);
  console.log(await courseDetails_page.college.getAttribute(common_variables.attr_Title));
  await expect(courseDetails_page.college).toHaveAttribute(common_variables.attr_Title, data.collcod);

  sleep(500);
  console.log(await courseDetails_page.divisionTextBox.getAttribute(common_variables.attr_Title));
  await expect(courseDetails_page.divisionTextBox).toHaveAttribute(common_variables.attr_Title, data.divcod);

  console.log(await courseDetails_page.deptTxtBox.getAttribute(common_variables.attr_Title));
  await expect(courseDetails_page.deptTxtBox).toHaveAttribute(common_variables.attr_Title, data.depcod);

  console.log(await courseDetails_page.statusTxtBox.getAttribute(common_variables.attr_Title));
  await expect(courseDetails_page.statusTxtBox).toHaveAttribute(common_variables.attr_Title, data.stcod);

  console.log(await courseDetails_page.creditHrLow.getAttribute(common_variables.attr_Title));
  await expect(courseDetails_page.creditHrLow).toHaveAttribute(common_variables.attr_Title, data.credhrlw);

  console.log(await courseDetails_page.billHrLow.getAttribute(common_variables.attr_Title));
  await expect(courseDetails_page.billHrLow).toHaveAttribute(common_variables.attr_Title, data.billhrlw);
  
  // await courseDetails_page.pgdown();
  // await common_variables.pgdown(courseDetails_page); to try this later
  
  // Calling page down at coursedetails from Base class
  // await subTermCoursePage.pgdown(); - working

  // Calling page down at coursedetails from Base class
  await subTermCoursePage.pgdown(courseDetails_page.page);

  // Course level

  const courseLevel_page= new CourseLevelPage(page);

  console.log(await courseLevel_page.h2_title.getAttribute(common_variables.attr_Title));
  await expect(courseLevel_page.h2_title).toHaveAttribute(common_variables.attr_Title, data.h2_title);

  console.log(await courseLevel_page.h3_title.textContent());
  await expect(courseLevel_page.h3_title).toHaveText(data.h3_title_courseLevel);
 
  await expect(courseLevel_page.h2_title).toHaveAttribute(common_variables.attr_Title, data.h2_title);
  console.log(await courseLevel_page.courseLevel.getAttribute(common_variables.attrValue));
  await expect(courseLevel_page.courseLevel).toHaveAttribute(common_variables.attrValue, data.courselevel);

  // Calling page down at courselevel from Base class
  await subTermCoursePage.pgdown(courseLevel_page.page);

  // Course Grading

  const courseGrading_page= new CourseGradingPage(page);

  console.log(await courseGrading_page.h2_title.getAttribute(common_variables.attr_Title));
  await expect(courseGrading_page.h2_title).toHaveAttribute(common_variables.attr_Title, data.h2_title);

  console.log(await courseGrading_page.h3_title.textContent());
  await expect(courseGrading_page.h3_title).toHaveText(data.h3_title_gradingMode);
  
  await(courseGrading_page.courseGrading.getAttribute(common_variables.attrValue));
  await expect(courseGrading_page.courseGrading).toHaveAttribute(common_variables.attrValue,data.grade);

  await subTermCoursePage.pgdown(courseGrading_page.page);
 
  // Course Schedule
  const courseSchedule_page= new CourseSchedulePage(page);

  console.log(await courseSchedule_page.h2_title.getAttribute(common_variables.attr_Title));
  await expect(courseSchedule_page.h2_title).toHaveAttribute(common_variables.attr_Title, data.h2_title);

  console.log(await courseSchedule_page.h3_title.textContent());
  await expect(courseSchedule_page.h3_title).toHaveText(data.h3_title_scheduleType);
  
  console.log(await courseSchedule_page.scheduleType_Description.getAttribute(common_variables.attr_Title));
  await expect(courseSchedule_page.scheduleType_Description).toHaveAttribute(common_variables.attr_Title, data.schedule_description);
  
})


