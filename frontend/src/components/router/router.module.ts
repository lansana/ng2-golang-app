import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from '../welcome/welcome.component';
import { AboutComponent } from '../about/about.component';
import { RatesComponent } from '../rates/rates.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ScreeningComponent } from '../screening/screening.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'rates',
    component: RatesComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'screening',
    component: ScreeningComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
