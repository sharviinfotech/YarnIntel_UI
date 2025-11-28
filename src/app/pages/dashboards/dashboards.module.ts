import { NgModule } from '@angular/core';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import { SampleComponentComponent } from './default/sample-component/sample-component.component';


import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReviewNotificationComponent } from './review-notification/review-notification.component';
import { DashboardBackupComponent } from './dashboard-backup/dashboard-backup.component';
import { DefaultComponent } from './default/default.component';
import { InvoicefyGlobalDashboardComponent } from './invoicefy-global-dashboard/invoicefy-global-dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MixPlansComponent } from './mix-plans/mix-plans.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { YarnbotComponent } from './yarnbot/yarnbot.component';






// import { GlobalReviewEditComponent } from './global-review-edit/global-review-edit.component';

@NgModule({
  declarations: [
    SampleComponentComponent,
    StockEntryComponent,
    
    
   
  ],
  imports: [
    DashboardsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),  // Ensure it's in the imports array
    NgxSpinnerModule,
    DefaultComponent

  ],
  providers: [BsDropdownConfig],
})
export class DashboardsModule { }
