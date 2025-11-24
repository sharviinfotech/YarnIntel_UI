import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AuthRoutingModule,
  ]
})
export class AuthModule { }
