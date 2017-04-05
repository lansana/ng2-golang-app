import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';

const routes: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: HomeComponent
    }
]);

@NgModule({
    imports: [
        routes,
        SharedModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule {}