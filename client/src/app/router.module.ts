import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { CountComponent } from "./components/pages/count/count.component";
import { ChatRoomComponent } from "./components/pages/chat-room/chat-room.component";
import { NoteListComponent } from "./components/pages/notes/note-list/note-list.component";
import { NoteDetailComponent } from "./components/pages/notes/note-detail/note-detail.component";
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

import { CountResolver } from './components/pages/count/count.resolver';
import { NoteListResolver } from './components/pages/notes/note-list/note-list.resolver';
import { NoteDetailResolver } from "./components/pages/notes/note-detail/note-detail.resolver";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'client-count',
    component: CountComponent,
    resolve: {
      resolved: CountResolver
    }
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent
  },
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
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
