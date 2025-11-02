import { BrowserContext, Page, type Locator,FrameLocator, expect } from '@playwright/test';
import { GeneralPersonIdentifyPageLocators } from '../../Locators/spaiden/GeneralPersonIdentifyPageLocators';
import { common_variables } from '../commons/common_variables';


export class GeneralPersonIdentifyPage{
    
  readonly page: Page;
  
  readonly framePage: FrameLocator;
  readonly AltIdentify_Tab: Locator;
  readonly AltIdentify_NameType: any;
  readonly Email_Tab: Locator;
  readonly Email_Tab_EmailType_label: Locator;
  readonly Email_Tab_EmailAddress_label: Locator;
  readonly EmergencyContact_Tab: Locator;
  readonly EmergencyContact_Priority_Label: Locator;
  readonly Email_Tab_EmailAddress: Locator;

  readonly roletab = common_variables.role_tab

  EmergencyContact_Priority_Value: any;
  EmergencyContact_FirstName_label_locator: Locator;
  EmergencyContact_FirstName_Value: Locator;
  EmergencyContact_LastName_Value: Locator;
  EmergencyContact_LastName_label: Locator;
  EmergencyContact_LastName_label_locator: Locator;
  AltIdentify_NameType_label_locator: Locator;
  AltIdentify_FirstName_label_locator: Locator;
  AltIdentify_FirstName: Locator;
  Email_Tab_EmailType: Locator;
   
   
    constructor(page: Page){

      this.page = page;
        
      this.framePage = page.frameLocator(GeneralPersonIdentifyPageLocators.frameBannerHS);
      
      // this.AltIdentify_Tab = this.framePage.getByRole('tab', { name: 'Alternate Identification' });
      this.AltIdentify_Tab = this.framePage.getByRole(common_variables.role_tab, { name:common_variables.nam_alt_identify });

      // // this.AltIdentify_NameType_label_locator = this.framePage.getByLabel('MasterSettingsSave Column').getByText('Name Type').nth(2)
      this.AltIdentify_NameType_label_locator = this.framePage.getByLabel(common_variables.byLabl_mas_set_sav_col).getByText(common_variables.name_type).nth(2)

      // // this.AltIdentify_NameType = this.framePage.getByRole('textbox', { name: 'Name Type' });
      this.AltIdentify_NameType = this.framePage.getByRole(common_variables.role_txtbox, { name: common_variables.name_type });

      // // this.AltIdentify_FirstName_label_locator = this.framePage.locator(GeneralPersonIdentifyPageLocators.altIden_SprFName).getByText('First Name');
      this.AltIdentify_FirstName_label_locator = this.framePage.locator(GeneralPersonIdentifyPageLocators.altIden_SprFName_label);
      
      this.AltIdentify_FirstName = this.framePage.getByRole('textbox', { name: 'First Name' });
      // this.AltIdentify_FirstName = this.framePage.getByRole(common_variables.role_txtbox, { name:common_variables.nam_fir_nam_val });

      // // this.Email_Tab = this.framePage.getByRole(common_variables.role_tab, { name: 'E-mail' })
      this.Email_Tab = this.framePage.getByRole(common_variables.role_tab, { name: common_variables.nam_email })
      
      this.Email_Tab_EmailType_label = this.framePage.locator(GeneralPersonIdentifyPageLocators.Email_Tab_EmailType_label); 
      // // this.Email_Tab_EmailType = this.framePage.getByRole('textbox', { name: 'E-mail Type' });
      this.Email_Tab_EmailType = this.framePage.getByRole(common_variables.role_txtbox, { name:common_variables.nam_email_type });

      this.Email_Tab_EmailAddress_label = this.framePage.locator(GeneralPersonIdentifyPageLocators.email_EmailAddr_label); 
      // // this.Email_Tab_EmailAddress = this.framePage.getByRole('textbox', { name: 'E-mail Address' });
      this.Email_Tab_EmailAddress = this.framePage.getByRole(common_variables.role_txtbox, { name:common_variables.nam_emailaddr });

      // // this.EmergencyContact_Tab = this.framePage.getByRole('tab', { name: 'Emergency Contact' });
      this.EmergencyContact_Tab = this.framePage.getByRole(common_variables.role_tab, { name: common_variables.nam_emerg_cont });

      // // this.EmergencyContact_Priority_Label = this.framePage.locator(GeneralPersonIdentifyPageLocators.emergency_Prio_label).getByText('Priority');
      this.EmergencyContact_Priority_Label = this.framePage.locator(GeneralPersonIdentifyPageLocators.emergency_Prio_label).getByText(common_variables.emer_prio_labl);
      
      // // this.EmergencyContact_FirstName_label_locator = this.framePage.locator(GeneralPersonIdentifyPageLocators.emergency_FirNam_label).getByText('First Name');
      this.EmergencyContact_FirstName_label_locator = this.framePage.locator(GeneralPersonIdentifyPageLocators.emergency_FirNam_label).getByText(common_variables.nam_fir_name_labl);

      // // this.EmergencyContact_FirstName_Value = this.framePage.getByRole('textbox', { name: 'First Name *' });
      this.EmergencyContact_FirstName_Value = this.framePage.getByRole(common_variables.role_txtbox, { name:common_variables.nam_fir_nam_val });

      // // this.EmergencyContact_LastName_label_locator = this.framePage.locator(GeneralPersonIdentifyPageLocators.emergency_LasNam_label).getByText('Last Name');
      this.EmergencyContact_LastName_label_locator = this.framePage.locator(GeneralPersonIdentifyPageLocators.emergency_LasNam_label).getByText(common_variables.nam_las_nam_labl);

      // // this.EmergencyContact_LastName_Value = this.framePage.getByRole('textbox', { name: 'Last Name *' });
      this.EmergencyContact_LastName_Value = this.framePage.getByRole(common_variables.role_txtbox, { name:common_variables.nam_las_name_val });
   
         
    }

    async goto_Alt_Identify_tab(){
      // Go to alt identify tab
      await this.AltIdentify_Tab.click();
      
    }

    async goto_Email_tab(){
      // Go to Email tab
      await this.Email_Tab.click();
      
    } 
  
    async goto_EmergencyContact_tab(){
      // Go to Emergency contact tab
      await this.EmergencyContact_Tab.click();
    
    }
      
    
    }  
