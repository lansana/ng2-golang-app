// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// App component
import { AppComponent } from './app.component';

// Routes
import { AppRouterModule } from './router.module';

// Page components
import { HomeComponent } from './components/pages/home/home.component';
import { ChatRoomComponent } from "./components/pages/chat-room/chat-room.component";
import { CountComponent } from "./components/pages/count/count.component";
import { NoteDetailComponent } from "./components/pages/notes/note-detail/note-detail.component";
import { NoteListComponent } from "./components/pages/notes/note-list/note-list.component";

// UI components
import { NavbarComponent } from './components/ui/navbar/navbar.component';
import { ContentComponent } from './components/ui/content/content.component';
import { LoadingBarComponent } from './components/ui/loading-bar/loading-bar.component';
import { WidgetComponent } from './components/ui/widget/widget.component';
import { FooterComponent } from "./components/ui/footer/footer.component";
import { ChatBubbleComponent } from "./components/ui/chat-bubble/chat-buttle.component";
import { ScrollboxComponent } from "./components/ui/scrollbox/scrollbox.component";
import { CtaBoxComponent } from "./components/ui/cta-box/cta-box.component";
import { IconComponent } from "./components/ui/icon/icon.component";
import { LogoComponent } from "./components/ui/logo/logo.component";
import { PaperComponent } from "./components/ui/paper/paper.component";

// Services
import { WebSocketService } from './shared/service/websocket/websocket.service';
import { NotificationService } from './shared/util/notification/notification.service';
import { HttpService } from './shared/service/http/http.service';
import { CountService } from "./components/pages/count/count.service";
import { LoadingBarService } from "./components/ui/loading-bar/loading-bar.service";
import { NotesService } from "./components/pages/notes/notes.service";

// Resolvers
import { CountResolver } from "./components/pages/count/count.resolver";
import { NoteListResolver } from "./components/pages/notes/note-list/note-list.resolver";
import { NoteDetailResolver } from "./components/pages/notes/note-detail/note-detail.resolver";

// Pipes
import { FilterScriptsPipe } from "./shared/pipe/filter/filter-scripts.pipe";
import { LimitPipe } from "./shared/pipe/limit/limit.pipe";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouterModule
  ],
  declarations: [
    // Page components
    HomeComponent,
    ChatRoomComponent,
    CountComponent,
    NoteDetailComponent,
    NoteListComponent,

    // UI components
    AppComponent,
    LoadingBarComponent,
    NavbarComponent,
    ContentComponent,
    WidgetComponent,
    ChatBubbleComponent,
    ScrollboxComponent,
    IconComponent,
    LogoComponent,
    CtaBoxComponent,
    FooterComponent,
    PaperComponent,

    // Pipes
    FilterScriptsPipe,
    LimitPipe,
  ],
  providers: [
    // Services
    WebSocketService,
    NotificationService,
    HttpService,
    CountService,
    LoadingBarService,
    NotesService,

    // Resolvers
    CountResolver,
    NoteListResolver,
    NoteDetailResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
