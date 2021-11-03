import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { LoadingComponent } from './loading/loading.component';
import { QuestionPopupComponent } from './question-popup/question-popup.component';
import { AlertifyService } from "./services/alertify.service";
import { QuestionPopUpService } from "./services/question-popup.service";

@NgModule({
  declarations:[
    LoadingComponent,
    QuestionPopupComponent
  ],
  imports:[
    BrowserModule
  ],
  exports:[
    LoadingComponent,
    QuestionPopupComponent
  ],
  providers:[
    QuestionPopUpService,
    AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})

export class SharedModule{

}
