
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'capit'})
export class CapitPipe implements PipeTransform {
  transform(value: string) : string {
  	if (value.substring(0, 2) != 'OG' && value.substring(0, 2) != 'OS') {
	    value = value.toLowerCase();
	    value = value.charAt(0).toUpperCase() + value.slice(1); 
    }
    return value;
  }
}

