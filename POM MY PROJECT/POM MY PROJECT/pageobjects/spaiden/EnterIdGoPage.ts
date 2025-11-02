import { BrowserContext, Page, type Locator,FrameLocator, expect } from '@playwright/test';
import { EnterIdGoPageLocators } from '../../Locators/spaiden/EnterIdGoPageLocators';
import { BasePage } from '../commons/BasePage';
import { common_variables } from '../commons/common_variables';

export class EnterIdGoPage extends BasePage{
    
    page: Page;
    framebannerHS: Locator;
    // framePage: FrameLocator;
    goButton: Locator;
    ID: Locator;
    select_spaiden_waitforsel: any;


    constructor(page: Page){

      super(page);
      this.page = page;
            
      // this.framePage = page.frameLocator(EnterIdGoPageLocators.frameBannerHS);
      
      // this.ID = this.framePage.getByRole('textbox', { name: 'ID :' });
      // this.goButton = this.framePage.getByRole('button', { name: 'Go' });
    }

    async enterID_Go(page: Page,spaiden_id: string){
    
      this.page = page;
      this.framePage = page.frameLocator(EnterIdGoPageLocators.frameBannerHS);

      // this.ID = this.framePage.getByRole('textbox', { name: 'ID :' });
      this.ID = this.framePage.getByRole(common_variables.role_txtbox, { name: common_variables.name_ID});
      // this.goButton = this.framePage.getByRole('button', { name: 'Go' });
      this.goButton = this.framePage.getByRole(common_variables.role_btn, { name: common_variables.name_Go });
      
      await this.page.waitForLoadState(); 
      // await page.waitForTimeout(1000);
      
      await this.ID.waitFor();
      await this.ID.click();
      console.log(spaiden_id);
      await this.ID.fill(spaiden_id);
   
      await this.page.waitForTimeout(500);
      await expect.soft(this.goButton).toBeVisible();
      
      await this.page.waitForLoadState();
      
      await this.goButton.click();
      console.log("After go button clicked");

      // await page.waitForTimeout(5000);
      await this.page.waitForLoadState();  
      console.log(await this.page.title());
    
      // await this.page.waitForTimeout(5000);
      // await this.page.waitForLoadState();

    }

    }  
