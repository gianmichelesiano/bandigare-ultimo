
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'scorporabili'})
export class ScorporabiliPipe implements PipeTransform {
  transform(value: string) : string {
  	
  	if (value[0] == ','){
       value = value.replace(value[0], "");
  	}
    return value;
  }
}