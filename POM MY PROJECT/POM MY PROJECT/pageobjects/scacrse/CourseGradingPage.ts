import { BrowserContext, Page, type Locator, FrameLocator, expect } from '@playwright/test';
import { sleep } from '../../TestUtils/test-utils';
import { Crse_Detl_Levl_Grad_Shed_PagesLocators } from '../../Locators/scacrse/Crse_Detl_Levl_Grad_Shed_PagesLocators';
import { common_variables } from '../commons/common_variables';

export class CourseGradingPage {

  readonly page: Page;
  
  readonly framebannerHS: Locator;
  readonly framePage: FrameLocator;

  Criteria: Locator;

  pageDown: Locator;

  openlistvaluesBtn: Locator;
  // okBtn: Locator;

  courseGrading: Locator;
  Gradevalue: Locator;
  defaultDropdown: Locator;
  defaultLink: Locator;
  h2_title: Locator;
  h3_title: Locator;
  okBtn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.framePage = page.frameLocator(Crse_Detl_Levl_Grad_Shed_PagesLocators.frameBannerHS);

    // this.h2_title = this.framePage.getByRole('heading', { name: 'Basic Course Information' });
    this.h2_title = this.framePage.getByRole(common_variables.role_heading, { name:common_variables.course_name })

    this.h3_title = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.h3_title_courseGrade);

    // this.courseGrading = this.framePage.getByRole('textbox', { name: 'Grade Mode*' });
    this.courseGrading = this.framePage.getByRole(common_variables.role_txtbox, { name: common_variables.name_gradmode });
    // this.openlistvaluesBtn = this.framePage.getByRole('button', { name: 'Open List of Values' });
    this.openlistvaluesBtn = this.framePage.getByRole(common_variables.role_btn, { name: common_variables.nam_openlistval });
    // this.Criteria = this.framePage.getByRole('textbox', { name: 'Criteria' });
    this.Criteria = this.framePage.getByRole(common_variables.role_txtbox, { name: common_variables.name_critieria });
    
    // this.Gradevalue = this.framePage.getByText('A', { exact: true });
    this.Gradevalue = this.framePage.getByText(common_variables.bytxt_grade, { exact: true });

    // this.defaultDropdown = this.framePage.getByRole('button', { name: 'Select' });
    this.defaultDropdown = this.framePage.getByRole(common_variables.role_btn, { name: common_variables.name_select });

    // this.defaultLink = this.framePage.getByRole('option', { name: 'Default', exact: true }).locator('a');
    // this.defaultLink = this.framePage.getByRole(common_variables.role_option, { name: 'Default', exact: true }).locator('a');
    this.defaultLink = this.framePage.getByRole(common_variables.role_option, { name:common_variables.grad_name_default, exact: true }).locator(common_variables.a);

    // this.okBtn = this.framePage.getByRole('button', { name: 'OK' });
    this.okBtn = this.framePage.getByRole(common_variables.role_btn, { name: common_variables.name_ok });

    // this.pageDown = this.framePage.getByRole('link', { name: 'Next Section (Alt+PageDown)' });
    this.pageDown = this.framePage.getByRole(common_variables.lnk, { name:  common_variables.nam_pagedown });
  }

  async enterCourseGrading(grade: string) {

    // Course GradingMode Page - 3rd page

    await sleep(1000);
    await this.courseGrading.press('Tab');

    // Level Code Validation STVLEVL Criteria
    await expect(async () => {
      await this.openlistvaluesBtn.click();
      await expect.soft(this.Criteria).toBeVisible();
    }).toPass();

    await expect(async () => {
      await sleep(1000);
      await this.Criteria.click();
      await this.Criteria.clear();
      this.page.keyboard.type(grade);
      await expect.soft(this.Criteria).toHaveValue(grade, { timeout: 1000 });
    }).toPass();

    // await this.Gradevalue.dblclick();
    await this.okBtn.click();

    // Default
    await this.defaultDropdown.waitFor();
    await this.defaultDropdown.click();
    await this.defaultDropdown.waitFor({ timeout: 500 });
    await this.defaultLink.click();

    console.log("in course grading page title:", await this.page.title());

    // Down Arrow
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
