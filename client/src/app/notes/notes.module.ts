import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from "../shared/shared.module";

import { NoteHomeComponent } from './note-home/note-home.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteModifyComponent } from './note-modify/note-modify.component';

import { NoteDetailResolver } from './note-detail/note-detail.resolver';
import { NoteListResolver } from './note-list/note-list.resolver';
import { NoteModifyResolver } from './note-modify/note-modify.resolver';

const notesRoutes: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'notes',
        component: NoteHomeComponent,
        children: [
          {
            path: '',
            component: NoteListComponent,
            resolve: {
              notes: NoteListResolver
            }
          },
          {
            path: 'create',
            component: NoteModifyComponent
          },
          {
            path: 'edit/:id',
            component: NoteModifyComponent,
            resolve: {
              note: NoteModifyResolver
            }
          },
          {
            path: ':id',
            component: NoteDetailComponent,
            resolve: {
              note: NoteDetailResolver
            }
          }
        ]
    }
]);

@NgModule({
    imports: [
        notesRoutes,
        SharedModule,
        BrowserModule
    ],
    declarations: [
        NoteDetailComponent,
        NoteListComponent,
        NoteModifyComponent,
        NoteHomeComponent
    ],
    providers: [
        NoteDetailResolver,
        NoteListResolver,
        NoteModifyResolver
    ]
})
export class NotesModule {}
