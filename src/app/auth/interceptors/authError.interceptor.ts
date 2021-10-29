import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export class AuthErrorInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(this.HandleError)
    )
  }

  HandleError(err:HttpErrorResponse){

    let errorMessage = "";

    if(!navigator.onLine){
      return throwError("Internet connection lost.");
    }

    if(err.error.error){
      if(err.error.error.status == 400) errorMessage = "400 : Bad Request";
      if(err.error.error.status == 401) errorMessage = "401 : Unauthorized";
      if(err.error.error.status == 403) errorMessage = "403 : Forbidden";
      if(err.error.error.status == 404) errorMessage = "404 : Not Found";
      if(err.error.error.status == 408) errorMessage = "408 : Request Timeout";
      if(err.error.error.status == 500) errorMessage = "500 : Internal Server Error";
      if(err.error.error.status == 501) errorMessage = "501 : Not Implemented";
      if(err.error.error.status == 502) errorMessage = "502 : Bad Gateway";
      if(err.error.error.status == 503) errorMessage = "503 : Service Unavailable";
      if(err.error.error.status == 504) errorMessage = "504 : Gateway Timeout";
    }

    switch(err.error.error.message){
      case "EMAIL_EXISTS":
        errorMessage = "The email address is already in use by another account.";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = "Password sign-in is disabled for this project.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid or the user does not have a password.";
        break;
      case "USER_DISABLED":
        errorMessage = "The user account has been disabled by an administrator.";
        break;
    }

    if(errorMessage) return throwError(errorMessage);
    else return throwError("Unknown Error.");

  }

}
