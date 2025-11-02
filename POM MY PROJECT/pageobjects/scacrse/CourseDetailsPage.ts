import { BrowserContext, Page, type Locator, FrameLocator, expect } from '@playwright/test';
import { sleep } from '../../TestUtils/test-utils';
import { Crse_Detl_Levl_Grad_Shed_PagesLocators } from '../../Locators/scacrse/Crse_Detl_Levl_Grad_Shed_PagesLocators';
import { common_variables } from '../commons/common_variables';

export class CourseDetailsPage {

  readonly page: Page;
  readonly searchlanding: Locator;

  readonly framebannerHS: Locator;
  readonly framePage: FrameLocator;

  Criteria: Locator;

  courseTitle: Locator;
  collCodeLbt: Locator;
  divisionTextBox: Locator;
  divCodeLbt: any;
  deptTxtBox: Locator;
  deptCodeLbt: Locator;
  statusTxtBox: Locator;
  statusCodeLbt: Locator;
  apprvCodeLbt: Locator;
  creditHrLow: Locator;
  creditHrLow_active: Locator;
  billHrLow: Locator;
  billHrLow_active: Locator;
  pageDown: Locator;
  college: Locator;
  h2_title: Locator;
  h3_title: Locator;
  h3: any;
  // h2_title_attr_title: Promise<string | null>;
  // courseTtile_getattr_title: Promise<string | null>;

  constructor(page: Page) {

    this.page = page;

    this.framePage = page.frameLocator(Crse_Detl_Levl_Grad_Shed_PagesLocators.frameBannerHS);

    // this.h2_title = this.framePage.getByRole('heading', { name: 'Basic Course Information' })
    this.h2_title = this.framePage.getByRole(common_variables.role_heading, { name:common_variables.course_name })
    
    // this.h3_title = this.framePage.getByText('Course Details', { exact: true });
    this.h3_title = this.framePage.getByText(common_variables.bytext_course_details, { exact: true });

    // this.courseTitle = this.framePage.getByRole('textbox', { name: 'Course Title *' });
    this.courseTitle = this.framePage.getByRole(common_variables.role_txtbox, { name: common_variables.name_coursetitle});
    
    this.collCodeLbt = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.collCodeLbt);
    // this.Criteria = this.framePage.getByRole('textbox', { name: 'Criteria' });
    this.Criteria = this.framePage.getByRole(common_variables.role_txtbox, { name:common_variables.name_critieria });

    // this.divisionTextBox = this.framePage.getByRole('textbox', { name: 'Division' });
    this.divisionTextBox = this.framePage.getByRole(common_variables.role_txtbox, { name: common_variables.name_div });

    this.divCodeLbt = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.divCodeLbt);
    // this.deptTxtBox = this.framePage.getByRole('textbox', { name: 'Department' });
    this.deptTxtBox = this.framePage.getByRole(common_variables.role_txtbox, { name: common_variables.name_dept });
    
    this.deptCodeLbt = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.deptCodeLbt);
    // this.statusTxtBox = this.framePage.getByRole('textbox', { name: 'Status *' });
    this.statusTxtBox = this.framePage.getByRole(common_variables.role_txtbox, { name:common_variables.name_status});
    this.statusCodeLbt = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.statusCodeLbt);
    this.apprvCodeLbt = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.apprvCodeLbt);
    this.creditHrLow = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.creditHrLow);
    this.creditHrLow_active = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.creditHrLow_active);
    this.billHrLow = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.billHrLow);
    this.billHrLow_active = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.billHrLow_active);
    // this.pageDown = this.framePage.getByRole('link', { name: 'Next Section (Alt+PageDown)' });
    this.pageDown = this.framePage.getByRole(common_variables.lnk, { name: common_variables.nam_pagedown });

    this.college = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.college_wrkg)

    // this.okBtn = this.framePage.getByRole('button', { name: 'OK' });

  }

  async enter_CourseDetails(coursetitle: string, collcod: string, divcod: string, depcod: string, stcod: string, credhrlw: string, billhrlw: string) {

    //Course Title

    // Select college code
    await expect(async () => {
      await this.courseTitle.fill(coursetitle);
      await expect(this.courseTitle).toHaveValue(coursetitle, { timeout: 1000 });
    }).toPass();

    console.log("in course details title:", await this.page.title());

    // college List btn
    await expect(async () => {
      await this.collCodeLbt.click();
      await expect(this.Criteria).toBeVisible();
    }).toPass();

    // Select college code
    await expect(async () => {
      await this.Criteria.fill(collcod);
      await expect(this.Criteria).toHaveValue(collcod, { timeout: 1000 });
    }).toPass();

    // selecting or double click on 23
    await this.framePage.getByText(collcod, { exact: true }).dblclick();

    // Click Division textbox  
    await this.divisionTextBox.press('Tab');
    

    // Divison List btn
    await expect(async () => {
      await this.divCodeLbt.click();
      await expect(this.Criteria).toBeVisible();
    }).toPass();

    // Select Division code ADED
    await expect(async () => {
      await this.Criteria.fill(divcod);
      await expect(this.Criteria).toHaveValue(divcod, { timeout: 1000 });
    }).toPass();

    // Select Division code ADED
    await this.framePage.getByText(divcod).dblclick();

    //Dept...
    await this.deptTxtBox.press('Tab');

    //Dept code List btn
    await expect(async () => {
      await this.deptCodeLbt.click();
      await expect(this.Criteria).toBeVisible();
    }).toPass();

    await expect(async () => {
      await this.Criteria.fill(depcod);
      await expect(this.Criteria).toHaveValue(depcod, { timeout: 1000 });
    }).toPass();

    // Select Dept 23
    await this.framePage.getByText(depcod, { exact: true }).dblclick();

    //Status text box...
    await this.statusTxtBox.waitFor({ timeout: 1000 });
    await this.statusTxtBox.press('Tab');

    //Status Code List Btn
    await expect(async () => {
      await this.statusCodeLbt.click();
      await expect(this.Criteria).toBeVisible();
    }).toPass();

    await expect(async () => {
      await this.Criteria.fill(stcod);;
      await expect(this.Criteria).toHaveValue(stcod, { timeout: 1000 });
    }).toPass();

    //Code A Active selection
    await this.framePage.getByText(stcod, { exact: true }).dblclick();

    // scbcrseAprvCodeLbt
    await this.apprvCodeLbt.waitFor();

    // scbcrseCreditHrLow
    await this.creditHrLow.click();
    await this.creditHrLow_active.waitFor();
    await this.creditHrLow.fill(credhrlw);

    //scbcrseBillHrLow
    await this.billHrLow.click();
    await sleep(500);
    // await expect.soft(this.billHrLow_active).toBeVisible();
    await this.billHrLow_active.waitFor();
    await this.billHrLow.fill(billhrlw);

    console.log("in course details: page title:", await this.page.title())

    // Down Arrow
    await sleep(1000);
    await this.pageDown.hover();
    await this.pageDown.waitFor();
    await this.pageDown.click();
    await this.page.waitForLoadState();

  }

  // async pgdown() {

  //   await this.pageDown.hover();
  //   await this.pageDown.waitFor();
  //   await this.pageDown.click();
  //   await this.page.waitForLoadState();
  // }
}
