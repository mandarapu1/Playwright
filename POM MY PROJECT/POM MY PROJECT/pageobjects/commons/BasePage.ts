import { BrowserContext, expect, Page, type Locator } from '@playwright/test';
import { LoginPageLocators } from '../../Locators/common/LoginPageLocators';
import { AppNavigatorLocators } from '../../Locators/common/AppNavigatorLocators';
import { sleep } from '../../TestUtils/test-utils';
import { Welcome_SearchPageLocators } from '../../Locators/common/WelcomeSearchPageLocators';
import { CourseDetailsPage } from '../scacrse/CourseDetailsPage';
import { Crse_Detl_Levl_Grad_Shed_PagesLocators } from '../../Locators/scacrse/Crse_Detl_Levl_Grad_Shed_PagesLocators';
import { common_variables } from './common_variables';


export class BasePage {

  userName: Locator;
  passWord: Locator;
  signIn: Locator;
  page_loginError: Locator;
  page_ok_button: Locator;
  page_RETURN_HOME: Locator;
  page: any;
  appNavigator: any;
  searchlanding: any;
  select_form_inList: any;
  framePage: any;
  pageDown: any;
  
  // newPage: Locator;

  
constructor(page: Page) {
    
    this.page = page;
    this.appNavigator = this.page.locator(AppNavigatorLocators.appNavigator); 
    
  }
 
  async Login(uname: string, passwd:string) {

    await this.userName.fill(uname);
    
    // await newpage.pause();
    await this.passWord.fill(passwd);
    // await this.signIn.click();
    await this.signIn.click();

    await this.page.waitForLoadState();
    await this.page.waitForTimeout(3000);
    if (await this.page_loginError.isVisible()){
    while (await this.page_loginError.isVisible()){
      await this.page.waitForTimeout(500);
      await this.page_ok_button.hover();
      await this.page_ok_button.waitFor();
      await this.page_ok_button.click();
      await this.page.waitForTimeout(500);
      await this.page_RETURN_HOME.click();

      await this.page.waitForLoadState();
      await this.page.waitForTimeout(2000);
    }
    await this.page.waitForTimeout(1000);
  }

  }

  async goURL( baseURL: string) {
    await this.page.goto(baseURL);


  }

  async clickAppNavigator(context: BrowserContext) {

      const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.appNavigator.click() // Opens a new tab
    ])

    console.log(await newPage.locator(AppNavigatorLocators.textNormal).textContent());
      this.page = newPage;
        
    }

    async assignNewpage_Varaibles(){

    this.userName = this.page.locator(LoginPageLocators.userName)
    this.passWord = this.page.locator((LoginPageLocators.passWord));
    this.signIn = this.page.locator(LoginPageLocators.signIn); 

    this.page_loginError = this.page.locator(LoginPageLocators.login_error_class);
    this.page_ok_button =  this.page.locator(LoginPageLocators.ok_button_class);
    this.page_RETURN_HOME = this.page.locator(LoginPageLocators.return_home_css);

    }

    getPage(){

      return this.page;
    }

    async searchForm(formname: string){

      // this.page = page;
      this.searchlanding = this.page.locator(Welcome_SearchPageLocators.searchLanding);
      this.select_form_inList = this.page.locator(Welcome_SearchPageLocators.select_form_inList);
      await this.page.waitForLoadState();
      await this.page.waitForTimeout(500);
      
      await sleep(2500);
      await expect.soft(this.searchlanding).toBeVisible();
      await this.searchlanding.waitFor();
      await this.searchlanding.click();
      console.log(await this.page.title());

      // await this.newpage.pause();


      // Enter in Welcome Page
      await this.page.waitForTimeout(1000);
  
      // Implementation 1: to retreive scacrse page
      // await this.searchlanding.fill("SCACRSE")

      if ( formname == "SCACRSE") {
        await this.searchlanding.fill("SCACRSE");
      }

      if ( formname == "SPAIDEN") {
        await this.searchlanding.fill("SPAIDEN");
      }

      else {
        console.log("Other forms not handled")
      }

      await this.page.waitForTimeout(500);
      await this.select_form_inList.click();

      // Implementation 2: to retreive spaiden page
      // await newPage_searchlanding.fill("SCACRSE");
      //     await Promise.all([
      //       // await this.select_spaiden.waitFor(),
      //       await newPage_select_scacrse_inList.waitFor(),
      //       await newPage_select_scacrse_inList.click(), 
      //     ])

      // await this.newpage.pause();

    }  

    // async pgdown(){

    //   // this.page = page;
            
    //   this.framePage = this.page.frameLocator(Crse_Detl_Levl_Grad_Shed_PagesLocators.frameBannerHS); 
    //   this.pageDown = this.framePage.getByRole(common_variables.lnk, { name:  common_variables.nam_pagedown });

    //   await this.pageDown.hover();
    //   await this.pageDown.waitFor();
    //   await this.pageDown.click();
    //   await this.page.waitForLoadState();
    // }


    async pgdown(page: Page){

      // this.page = page;
            
      this.framePage = page.frameLocator(Crse_Detl_Levl_Grad_Shed_PagesLocators.frameBannerHS); 
      this.pageDown = this.framePage.getByRole(common_variables.lnk, { name:  common_variables.nam_pagedown });

      await this.pageDown.hover();
      await this.pageDown.waitFor();
      await this.pageDown.click();
      await this.page.waitForLoadState();
    }
  

  }
