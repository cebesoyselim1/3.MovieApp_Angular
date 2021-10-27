import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ToggleSign(btnSign:HTMLButtonElement,btnSubmit:HTMLButtonElement){
    if(btnSubmit.innerHTML == "Sign In"){
      btnSubmit.innerHTML = "Sign Up";
      btnSign.innerHTML = "Toggle to Sign In";
      btnSubmit.classList.remove("btn-outline-success");
      btnSubmit.classList.add("btn-outline-warning");
    }else{
      btnSubmit.innerHTML = "Sign In";
      btnSign.innerHTML = "Toggle to Sign Up";
      btnSubmit.classList.remove("btn-outline-warning");
      btnSubmit.classList.add("btn-outline-success");
    }
  }

}
