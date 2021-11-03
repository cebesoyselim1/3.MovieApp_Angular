import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


export class ErrorInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(this.HandleError)
    )
  }

  HandleError(err:HttpErrorResponse){
    let errorMessage = "Unkown Error";

    if(!navigator.onLine){
      return throwError("Internet connection lost.");
    }

    if(err.status == 400) errorMessage = "400 : Bad Request";
    if(err.status == 401) errorMessage = "401 : Unauthorized";
    if(err.status == 403) errorMessage = "403 : Forbidden";
    if(err.status == 404) errorMessage = "404 : Not Found";
    if(err.status == 408) errorMessage = "408 : Request Timeout";
    if(err.status == 500) errorMessage = "500 : Internal Server Error";
    if(err.status == 501) errorMessage = "501 : Not Implemented";
    if(err.status == 502) errorMessage = "502 : Bad Gateway";
    if(err.status == 503) errorMessage = "503 : Service Unavailable";
    if(err.status == 504) errorMessage = "504 : Gateway Timeout";

    return throwError(errorMessage);
  }

}
