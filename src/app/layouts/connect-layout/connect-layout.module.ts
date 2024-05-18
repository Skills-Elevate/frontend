import { NgModule } from '@angular/core';
import { ConnectLayoutRoutingModule} from "./connect-layout-routing.module";
import { ConnectLayoutComponent } from './connect-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './header/header.module';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [ConnectLayoutComponent],

  imports: [CommonModule, ConnectLayoutRoutingModule, RouterModule, HeaderModule],
})
export class ConnectLayoutModule {}
