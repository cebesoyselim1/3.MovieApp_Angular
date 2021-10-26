import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "summary" })

export class SummaryPipe implements PipeTransform{
  transform(value: any, length?:number) {
    let val = value as string;
    if(!length) length = 10;

    if(val.length <= length){
      return val;
    }else{
      return val.slice(0,length).concat("...");
    }
  }

}
