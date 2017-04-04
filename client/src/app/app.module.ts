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

// Services
import { WebSocketService } from './shared/service/websocket/websocket.service';
import { NotificationService } from './shared/util/notification/notification.service';
import { HttpService } from './shared/service/http/http.service';
import { CountService } from "./components/pages/count/count.service";
import { LoadingBarService } from "./components/ui/loading-bar/loading-bar.service";

// Resolvers
import { CountResolver } from "./components/pages/count/count.resolver";

// Pipes
import { FilterScriptsPipe } from "./shared/pipe/filter/filter-scripts.pipe";

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

    // Pipes
    FilterScriptsPipe
  ],
  providers: [
    // Services
    WebSocketService,
    NotificationService,
    HttpService,
    CountService,
    LoadingBarService,

    // Resolvers
    CountResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
