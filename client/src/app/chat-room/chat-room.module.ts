import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from "../shared/shared.module";

import { ChatRoomComponent } from "./chat-room.component";

const routes: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'chat-room',
        component: ChatRoomComponent
    }
]);

@NgModule({
    imports: [
        routes,
        SharedModule
    ],
    declarations: [
        ChatRoomComponent
    ]
})
export class ChatRoomModule {}