import { NgModule } from '@angular/core';
import { ConnectLayoutRoutingModule} from "./connect-layout-routing.module";
import { ConnectLayoutComponent } from './connect-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [ConnectLayoutComponent],

  imports: [ConnectLayoutRoutingModule, RouterModule, HeaderModule],
})
export class ConnectLayoutModule {}
