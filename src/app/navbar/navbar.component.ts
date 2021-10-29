import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isAuthenticated:boolean = false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if(user?.token) this.isAuthenticated = true;
      else this.isAuthenticated = false;
    })
  }

  GetAuthenticationAnswer():boolean{
    return this.isAuthenticated;
  }

  SignOut(){
    //@ts-ignore
    this.authService.user.next(null);
    localStorage.removeItem("auth");
  }

}
