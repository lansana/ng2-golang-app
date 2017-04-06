// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Components
import { ChatBubbleComponent } from './ui/chat-bubble/chat-bubble.component';
import { CtaBoxComponent } from "./ui/cta-box/cta-box.component";
import { IconComponent } from "./ui/icon/icon.component";
import { LogoComponent } from "./ui/logo/logo.component";
import { PaperComponent } from "./ui/paper/paper.component";
import { ScrollboxComponent } from "./ui/scrollbox/scrollbox.component";
import { WidgetComponent } from "./ui/widget/widget.component";

// Services
import { LoadingBarService } from "./service/loading-bar.service";

// Pipes
import { FilterScriptsPipe } from "./pipe/filter/filter-scripts.pipe";
import { LimitPipe } from "./pipe/limit/limit.pipe";

// Third party
import { Ng2PageTransitionModule } from 'ng2-page-transition';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule,
        Ng2PageTransitionModule
    ],
    declarations: [
        // Components
        ChatBubbleComponent,
        CtaBoxComponent,
        IconComponent,
        LogoComponent,
        PaperComponent,
        ScrollboxComponent,
        WidgetComponent,

        // Pipes
        FilterScriptsPipe,
        LimitPipe,
    ],
    exports: [
        // Modules
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule,
        Ng2PageTransitionModule,

        // Components
        ChatBubbleComponent,
        CtaBoxComponent,
        IconComponent,
        LogoComponent,
        PaperComponent,
        ScrollboxComponent,
        WidgetComponent,

        // Pipes
        FilterScriptsPipe,
        LimitPipe
    ],
    providers: [
        LoadingBarService
    ]
})
export class SharedModule {}
