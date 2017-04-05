import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from "../shared/shared.module";

import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteListComponent } from './note-list/note-list.component';

import { NoteDetailResolver } from './note-detail/note-detail.resolver';
import { NoteListResolver } from './note-list/note-list.resolver';

const routes: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'notes',
        component: NoteListComponent,
        resolve: {
            resolved: NoteListResolver
        }
    },
    {
        path: 'notes/:id',
        component: NoteDetailComponent,
        resolve: {
            resolved: NoteDetailResolver
        }
    }
]);

@NgModule({
    imports: [
        routes,
        SharedModule,
    ],
    declarations: [
        NoteDetailComponent,
        NoteListComponent
    ],
    providers: [
        NoteDetailResolver,
        NoteListResolver
    ]
})
export class NotesModule {}