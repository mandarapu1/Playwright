import { BrowserContext, Page, type Locator,FrameLocator, expect } from '@playwright/test';
import { sleep } from '../../TestUtils/test-utils';
import { Crse_Detl_Levl_Grad_Shed_PagesLocators } from '../../Locators/scacrse/Crse_Detl_Levl_Grad_Shed_PagesLocators';
import { common_variables } from '../commons/common_variables';

export class CourseLevelPage{
   
    
    readonly page: Page;
    readonly searchlanding: Locator;
    
    readonly framebannerHS: Locator;
    readonly framePage: FrameLocator;
    
    Criteria: Locator;
        
    pageDown: Locator;
    courseLevel: Locator;
    openlistvaluesBtn: Locator;
    okBtn: Locator;
    h2_title: Locator;
    h3_title: Locator;
    
    constructor(page: Page){

      this.page = page;
      
      this.framePage = page.frameLocator(Crse_Detl_Levl_Grad_Shed_PagesLocators.frameBannerHS); 
      
      // this.h2_title =this.framePage.getByRole('heading', { name: 'Basic Course Information' });
      this.h2_title = this.framePage.getByRole(common_variables.role_heading, { name:common_variables.course_name })
      
      this.h3_title = this.framePage.locator(Crse_Detl_Levl_Grad_Shed_PagesLocators.h3_title_courseLevel);
            
      // this.courseLevel = this.framePage.getByRole('textbox', { name: 'Level*' });
      this.courseLevel = this.framePage.getByRole(common_variables.role_txtbox, { name:common_variables.name_levl });
      // this.openlistvaluesBtn = this.framePage.getByRole('button', { name: 'Open List of Values' });
      this.openlistvaluesBtn = this.framePage.getByRole(common_variables.role_btn, { name: common_variables.nam_openlistval });
      // this.Criteria = this.framePage.getByRole('textbox', { name: 'Criteria' });
      this.Criteria = this.framePage.getByRole(common_variables.role_txtbox, { name: common_variables.name_critieria });
                
      // this.okBtn = this.framePage.getByRole('button', { name: 'OK' });
      this.okBtn = this.framePage.getByRole(common_variables.role_btn, { name: common_variables.name_ok });

      // this.pageDown = this.framePage.getByRole('link', { name: 'Next Section (Alt+PageDown)' });
      this.pageDown = this.framePage.getByRole(common_variables.lnk, { name:  common_variables.nam_pagedown });
    }

    async enterCourseLevel(courselevel: string){

        // Course Level Page - 2nd page
        await sleep(1000)
        await this.courseLevel.press('Tab');
              
        // Level Code Validation STVLEVL Criteria
        await expect(async () => {
          await this.openlistvaluesBtn.click();
          await expect.soft(this.Criteria).toBeVisible();
      }).toPass();
      
        await expect(async () => {
          await this.Criteria.clear();
          await this.Criteria.click();
          this.page.keyboard.type(courselevel);
          await expect.soft(this.Criteria).toHaveValue(courselevel, { timeout: 500 });
      }).toPass();
      
      await sleep(1000);
      await this.okBtn.click();

      console.log("in course level page title:",await this.page.title())
      
      sleep(5000);
      await this.pageDown.hover();
      await this.pageDown.waitFor();
      await this.pageDown.click();
      await this.page.waitForLoadState();   
      
    }

    
    }  

