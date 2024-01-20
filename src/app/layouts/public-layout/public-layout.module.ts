import { NgModule } from '@angular/core';
import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { PublicLayoutComponent } from './public-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [PublicLayoutComponent],

  imports: [PublicLayoutRoutingModule, RouterModule, HeaderModule],
})
export class PublicLayoutModule {}
