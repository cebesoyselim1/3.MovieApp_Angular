import { AbstractControl } from "@angular/forms";

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
}
