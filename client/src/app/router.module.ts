import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { CountComponent } from "./components/pages/count/count.component";
import { ChatRoomComponent } from "./components/pages/chat-room/chat-room.component";

import { CountResolver } from './components/pages/count/count.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'count',
    component: CountComponent,
    resolve: {
      clients: CountResolver
    }
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
