import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from "../shared/shared.module";
import { NotFoundComponent } from './not-found.component';

const routes: ModuleWithProviders = RouterModule.forChild([
    {
        path: '**',
        component: NotFoundComponent
    }
]);

@NgModule({
    imports: [
        routes,
        SharedModule
    ],
    declarations: [
        NotFoundComponent,
    ]
})
export class NotFoundModule {}