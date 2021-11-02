import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { QuestionPopUp } from "../model/question-popup.model";


@Injectable()

export class QuestionPopUpService{
  //@ts-ignore
  questionPopUp:BehaviorSubject<QuestionPopUp> = new BehaviorSubject<QuestionPopUp>(null);


}

