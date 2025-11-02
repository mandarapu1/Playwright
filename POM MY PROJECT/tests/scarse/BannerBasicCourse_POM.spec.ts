/**
 * The 2 tests below create a Basic course details ( SCACRSE Form), retreive and verify the field values.
 * Prerequisite for Basic course is, a Subject has to be created in STVSUBJ form and same subject code as 'subcode' to be given
 * in /Data/data.json also 'coursetitle' to be givwn an orbitary name
 */

import { expect, test, beforeAll, afterAll, chromium } from '@playwright/test';

import { AppNavigator } from '../pageobjects/AppNavigator';
import { LoginPage } from '../pageobjects/LoginPage';
import { Welcome_SearchPage } from '../pageobjects/Welcome_SearchPage';
import dotenv from 'dotenv';
import path from 'path';
import { CourseDetailsPage } from '../pageobjects/CourseDetailsPage';
import { CourseLevelPage } from '../pageobjects/CourseLevelPage';
import { CourseGradingPage } from '../pageobjects/CourseGradingPage';
import { CourseSchedulePage } from '../pageobjects/CourseSchedulePage';
import { SubTermCoursePage } from '../pageobjects/SubTermCoursePage';
import { sleep } from '../TestUtils/test-utils';
import data from '../Data/data.json';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const baseURL = process.env.baseURL as string;
const username = process.env.USER_NAME as string;
const password = process.env.PASSWORD as string;

let page: any;
let context: any;
let newPage: any;

beforeAll(async ({ browser }) => {
  // Set up the browser instance before tests

  context = await browser.newContext();
  page = await context.newPage();

  // App Navigator Page
  const appnavigator_page = new AppNavigator(page);

  await appnavigator_page.goURL(baseURL);
  newPage = await appnavigator_page.clickAppNavigator(context);

  // Login Page
  const loginpage = new LoginPage(newPage);

  await loginpage.Login(username, password);


});

test.afterAll(async ({ }) => {
  // Cleanup: close the browser
  await page.close();
});

test('With SCACRSE-Basic course create', async ({ browser }) => {

  // Welcome Search Page
  const welcome_searchpage = new Welcome_SearchPage(newPage);
  await welcome_searchpage.search_SCACRSE();

  // Enter Subject, Course, Term
  const subTermCoursePage = new SubTermCoursePage(newPage);
  await subTermCoursePage.enter_Sub_Term_Course(data.subcode, data.course, data.term);

  // Enter Course Details
  const courseDetails_page = new CourseDetailsPage(newPage);
  await courseDetails_page.enter_CourseDetails(data.coursetitle, data.collcod, data.divcod, data.depcod, data.stcod, data.credhrlw, data.billhrlw);

  //Enter Course Level
  const courseLevel_page = new CourseLevelPage(newPage);
  await courseLevel_page.enterCourseLevel(data.courselevel);

  //Enter Course grading
  const courseGrading_page = new CourseGradingPage(newPage);
  await courseGrading_page.enterCourseGrading(data.grade);

  //Enter Course Schedule
  const courseSchedule_page = new CourseSchedulePage(newPage);
  await courseSchedule_page.enterScheduleType(data.schedule_description);

  // Saved successfully (4 rows saved)
  // await expect (courseSchedule_page.savedSuccessful).toBeVisible();

  console.log(courseSchedule_page.savedSuccessfully.textContent());
  await expect(courseSchedule_page.savedSuccessfully).toContainText(data.savedSuccessfully);
  
})



test('With SCACRSE-Basic course reteive', async ({browser}) => {

  const welcome_searchpage = new Welcome_SearchPage(newPage);
  await welcome_searchpage.search_SCACRSE(); 
  
  const subTermCoursePage = new SubTermCoursePage(newPage);
  await subTermCoursePage.enter_Sub_Term_Course(data.subcode, data.course, data.term);

  //Course details
  const attrTitle= 'title';
  const attrValue = 'value';
  const courseDetails_page = new CourseDetailsPage(newPage);
  
  console.log(await courseDetails_page.h2_title.getAttribute(attrTitle));
  await expect(courseDetails_page.h2_title).toHaveAttribute(attrTitle, data.h2_title);
  
  console.log(await courseDetails_page.h3_title.textContent());
  await expect(courseDetails_page.h3_title).toHaveText(data.h3_title_courseDetails);

  console.log(await courseDetails_page.courseTitle.getAttribute(attrTitle));
  
  await expect(courseDetails_page.courseTitle).toHaveAttribute(attrTitle, data.coursetitle);
  
  sleep(500);
  console.log(await courseDetails_page.college.getAttribute(attrTitle));
  await expect(courseDetails_page.college).toHaveAttribute(attrTitle, data.collcod);

  sleep(500);
  console.log(await courseDetails_page.divisionTextBox.getAttribute(attrTitle));
  await expect(courseDetails_page.divisionTextBox).toHaveAttribute(attrTitle, data.divcod);

  console.log(await courseDetails_page.deptTxtBox.getAttribute(attrTitle));
  await expect(courseDetails_page.deptTxtBox).toHaveAttribute(attrTitle, data.depcod);

  console.log(await courseDetails_page.statusTxtBox.getAttribute(attrTitle));
  await expect(courseDetails_page.statusTxtBox).toHaveAttribute(attrTitle, data.stcod);

  console.log(await courseDetails_page.creditHrLow.getAttribute(attrTitle));
  await expect(courseDetails_page.creditHrLow).toHaveAttribute(attrTitle, data.credhrlw);

  console.log(await courseDetails_page.billHrLow.getAttribute(attrTitle));
  await expect(courseDetails_page.billHrLow).toHaveAttribute(attrTitle, data.billhrlw);

  await courseDetails_page.pgdown();

  // Course level

  const courseLevel_page= new CourseLevelPage(newPage);

  console.log(await courseLevel_page.h2_title.getAttribute(attrTitle));
  await expect(courseLevel_page.h2_title).toHaveAttribute(attrTitle, data.h2_title);

  console.log(await courseLevel_page.h3_title.textContent());
  await expect(courseLevel_page.h3_title).toHaveText(data.h3_title_courseLevel);
 
  console.log(await courseLevel_page.courseLevel.getAttribute(attrValue));
  await expect(courseLevel_page.courseLevel).toHaveAttribute(attrValue, data.courselevel);

  await courseLevel_page.pgdown();

  //Course Grading

  const courseGrading_page= new CourseGradingPage(newPage);

  console.log(await courseGrading_page.h2_title.getAttribute(attrTitle));
  await expect(courseGrading_page.h2_title).toHaveAttribute(attrTitle, data.h2_title);

  console.log(await courseGrading_page.h3_title.textContent());
  await expect(courseGrading_page.h3_title).toHaveText(data.h3_title_gradingMode);
  
  await(courseGrading_page.courseGrading.getAttribute(attrValue));
  await expect(courseGrading_page.courseGrading).toHaveAttribute(attrValue,data.grade);

  await courseGrading_page.pgdown();

  //Course Schedule

  const courseSchedule_page= new CourseSchedulePage(newPage);

  console.log(await courseSchedule_page.h2_title.getAttribute(attrTitle));
  await expect(courseSchedule_page.h2_title).toHaveAttribute(attrTitle, data.h2_title);

  console.log(await courseSchedule_page.h3_title.textContent());
  await expect(courseSchedule_page.h3_title).toHaveText(data.h3_title_scheduleType);
  
  console.log(await courseSchedule_page.scheduleType_Description.getAttribute(attrTitle));
  await expect(courseSchedule_page.scheduleType_Description).toHaveAttribute(attrTitle, data.schedule_description);
  
})
