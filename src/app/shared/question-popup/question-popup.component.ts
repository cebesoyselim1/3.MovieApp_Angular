import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { QuestionPopUp } from '../model/question-popup.model';
import { QuestionPopUpService } from '../services/question-popup.service';

@Component({
  selector: 'app-question-popup',
  templateUrl: './question-popup.component.html',
  styleUrls: ['./question-popup.component.css']
})
export class QuestionPopupComponent implements OnInit{

  //@ts-ignore
  questionPopUp:QuestionPopUp = null;

  constructor(private questionPopUpService:QuestionPopUpService) {}

  ngOnInit(): void {
    this.questionPopUpService.questionPopUp.subscribe((data) => {
      this.questionPopUp = data;
    })
  }

  ClosePopUp(){
    let questionPopUp = new QuestionPopUp("",[],"",false);
    this.questionPopUpService.questionPopUp.next(questionPopUp);
    this.questionPopUp = questionPopUp;
  }

  SubmitAnswer(answer:string){
    let questionPopUp = new QuestionPopUp(this.questionPopUp.question,this.questionPopUp.answers,answer,false);
    this.questionPopUpService.questionPopUp.next(questionPopUp);
  }

  InitializeQuestion(){
    this.questionPopUpService.questionPopUp.subscribe((questionPopUp) => {
      this.questionPopUp = questionPopUp;
    })
  }

}
