import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isAuthenticated:boolean = false;
  private isAdmin:boolean = false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if(user?.token) this.isAuthenticated = true;
      else this.isAuthenticated = false;

      // admin auth
      if(user?.token){ if(user?.email == "admin@movieapp.com") this.isAdmin = true; else this.isAdmin = false;}
    })
  }

  GetAuthenticationAnswer():boolean{
    return this.isAuthenticated;
  }

  GetAdminAuthAnswer():boolean{
    return this.isAdmin;
  }

  SignOut(){
    //@ts-ignore
    this.authService.user.next(null);
    localStorage.removeItem("auth");
    this.isAuthenticated = false;
    this.isAdmin = false;
  }

}
