import { BrowserContext, Page, type Locator, FrameLocator, expect } from '@playwright/test';
import { sleep } from '../../TestUtils/test-utils';
import { Crse_Detl_Levl_Grad_Shed_PagesLocators } from '../../Locators/scacrse/Crse_Detl_Levl_Grad_Shed_PagesLocators';
import { common_variables } from '../commons/common_variables.ts';

export class CourseSchedulePage {

  readonly page: Page;


  readonly framebannerHS: Locator;
  readonly framePage: FrameLocator;

  Criteria: Locator;

  pageDown: Locator;

  openlistvaluesBtn: Locator;
  // okBtn: Locator;

  sheduleTxBx: Locator;
  okBtn: Locator;
  saveBtn: Locator;
  savedSuccessful: Locator;
  scheduleType_Description: Locator;
  h2_title: Locator;
  h3_title: Locator;
  savedSuccessfully: Locator;
  notification: Locator;
  scheduleTxBx_Loc: Locator;
  scheduleTxBx_active: Locator;
  scheduleTxBx_active_button: Locator;
  scheduleType_row_active: any;
  scheduleType_row_txtbx_active: Locator;

  constructor(page: Page) {

    this.page = page;

    this.framePage = page.frameLocator(Crse_Detl_Levl_Grad_Shed_PagesLocators.frameBannerHS);

    // this.h2_title = this.framePage.getByRole('heading', { name: 'Basic Course Information' });
    this.h2_title = this.framePage.getByRole(common_variables.role_heading, { name:common_variables.course_name })
    this.h3_title = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.h3_title_courseSchedule);

    // this.sheduleTxBx = this.framePage.getByRole('textbox', { name: 'Schedule*' });
    this.sheduleTxBx = this.framePage.getByRole(common_variables.role_txtbox, { name: common_variables.name_schedule });
    this.scheduleType_row_txtbx_active = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.scheduleType_row_txtbx_active);
    this.scheduleTxBx_active = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.scheduleTxBx_active);
    this.scheduleType_Description = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.scheduleType_Description);
    // this.openlistvaluesBtn = this.framePage.getByRole('button', { name: 'Open List of Values' });
    this.openlistvaluesBtn = this.framePage.getByRole(common_variables.role_btn, { name: common_variables.nam_openlistval });
    
    // this.Criteria = this.framePage.getByRole('textbox', { name: 'Criteria' });
    this.Criteria = this.framePage.getByRole(common_variables.role_txtbox, { name: common_variables.name_critieria });
    // this.okBtn = this.framePage.getByRole('button', { name: 'OK' });
    this.okBtn = this.framePage.getByRole(common_variables.role_btn, { name: common_variables.name_ok });

    // this.pageDown = this.framePage.getByRole('link', { name: 'Next Section (Alt+PageDown)' });
    this.pageDown = this.framePage.getByRole(common_variables.lnk, { name:  common_variables.nam_pagedown });

    // this.saveBtn = this.framePage.getByRole('link', { name: 'Save' });
    this.saveBtn = this.framePage.getByRole(common_variables.lnk, { name: common_variables.name_save });

    
    this.scheduleType_Description = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.scheduleType_Description);
    this.notification = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.notification);
    this.savedSuccessfully = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.savedSuccessfully)
  }

  async enterScheduleType(schedule: string) {

    // Course Schedule - 4th page
    // sleep(1000);
    // if ( await this.notification.isVisible()){
    //    this.notification.click()
    // }

    await sleep(2000);
    
    //Impementation 1:
    // await this.scheduleType_row_txtbx_active.hover();
    // await this.scheduleType_row_txtbx_active.waitFor();
    // await this.scheduleType_row_txtbx_active.click();

    // await this.scheduleType_row_txtbx_active.waitFor({timeout:500})
    // await this.scheduleType_row_txtbx_active.press('Tab');
    
    //Implemntation 2:
    await this.scheduleType_row_txtbx_active.hover();

    await expect(async () => {
      await this.scheduleType_row_txtbx_active.click();
      await expect.soft(this.scheduleType_row_txtbx_active).toBeEditable();
    }).toPass();  

    await this.scheduleType_row_txtbx_active.waitFor({timeout:500})
    await this.scheduleType_row_txtbx_active.press('Tab');

    await expect(async () => {
      await this.openlistvaluesBtn.click();
      await expect(this.Criteria).toBeVisible();
    }).toPass();

    await expect(async () => {
      await sleep(1000);
      await this.Criteria.click();
      await this.Criteria.clear();
      this.page.keyboard.type(schedule);
      await expect(this.Criteria).toHaveValue(schedule, { timeout: 1000 });
    }).toPass();

    await sleep(1000);
    await this.okBtn.click();

    console.log("title of last page or shedule:", await this.page.title())

    // Save butn
    await this.saveBtn.hover();
    await this.saveBtn.waitFor();
    await this.saveBtn.click();

  }

}  
