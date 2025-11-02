import { BrowserContext, Page, type Locator,FrameLocator, expect } from '@playwright/test';
import { sleep } from '../../TestUtils/test-utils';
import { SubTermCoursePageLocators } from '../../Locators/scacrse/SubTermCoursePageLocators';
import { BasePage } from '../commons/BasePage';

export class SubTermCoursePage extends BasePage{
    
    readonly page: Page;
        
    readonly framebannerHS: Locator;
    
    subjectCode: Locator;
    optionListClose: Locator;
    validSubCodes: Locator;
    okBtn: Locator;
    course: Locator;
    termCode: Locator;
    validTermsCourse: Locator;
    Criteria: Locator;
    goBtn: Locator;

    constructor(page: Page){

      super(page);
      this.page = page;
            
      // this.framePage = page.frameLocator(SubTermCoursePageLocators.frameBannerHS);    

      // this.subjectCode= this.framePage.locator(SubTermCoursePageLocators.subjectCode);
      
      // this.optionListClose = this.framePage.getByText('Option List Close');
      
      // this.validSubCodes = this.framePage.getByRole('button', { name: 'Valid Subject Codes' });
      // this.Criteria = this.framePage.getByRole('textbox', { name: 'Criteria' });
      
      // this.okBtn = this.framePage.getByRole('button', { name: 'OK' });
      // this.course = this.framePage.getByRole('textbox', { name: 'Course :' });
      // this.termCode = this.framePage.locator(SubTermCoursePageLocators.termCode);
      // this.validTermsCourse = this.framePage.getByRole('button', { name: 'Valid Terms for Course' });
      // this.goBtn = this.framePage.getByRole('button', { name: 'Go' });
    
    }

    async enter_Sub_Term_Course(page: Page, subcode: string, course: string, term: string){

      this.framePage = page.frameLocator(SubTermCoursePageLocators.frameBannerHS);
      this.subjectCode= this.framePage.locator(SubTermCoursePageLocators.subjectCode);
      
      this.optionListClose = this.framePage.getByText('Option List Close');
      
      this.validSubCodes = this.framePage.getByRole('button', { name: 'Valid Subject Codes' });
      this.Criteria = this.framePage.getByRole('textbox', { name: 'Criteria' });
      
      this.okBtn = this.framePage.getByRole('button', { name: 'OK' });
      this.course = this.framePage.getByRole('textbox', { name: 'Course :' });
      this.termCode = this.framePage.locator(SubTermCoursePageLocators.termCode);
      this.validTermsCourse = this.framePage.getByRole('button', { name: 'Valid Terms for Course' });
      this.goBtn = this.framePage.getByRole('button', { name: 'Go' });

      await sleep(1000);
      await expect.soft(this.subjectCode).toBeVisible();
      
      await this.subjectCode.click();
       
      await expect.soft(this.optionListClose).toBeVisible();
        
      console.log(await this.optionListClose.textContent());
      await this.validSubCodes.click();
      
      //criteria inside stvsubj
      await expect(async () => {
        await this.Criteria.click();
        this.page.keyboard.type(subcode);
        await sleep(1000);
        await expect (this.Criteria).toHaveValue(subcode, { timeout: 1000 });
      }).toPass();
        
        await this.framePage.getByText(subcode, { exact: true }).click();
      
        await this.okBtn.click();
      
        //course
        await sleep(1000);
        await this.course.fill(course);
          
        //Term
        await this.termCode.click({timeout:1000});
        
        await this.validTermsCourse.click();
        await this.Criteria.click();
        await this.page.keyboard.type(term);
        await sleep(1000);
        await this.okBtn.click(); 
      
        await sleep(1000);
        
        //Go button
        await expect.soft(this.goBtn).toBeVisible();
        await sleep(2000);
        await this.goBtn.click();
       
        await this.page.waitForLoadState();    
            
    }

    }  
