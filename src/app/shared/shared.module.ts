import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { LoadingComponent } from './loading/loading.component';
import { QuestionPopupComponent } from './question-popup/question-popup.component';
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
    QuestionPopUpService
  ]
})

export class SharedModule{

}
