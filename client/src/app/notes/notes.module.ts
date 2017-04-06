import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from "../shared/shared.module";

import { NotesComponent } from './notes.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteEditComponent } from './note-edit/note-edit.component';

import { NoteListResolver } from './note-list/note-list.resolver';
import { NoteResolver } from './shared/note.resolver';

const notesRoutes: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'notes',
        component: NotesComponent,
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
                component: NoteCreateComponent
            },
            {
                path: ':id',
                children: [
                    {
                        path: 'edit',
                        component: NoteEditComponent,
                        resolve: {
                            note: NoteResolver
                        }
                    },
                    {
                        path: 'detail',
                        component: NoteDetailComponent,
                        resolve: {
                            note: NoteResolver
                        }
                    }
                ]
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
        NoteCreateComponent,
        NotesComponent,
        NoteEditComponent
    ],
    providers: [
        NoteListResolver,
        NoteResolver
    ]
})
export class NotesModule {}
