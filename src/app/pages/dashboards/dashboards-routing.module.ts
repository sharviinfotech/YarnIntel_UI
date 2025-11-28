import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { SaasComponent } from './saas/saas.component';
import { CryptoComponent } from './crypto/crypto.component';
import { BlogComponent } from './blog/blog.component';
import { JobsComponent } from "./jobs/jobs.component";
import { SampleComponentComponent } from './default/sample-component/sample-component.component';

import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MixPlansComponent } from './mix-plans/mix-plans.component';
import { YarnbotComponent } from './yarnbot/yarnbot.component';







import { GlobalReviewEditComponent } from './global-review-edit/global-review-edit.component';
import { ReviewNotificationComponent } from './review-notification/review-notification.component';


import { InvoicefyGlobalDashboardComponent } from './invoicefy-global-dashboard/invoicefy-global-dashboard.component';








const routes: Routes = [
    {
        path: 'default',
        component: InvoicefyGlobalDashboardComponent
    },
    {
        path: 'sampleComponent',
        component: SampleComponentComponent
    },
    
  
    {
        path: 'StockEntry',
        component: StockEntryComponent
    },

    {
        path: 'Inventory',
        component: InventoryComponent
    },
     {
        path: 'MixPlans',
        component: MixPlansComponent
    },
     {
        path: 'Yarnbot',
        component: YarnbotComponent
    },
  
   
   
   
   
  
    
    
   
   
    
    {
        path: 'globalReviewEdit',
        component: GlobalReviewEditComponent
    },
    {
        path: 'ReviewNotification',
        component: ReviewNotificationComponent
    },
    
    
    // {
    //     path: 'saas',
    //     component: SaasComponent
    // },
    // {
    //     path: 'crypto',
    //     component: CryptoComponent
    // },
    // {
    //     path: 'blog',
    //     component: BlogComponent
    // },
    // {
    //     path:"jobs",
    //     component:JobsComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
