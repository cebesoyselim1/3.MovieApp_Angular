import { Directive } from "@angular/core";
import { AbstractControl, FormControl, NG_VALIDATORS } from "@angular/forms";

@Directive({
  selector: '[ImageValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ImageValidator, multi: true }
  ]
})

export class ImageValidator{
  static isValidExtension(control:AbstractControl){

    let val = control.value as string;

    if(val.endsWith(".jpg") || val.endsWith(".jpeg") ||val.endsWith(".png")){
      return null;
    }else  {
      return {
        wrongExtension: true
      }
    }
  }

  validation(c:FormControl){
    let val = c.value as string;

    if(val.endsWith(".jpg") || val.endsWith(".jpeg") ||val.endsWith(".png")){
      return null;
    }else  {
      return {
        wrongExtension: true
      }
    }
  }
}
