import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Custom components
import { AppComponent } from './app.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AboutComponent } from '../about/about.component';
import { RatesComponent } from '../rates/rates.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ScreeningComponent } from '../screening/screening.component';

// Routes
import { AppRouterModule } from '../router/router.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouterModule
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    WelcomeComponent,
    AboutComponent,
    RatesComponent,
    GalleryComponent,
    ScreeningComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
