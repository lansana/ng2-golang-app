// Angular
import {NgModule, ModuleWithProviders} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

// Modules
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { NotesModule } from './notes/notes.module';
import { NotFoundModule } from './not-found/not-found.module';

// Components
import { AppComponent } from './app.component';

import {
    // Services
    WebSocketService,
    NotificationService,
    HttpService,
    ClientCountService,
    NotesService,

    // Components
    LoadingBarComponent,
    NavbarComponent
} from './shared';

const routes: ModuleWithProviders = RouterModule.forRoot([]);

@NgModule({
    imports: [
        routes,
        BrowserModule,
        SharedModule,
        HomeModule,
        ChatRoomModule,
        NotesModule,
        NotFoundModule
    ],
    declarations: [
        AppComponent,
        LoadingBarComponent,
        NavbarComponent,
    ],
    providers: [
        WebSocketService,
        HttpService,
        NotificationService,
        NotesService,
        ClientCountService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
